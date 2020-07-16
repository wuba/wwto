const sysPath = require('path');
const gulp = require('gulp');
const ab2str = require('arraybuffer-to-string');
const str2ab = require('to-buffer');
const through2 = require('through2');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const config = require('../../config');
const logger = require('../../utils/logger');
const converter = require('mp-converter').baidu;
const diffTag = require('../diff/index').diffTag('baidu');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './baidu';

  // 注入适配器代码
  gulp.src(sysPath.resolve(__dirname, '../../adaptor/lib/baidu.js'))
    .pipe(rename('adaptor.js'))
    .pipe(gulp.dest(dest))
    .on('end', () => {
      logger.info('复制 adaptor.js 完成！');
    });
  // 插件拷贝到 src/plugins/插件名称内
  // 插件的拷贝位置是src下的plugins下的pluginName
  const plugins = opt.config && opt.config.plugins;

  // 处理项目
  handleProject(src, dest, plugins, null, false);

  if (plugins) {
    Object.keys(plugins).forEach(key => {
      const src = plugins[key];
      // 处理插件
      handleProject(src, dest + '/plugins/' + key, null, null, true);
    });
  }

  function handleProject(src, dest, plugins, assets, isPlugin) {
    assets = assets || config.getAssets(src);
    gulp.src(assets).pipe(gulp.dest(dest));
    // 处理wxss
    gulp.src(`${src}/**/*.wxss`)
      .pipe(replace(/[\s\S]*/g, diffTag))
      .pipe(replace(/[\s\S]*/g, (match) => converter.wxss(match)))
      .pipe(rename((path) => {
        path.extname = ".css";
      }))
      .pipe(gulp.dest(dest)).on('end', () => {
        logger.info('处理 wxss 完成！');
      });

    // 处理wxml
    gulp.src(`${src}/**/*.wxml`)
      .pipe(replace(/[\s\S]*/g, diffTag))
      .pipe(replace(/[\s\S]*/g, (match) => converter.wxml(match)))
      .pipe(rename((path) => {
        path.extname = ".swan";
      }))
      .pipe(gulp.dest(dest)).on('end', () => {
        logger.info('处理 wxml 完成！');
      });

    // 处理json  json对插件处理的有问题
    const jsonSrc = [`${src}/**/*.json`];
    const jsonStream = gulp.src(jsonSrc).pipe(replace(/[\s\S]*/g, (match) => converter.json(match)));
    if (plugins) {
      jsonStream.pipe(through2.obj(function(file, enc, cb) {
        const path = file.history[0].replace(file.base, '');

        const spec = path.split(sysPath.sep);
        const seps = new Array(spec.length - 1).fill('..').join('/').replace(/^\.\./, '.');
        let str = ab2str(file.contents);
        console.log(file.history[0]);
        if (~file.history[0].indexOf('chat.json')) {
          debugger;
        }
        str = str.replace(/plugin:\/\/([\s\S]*?)\/([\s\S]*)/g, (match, p1, p2) => {
          if (plugins[p1]){
            return `${seps}/plugins/${p1}/${p2}`;
          } else {
            return match;
          }
        });

        file.contents = str2ab(str);
        this.push(file);
      }));
    };
    jsonStream.pipe(gulp.dest(dest)).on('end', () => {
      logger.info('处理 json 完成！');
    });

    // 处理js
    gulp.src(`${src}/**/*.js`)
      .pipe(replace(/[\s\S]*/g, diffTag))
      .pipe(replace(/[\s\S]*/g, (match) => converter.script(match)))
      .pipe(through2.obj(function(file, enc, cb) {
        const path = file.history[0].replace(file.base, '');
        const spec = path.split(sysPath.sep);
        let adaptorspec = spec;
        if (isPlugin) {
          adaptorspec = spec.concat([1, 1]);
        }
        const adaptor = new Array(adaptorspec.length - 1).fill('..').concat('adaptor.js').join('/');
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