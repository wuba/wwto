var wx = require('./../../adaptor.js').default;
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
const converter = require('mp-converter').toutiao;

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './toutiao';
  const assets = opt.assets || config.getAssets(src);

  gulp.src(assets)
    .pipe(gulp.dest(dest));

  gulp.src(`${src}/**/*.wxss`)
    .pipe(replace(/[\s\S]*/g, (match) => converter.wxss(match)))
    .pipe(rename((path) => {
      path.extname = ".ttss";
    }))
    .pipe(gulp.dest(dest));

  gulp.src(`${src}/**/*.wxml`)
    .pipe(replace(/[\s\S]*/g, (match) => converter.wxml(match)))
    .pipe(rename((path) => {
      path.extname = ".ttml";
    }))
    .pipe(gulp.dest(dest));

  const destConfigFile = `${dest}/project.config.json`;
  const jsonSrc = [`${src}/**/*.json`];
  fs.exists(destConfigFile, (exist) => {
    if (exist) {
      jsonSrc.push(`!${src}/project.config.json`);
    }
    gulp.src(jsonSrc).pipe(gulp.dest(dest));
  });

  // 注入适配器代码
  gulp.src(sysPath.resolve(__dirname, '../../adaptor/lib/alibaba.js'))
    .pipe(rename('adaptor.js'))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('复制 adaptor.js 完成！');
    });

  gulp.src(`${src}/**/*.js`)
    .pipe(replace(/[\s\S]*/g, (match) => converter.script(match)))
    .pipe(through2.obj(function(file, enc, cb) {
      const path = file.history[0].replace(file.base, '');
      const spec = path.split(sysPath.sep);
      const adaptor = new Array(spec.length).fill('..').concat('adaptor.js').join('/');
      const str = [
        `var wx = require('${adaptor.replace(/^\.\./, '.')}').default;`,
        ab2str(file.contents)
      ].join('\r\n');
      file.contents = str2ab(str);

      this.push(file);
      cb();
    }))
    .pipe(gulp.dest(dest));
}

module.exports = convert;