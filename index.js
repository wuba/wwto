const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function wxToSwan(opt = {}) {
  const src = opt.src || './src';
  const dest = opt.dest || './baidu';
  const assets = opt.assets || [
    src + "/**/*.json",
    src + "/**/*.png",
    src + "/**/*.jpg",
    src + "/**/*.gif"
  ];

  gulp.src(assets)
    .pipe(gulp.dest(dest));

  gulp.src(src + "/**/*.wxss")
    .pipe(replace('.wxss"', '"'))
    .pipe(rename(function(path) {
      path.extname = ".css";
    }))
    .pipe(gulp.dest(dest));

  gulp.src(src + "/**/*.wxml")
    .pipe(replace('wx:', 's-'))
    .pipe(replace('s-for-items', 's-for'))
    .pipe(replace('.wxml', '.swan'))
    .pipe(replace(/scroll-into-view=["']{{([^}]+)}}["']/g, function(match, p1, offset, str) {
      return match.replace('{{', '').replace('}}', '').replace(p1, '{=' + p1 + '=}');
    }))
    .pipe(replace(/scroll-top=["']{{([^}]+)}}["']/g, function(match, p1, offset, str) {
      return match.replace('{{', '').replace('}}', '').replace(p1, '{=' + p1 + '=}');
    }))
    .pipe(replace(/scroll-left=["']{{([^}]+)}}["']/g, function(match, p1, offset, str) {
      return match.replace('{{', '').replace('}}', '').replace(p1, '{=' + p1 + '=}');
    }))
    .pipe(replace(/<template.*\s+data=["']{{([^}]+)}}/g, function(match, p1, offset, str) {
      return match.replace(p1, '{' + p1 + '}');
    }))
    .pipe(replace(/url=["']{{([^{}\s\?=]+)}}/ig, function(match, p1, offset, str) {
      return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
    }))
    .pipe(replace(/url\({{([^{}\s\?=]+)}}/ig, function(match, p1, offset, str) {
      return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
    }))
    .pipe(rename(function(path) {
      path.extname = ".swan";
    }))
    .pipe(gulp.dest(dest));

  const patch = fs.readFileSync('./swan-patch.js', 'utf8');
  gulp.src(src + "/**/*.js")
    .pipe(replace(/([\s\S]*)/, patch + '$1'))
    .pipe(gulp.dest(dest));
}

module.exports = wxToSwan;