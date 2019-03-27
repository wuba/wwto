const fs = require('fs');
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
const plugin = require('mp-plugin');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './baidu';
  const assets = opt.assets || config.getAssets(src);

  gulp.src(assets).pipe(gulp.dest(dest));

  // 处理wxss
  gulp.src(`${src}/**/*.wxss`)
    .pipe(replace(/[\s\S]*/g, (match) => converter.wxss(match)))
    .pipe(rename((path) => {
      path.extname = ".css";
    }))
    .pipe(gulp.dest(dest));

  // 处理wxml
  gulp.src(`${src}/**/*.wxml`)
    .pipe(replace(/[\s\S]*/g, (match) => converter.wxml(match)))
    .pipe(rename((path) => {
      path.extname = ".swan";
    }))
    .pipe(gulp.dest(dest));

  // 处理json
  const destConfigFile = `${dest}/project.config.json`;
  const jsonSrc = [`${src}/**/*.json`];
  fs.exists(destConfigFile, (exist) => {
    if (exist) {
      // 只复制一次
      jsonSrc.push(`!${src}/project.config.json`);
    }

    gulp.src(jsonSrc)
      .pipe(replace(/[\s\S]*/g, (match) => converter.json(match)))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        plugin.convertPlugin({
          source: dest
        });
      });
  });

  // 注入适配器代码
  gulp.src('node_modules/mp-adaptor/lib/baidu.js')
    .pipe(rename('adaptor.js'))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('复制 adaptor.js 完成！');
    });

  // 处理js
  return gulp.src(`${src}/**/*.js`)
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
    .pipe(gulp.dest(dest))
    .on('end', () => {
      plugin.convertCaller({source: dest});
    });
}

module.exports = convert;