/* eslint-disable node/no-deprecated-api */
const fs = require('fs');
const sysPath = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const md5Hex = require('md5-hex');
const ab2str = require('arraybuffer-to-string');
const str2ab = require('to-buffer');
const through2 = require('through2');
const {
  DOMParser
} = require('xmldom');
const config = require('../../config');
const logger = require('../../utils/logger');
const converter = require('../../converter/src/alibaba');
const scopeStyle = require('../../scope/scope-style');
const scopeTemplate = require('../../scope/scope-template');
const diffTag = require('../diff/index').diffTag('alipay');
const path = require('path');
function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './alibaba';

  // 插件拷贝到 src/plugins/插件名称内
  // 插件的拷贝位置是src下的plugins下的pluginName
  const plugins = (opt.config && opt.config.plugins) || {};
  const pluginsJSON = {};
  Object.keys(plugins).forEach(key => {
    const relativePath = plugins[key];
    // console.log('==========',relativePath)
    const jsonPath = path.join(process.cwd(), relativePath, 'plugin.json');
    console.log(jsonPath);

    pluginsJSON[key] = require(jsonPath);
  });

  // 注入适配器代码
  gulp.src(sysPath.resolve(__dirname, '../../adaptor/src/alibaba.js'))
    .pipe(rename('adaptor.js'))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('复制 adaptor.js 完成！');
    });

  // 处理项目
  handleProject(src, dest, plugins, null, false);

  if (plugins) {
    Object.keys(plugins).forEach(key => {
      const src = plugins[key];
      // 处理插件
      handleProject(src, dest + '/plugins/' + key, null, null, true);
    });
  }

  /**
   *
   * @param {*} src  源地址
   * @param {*} dest 目标地址
   * @param {*} plugins  处理的插件 key是插件名 value是插件目录
   * @param {*} assets   资源
   * @param {*} isPlugin  是否是插件
   */
  function handleProject(src, dest, plugins, assets, isPlugin) {
    assets = assets || config.getAssets(src);
    gulp.src(assets).pipe(gulp.dest(dest));

    // 处理样式文件
    gulp.src(`${src}/**/*.wxss`)
      .pipe(replace(/[\s\S]*/g, diffTag))
      .pipe(replace(/[\s\S]*/g, (match) => converter.wxss(match)))
      .pipe(through2.obj(function(file, enc, cb) {
        const path = file.history[0].replace(file.base, '').replace('.wxss', '');
        const jsonPath = file.history[0].replace('.wxss', '.json');
        const wxmlPath = file.history[0].replace('.wxss', '.wxml');

        // 对组件样式做scope处理
        fs.exists(wxmlPath, (exist) => {
          if (exist) {
            const json = fs.readFileSync(jsonPath);
            const wxml = fs.readFileSync(wxmlPath);
            const str = ab2str(file.contents);
            const hasImport = /<import/.test(wxml);
            const isCom = /"component":\s*true/.test(json);

            if (!hasImport && isCom) {
              const md5 = `_${md5Hex(path)}`;
              scopeStyle(md5, str).then((css) => {
                file.contents = str2ab(css);
                this.push(file);
                cb();
              });
            } else {
              this.push(file);
              cb();
            }
          } else {
            this.push(file);
            cb();
          }
        });
      }))
      .pipe(rename((file) => {
        file.extname = ".acss";
      }))
      .pipe(gulp.dest(dest));

    // 处理模板文件
    gulp.src(`${src}/**/*.wxml`)
      .pipe(replace(/[\s\S]*/g, diffTag))
      .pipe(replace(/[\s\S]*/g, (match) => converter.wxml(match)))
      .pipe(through2.obj(function(file, enc, cb) {
        const path = file.history[0].replace(file.base, '').replace('.wxml', '');
        const jsonPath = file.history[0].replace('.wxml', '.json');

        // 对组件模板做scope处理
        fs.exists(jsonPath, (exist) => {
          if (exist) {
            const json = fs.readFileSync(jsonPath);
            const isCom = /"component":\s*true/.test(json);

            if (isCom) {
              const md5 = `_${md5Hex(path)}`;
              const str = ab2str(file.contents);
              const node = new DOMParser().parseFromString(str);
              scopeTemplate(node, md5);
              const nodeStr = node.toString()
                .replace(/xmlns:a=""/g, '')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');

              file.contents = str2ab(nodeStr);
              this.push(file);
              cb();
            } else {
              this.push(file);
              cb();
            }
          } else {
            this.push(file);
            cb();
          }
        });
      }))
      .pipe(rename((path) => {
        path.extname = ".axml";
      }))
      .pipe(gulp.dest(dest));

    // 处理json  json对插件处理的有问题
    const jsonSrc = [`${src}/**/*.json`, `!${src}/**/package.json`];
    //对于插件的处理
    if (!isPlugin) {
      gulp.src(jsonSrc)
        .pipe(replace(/[\s\S]*/g, (match) => converter.json(match)))
        .pipe(through2.obj(function(file, enc, cb) {
          const path = file.history[0].replace(file.base, '');

          const spec = path.split(sysPath.sep);
          let seps = new Array(spec.length - 1).fill('..').join('/').replace(/^\.\./, '.');
          let str = ab2str(file.contents);
          //前面的converter 会把plugin前加上/
          str = str.replace(/\/?plugin:\/\/([\s\S]*?)\/([\s\S]*?)"/g, (match, pluginName, component) => {
            if (plugins[pluginName]){
              const pluginJSON = pluginsJSON[pluginName];
              let componentPath = pluginJSON.publicComponents[component];
              if (componentPath[0] === '/') { componentPath = componentPath.slice(1); }
              if (seps[0] === '/') {
                seps = seps.slice(1);
              }
              return `${seps}/plugins/${pluginName}/${componentPath}"`;
            } else {
              return match;
            }
          });

          if (path === '/app.json') {
            const data = JSON.parse(str);
            delete data.plugins;
            str = JSON.stringify(data, '', 4);
          }
          file.contents = str2ab(str);
          this.push(file);
          cb();
        }))
        .pipe(gulp.dest(dest)).on('end', () => {
          logger.info('处理 json 完成！');
        });
    } else {
      gulp.src(jsonSrc).pipe(replace(/[\s\S]*/g, (match) => converter.json(match))).pipe(gulp.dest(dest)).on('end', () => {
        logger.info('处理 json 完成！');
      });
    }

    // 处理js
    gulp.src(`${src}/**/*.js`)
      .pipe(replace(/[\s\S]*/g, diffTag))
      .pipe(replace(/[\s\S]*/g, (match) => converter.script(match)))
      .pipe(through2.obj(function(file, enc, cb) {
        // console.log(file.history[0])
        const path = file.history[0].replace(file.base, '');
        const spec = path.split(sysPath.sep);
        let adaptorspec = spec;
        // 如果是插件中的adaptor需要再向上查找2级
        if (isPlugin) {
          adaptorspec = spec.concat([1, 1]);
        }
        const adaptor = new Array(adaptorspec.length - 1).fill('..').concat('adaptor.js').join('/');
        // 相对与项目根目录
        const seps = new Array(spec.length - 1).fill('..').join('/').replace(/^\.\./, '.');

        let content = ab2str(file.contents);
        if (plugins) {
          content = content.replace(/requirePlugin\(['"]([\s\S]*?)['"]\)/g, (match, p1) => {
            return match.replace('requirePlugin', 'require').replace(p1, `${seps}/plugins/${p1}`);
          });
        }
        const str = [
       `import wx from '${adaptor.replace(/^\.\./, '.')}';`,
       content
        ].join('\r\n');
        file.contents = str2ab(str);
        this.push(file);
        cb();
      }))
      .pipe(gulp.dest(dest)).on('end', () => {
        logger.info('处理 js 完成！');
      });
  }
}

module.exports = convert;