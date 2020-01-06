import wx from './../../adaptor.js';
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
const converter = require('mp-converter').alibaba;
const scopeStyle = require('../../scope/scope-style');
const scopeTemplate = require('../../scope/scope-template');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './alibaba';
  const assets = opt.assets || config.getAssets(src);

  gulp.src(assets).pipe(gulp.dest(dest));

  // 处理样式文件
  gulp.src(`${src}/**/*.wxss`)
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

  // 处理配置文件
  const destConfigFile = `${dest}/project.config.json`;
  const jsonSrc = [`${src}/**/*.json`];
  fs.exists(destConfigFile, (exist) => {
    if (exist) {
      // 只拷贝一次
      jsonSrc.push(`!${src}/project.config.json`);
    }

    gulp.src(jsonSrc)
      .pipe(replace(/[\s\S]*/g, (match) => converter.json(match)))
      .pipe(gulp.dest(dest));
  });

  // 注入适配器代码
  gulp.src(sysPath.resolve(__dirname, '../../adaptor/lib/alibaba.js'))
    .pipe(rename('adaptor.js'))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('复制 adaptor.js 完成！');
    });

  // 处理脚本文件
  gulp.src(`${src}/**/*.js`)
    .pipe(replace(/[\s\S]*/g, (match) => converter.script(match)))
    .pipe(through2.obj(function(file, enc, cb) {
      const path = file.history[0].replace(file.base, '');
      const spec = path.split(sysPath.sep);
      const adaptor = new Array(spec.length).fill('..').concat('adaptor.js').join('/');
      const str = [
        `import wx from '${adaptor.replace(/^\.\./, '.')}';`,
        ab2str(file.contents)
      ].join('\r\n');
      file.contents = str2ab(str);

      this.push(file);
      cb();
    }))
    .pipe(gulp.dest(dest));
}

module.exports = convert;