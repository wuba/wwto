

const gulp = require('gulp');
const pump = require('pump');
const watch = require('gulp-watch');
const sequence = require('gulp-sequence');
const uglifyES = require('gulp-uglify-es').default;
const wto = require('./src/index');

const source = [
  'src/**/*.js',
  '!src/converter/**/*.*',
  '!src/linter/**/*.*',
  '!src/adaptor/**/*.*'
];

gulp.task('baidu', () => wto.toBaidu({
  source: './demo/miniprogram-demo',
  target: './demo/dist/baidu-miniprogram-demo'
}));

gulp.task('alibaba', () => wto.toAlibaba({
  source: './demo/miniprogram-demo',
  target: './demo/dist/alibaba-miniprogram-demo'
}));

gulp.task('toutiao', () => wto.toToutiao({
  source: './demo/miniprogram-demo',
  target: './demo/dist/toutiao-miniprogram-demo'
}));

gulp.task('test', () => {
  console.log('开始转换...');
  sequence('baidu', 'alibaba', 'toutiao')(() => {
    // console.log('转换完毕!');
  });
});

const UGLIFY_OPTIONS = {
  compress: {}
};

gulp.task('debug', ['build'], () => watch(source, (file) => {
  const path = file.history[0];
  console.log('开始压缩：', path);

  return gulp.src(path)
    .pipe(uglifyES(UGLIFY_OPTIONS))
    .pipe(gulp.dest('lib'))
    .on('end', () => {
      console.log('压缩完成：', path);
    });
}));

gulp.task('build', (cb) => {
  console.log('开始转换...');
  pump([
    gulp.src(source),
    uglifyES(UGLIFY_OPTIONS),
    gulp.dest('lib')
  ], () => {
    console.log('转换完成！');
    cb && cb();
  });
});

gulp.task('lint', (cb) => wto.lintAll({
  source: './demo/miniprogram-demo'
}));