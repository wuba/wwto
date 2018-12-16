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

  fse.remove(dest).then(() => {
    gulp.src(assets)
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxss")
      .pipe(replace('.wxss"', '"'))
      .pipe(rename(function(path) {
        path.extname = ".ttss";
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxml")
      .pipe(replace('wx:', 'tt:'))
      .pipe(replace('tt:for-items', 'tt:for'))
      .pipe(replace('.wxml', '.ttml'))
      .pipe(rename(function(path) {
        path.extname = ".ttml";
      }))
      .pipe(gulp.dest(dest));

    const patch = fs.readFileSync(__dirname + '/patch.js', 'utf8');
    gulp.src(src + "/**/*.js")
      .pipe(replace(/([\s\S]*)/, patch + '$1'))
      .pipe(replace(/([\w]+)\.setData\([^)]+}\)/g, function(match, p1) {
        // 解决嵌套字段更新后无法刷新视图的问题
        const nest = /['"][\w]+\.[\w]+['"]/.test(match);
        if (nest) {
          return match.replace(match, [match, ';', p1, '.setData('+p1+'.data);'].join(''))
        }
        return match;
      }))
      .pipe(gulp.dest(dest));
  });
}

module.exports = convert;