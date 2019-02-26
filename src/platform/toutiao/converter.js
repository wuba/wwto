const fs = require('fs');
const sysPath = require('path');
const gulp = require('gulp');
const fse = require('fs-extra');
const ab2str = require('arraybuffer-to-string');
const str2ab = require('to-buffer');
const through2 = require('through2');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const config = require('../../config');
const logger = require('../../utils/logger');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './toutiao';
  const assets = opt.assets || config.getAssets(src);

  // fse.remove(dest).then(() => {
    gulp.src(assets)
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxss")
      .pipe(replace(/\.wxss(["'])/g, function(match, p1) {
        return p1;
      }))
      .pipe(replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
        // 背景url属性值必须带协议
        return match.replace(/\/\//g, m => 'https:' + m);
      }))
      .pipe(replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
        // 背景url属性值必须带协议
        return match.replace(/\/\//g, m => 'https:' + m);
      }))
      .pipe(rename(function(path) {
        path.extname = ".ttss";
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxml")
      .pipe(replace('wx:', 'tt:'))
      .pipe(replace('tt:for-items', 'tt:for'))
      .pipe(replace('.wxml', '.ttml'))
      .pipe(replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
        // 背景url属性值必须带协议
        return match.replace(/\/\//g, m => 'https:' + m);
      }))
      .pipe(replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
        // 背景url属性值必须带协议
        return match.replace(/\/\//g, m => 'https:' + m);
      }))
      .pipe(replace(/url=["']{{([^{}\s\?=]+)}}/ig, function(match, p1) {
        // url属性值必须带协议
        return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
      }))
      .pipe(replace(/url\({{([^{}\s\?=]+)}}/ig, function(match, p1) {
        // 背景url属性值必须带协议
        return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
      }))
      .pipe(rename(function(path) {
        path.extname = ".ttml";
      }))
      .pipe(gulp.dest(dest));

    const destConfigFile = dest + '/project.config.json';
    const jsonSrc = [src + "/**/*.json"];
    fs.exists(destConfigFile, (exist) => {
      if(exist) {
        jsonSrc.push('!' + src + '/project.config.json');
      }
      gulp.src(jsonSrc).pipe(gulp.dest(dest));
    });

    // 注入适配器代码
    //fs.readFileSync(__dirname + '/patch.js', 'utf8');
    gulp.src(__dirname + '/adaptor.js').pipe(gulp.dest(dest)).on('end', () => {
      logger.info('复制 adaptor.js');
    });

    gulp.src(src + "/**/*.js")
      .pipe(replace(/['"](\/\/\w+\.\w+)/g, function(match, p1) {
        return match.replace(p1, ['https:', p1].join(''));
      }))
      .pipe(replace(/\.option\.transition\.delay/g, '.delay'))
      .pipe(replace(/\.option\.transition\.duration/g, '.duration'))
      .pipe(replace(/\.option\.transition\.timingFunction/g, '.duration'))
      .pipe(through2.obj(function(file, enc, cb) {
        let path = file.history[0].replace(file.base, '');
        let spec = path.split(sysPath.sep);
        let adaptor = new Array(spec.length).fill('..').concat('adaptor.js').join('/');
        let str = [
          'var wx = require(\'' + adaptor.replace(/^\.\./, '.') + '\').default;',
          ab2str(file.contents)
        ].join('\r\n');
        file.contents = str2ab(str);

        this.push(file);
        cb();
      }))
      .pipe(gulp.dest(dest));
  // });
}

module.exports = convert;