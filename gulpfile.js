'use strict';

const gulp = require('gulp');
const pump = require('pump');
const watch = require('gulp-watch');
const sequence = require('gulp-sequence');
const uglifyES = require('gulp-uglify-es').default;
const wto = require('./lib/index');

gulp.task('baidu', function() {
  return wto.toBaidu({
    source: './demo/miniprogram-demo',
    target: './demo/dist/baidu-miniprogram-demo'
  });
});

gulp.task('alibaba', function() {
  return wto.toAlibaba({
    source: './demo/miniprogram-demo',
    target: './demo/dist/alibaba-miniprogram-demo'
  });
});

gulp.task('toutiao', function() {
  return wto.toToutiao({
    source: './demo/miniprogram-demo',
    target: './demo/dist/toutiao-miniprogram-demo'
  });
});

gulp.task('test', function(cb) {
  sequence(
    'baidu',
    'alibaba',
    'toutiao',
    () => {
      console.log('转换完毕！');
    }
  )
});

gulp.task('watch', function(cb) {
  return watch('src/**/*.js', function(file) {
    const path = file.history[0];
    console.log('开始压缩：', path);

    return gulp.src(path)
      .pipe(uglifyES())
      .pipe(gulp.dest('lib'))
      .on('end', () => {
        console.log('压缩完成：', path);
        cb && cb();
      });
  });
});

gulp.task('build', function(cb) {
  console.log('开始转换...');
  pump([
    gulp.src('src/**/*.js'),
    uglifyES(),
    gulp.dest('lib')
  ], () => {
    console.log('转换完成！');
    cb && cb();
  });
});