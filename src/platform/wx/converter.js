const gulp = require('gulp');
const replace = require('gulp-replace');
const config = require('../../config');
const diffTag = require('../diff/index').diffTag('wx');
const logger = require('../../utils/logger');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './wx';
  const assets = opt.assets || config.getAssets(src);
  debugger;
  console.log('likd-a', config.getAssets(src), src);
  gulp.src(assets)
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('资源拷贝完成！');
    });

  gulp.src(`${src}/**/*.wxss`)
    .pipe(replace(/[\s\S]*/g, diffTag))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('微信：wxss文件编译完成！');
    });

  gulp.src(`${src}/**/*.wxml`)
    .pipe(replace(/[\s\S]*/g, diffTag))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('微信：wxml文件编译完成！');
    });

  // const destConfigFile = `${dest}/project.config.json`;
  const jsonSrc = [`${src}/**/*.json`, `!${src}/**/package.json`];
  // fs.exists(destConfigFile, (exist) => {
  // fs.stat(destConfigFile, (exist) => {
  // if (exist) {
  //   jsonSrc.push(`!${src}/project.config.json`);
  // }
  gulp.src(jsonSrc).pipe(gulp.dest(dest)).on('end', () => {
    logger.info('微信：json文件编译完成！');
  });
  // });

  gulp.src(`${src}/**/*.js`)
    .pipe(replace(/[\s\S]*/g, diffTag))
    .pipe(gulp.dest(dest)).on('end', () => {
      logger.info('微信：js文件编译完成！');
    });
}

module.exports = convert;