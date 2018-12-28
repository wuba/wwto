const fs = require('fs');
const gulp = require('gulp');
const fse = require('fs-extra');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const config = require('../../config');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './toutiao';
  const assets = opt.assets || config.getAssets(src);

  // fse.remove(dest).then(() => {
    gulp.src(assets)
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxss")
      .pipe(replace('.wxss"', '"'))
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

    gulp.src(src + "/**/*.json").pipe(gulp.dest(dest));

    const patch = fs.readFileSync(__dirname + '/patch.js', 'utf8');
    gulp.src(src + "/**/*.js")
      .pipe(replace(/['"](\/\/\w+\.\w+)/g, function(match, p1) {
        return match.replace(p1, ['https:', p1].join(''));
      }))
      .pipe(replace(/([\s\S]*)/, patch + '$1'))
      .pipe(replace(/\.option\.transition\.delay/g, '.delay'))
      .pipe(replace(/\.option\.transition\.duration/g, '.duration'))
      .pipe(replace(/\.option\.transition\.timingFunction/g, '.duration'))
      .pipe(replace(/([\w]+)\.setData\([^)]+}\)/g, function(match, p1) {
        // 解决嵌套字段更新后无法刷新视图的问题
        const nest = /['"][\w]+\.[\w]+['"]/.test(match);
        if (nest) {
          return match.replace(match, [match, ';', p1, '.setData(' + p1 + '.data);'].join(''))
        }
        return match;
      }))
      .pipe(gulp.dest(dest));
  // });
}

module.exports = convert;