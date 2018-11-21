const fs = require('fs');
const gulp = require('gulp');
const fse = require('fs-extra');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './alibaba';
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
        path.extname = ".acss";
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxml")
      .pipe(replace('wx:', 'a:'))
      .pipe(replace('a:for-items', 'a:for'))
      .pipe(replace('.wxml', '.axml'))
      .pipe(rename(function(path) {
        path.extname = ".axml";
      }))
      .pipe(replace(/\s+bind[\w]+=['"]/ig, function(match, p1) {
        // 事件绑定名称对齐
        return match.replace(/bind(\w)/g, (m, p1) => {return ['on', p1.toUpperCase()].join('')})
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.json")
      .pipe(replace(/usingComponents([^}]+)/g, function(match, p1) {
        return match.replace(/":\s*"([\w])/ig, (m, p1) => {
          // 相对路径必须加./
          return m.replace(p1, ['./', p1].join(''));
        });
      }))
      .pipe(gulp.dest(dest));

    const patch = fs.readFileSync(__dirname + '/patch.js', 'utf8');
    gulp.src(src + "/**/*.js")
      .pipe(replace(/([\s\S]*)/, patch + '$1'))
      .pipe(gulp.dest(dest));
  });
}

module.exports = convert;