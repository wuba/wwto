# wx-to-swan
WeChat mini-program to baidu mini-program.
将微信小程序自动转换成百度小程序。

## Install
```
 npm i gulp-wx-to-swan
 // or
 yarn add gulp-wx-to-swan
```

## How to use
```
var gulp = require('gulp');
var wxToSwan = require('gulp-wx-to-swan');

gulp.task('tinypng', function(cb) {
    wxToSwan({
      src: './miniprogram-demo',
      dest: './baidu-miniprogram-demo'
    });
});
```