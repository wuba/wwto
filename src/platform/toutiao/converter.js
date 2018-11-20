const fs = require('fs');
const gulp = require('gulp');
const fse = require('fs-extra');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function convert(opt = {}) {
  const src = opt.src || './src';
  const dest = opt.dest || './toutiao';
  const assets = opt.assets || [
    src + "/**/*.json",
    src + "/**/*.png",
    src + "/**/*.jpg",
    src + "/**/*.gif"
  ];

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
      .pipe(gulp.dest(dest));
  });
}

module.exports = convert;