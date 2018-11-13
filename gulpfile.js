'use strict';

const gulp = require('gulp');
const wxToSwan = require('./index');

gulp.task('test', function(cb) {
  wxToSwan({
    src: './miniprogram-demo',
    dest: './baidu-miniprogram-demo'
  });
});