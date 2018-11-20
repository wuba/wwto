# wx-to-all
> 将微信小程序自动转换成百度/微信/头条小程序

## 简介
**wx-to-all**是一款支持将原生微信小程序转换成`百度小城`、`阿里小程序`、`头条小程序`的工具集合。
使用**wx-to-all**，我们几乎不需要对已有的微信小程序做任何改动，就可以接近零成本获得`百度小城`、`阿里小程序`、`头条小程序`。

## 安装
```
 npm i gulp-wx-to-all
 // or
 yarn add gulp-wx-to-all
```

## 使用
```
const gulp = require('gulp');
const converter = require('gulp-wx-to-all');

// 转换成百度小程序
gulp.task('baidu', function(cb) {
    converter.toBaidu({
      src: './miniprogram-demo',
      dest: './baidu-miniprogram-demo'
    });
});

// 转换成阿里小程序
gulp.task('alibaba', function(cb) {
    converter.toBaidu({
      src: './miniprogram-demo',
      dest: './alibaba-miniprogram-demo'
    });
});

// 转换成头条小程序
gulp.task('alibaba', function(cb) {
    converter.toBaidu({
      src: './miniprogram-demo',
      dest: './toutiao-miniprogram-demo'
    });
});

// 转换成百度/阿里/头条小程序
gulp.task('all', function(cb) {
    converter.toAll({
      src: './miniprogram-demo',
      baiduDest: './baidu-miniprogram-demo',
      alibabaDest: './alibaba-miniprogram-demo',
      toutiaoDest: './toutiao-miniprogram-demo',
    });
});
```

## 使用案例
`wx-to-all`已经投入了我们的生产环境中使用，包括`58微聊`和`神奇江湖`


## 注意事项
注意事项是各平台不支持且无法通过本工具转换完成的一些点，如果要开发跨平台的应用需要规避或者降级处理。

### 百度小程序
- bind*={{str}}   `str`只能是字面量，不能包含运算（如：`bindtap="flag ? 'fn1' : 'fn2'"`）
- wx:for={{arr}}  `arr`只能是字面量，不不能包含运算（如：`wx:for="{{flag ? arr1 : arr2}}"`）
- 文件名必须与组件目录一致（`custom-com/custom-com.(js|json|wxml|wxss)`）
- 不要使用`setData`保存视图不需要的变量（如原生变量：`Animation`），继承字段会被丢弃
- 图片的`src`属性不能用数组赋值（如：`<image src="{{arr}}"></image>`）

### 头条小程序
- 不支持组件（如：`movable-area`、`movable-view`、`cover-view`、`cover-image`、`map`、`audio`、`canmera`等）
- `websocket`不能使用全局事件（如：`wx.onSocketOpen`）
- 录音功能没有全局方法（`wx.startRecord`, `wx.stopRecord`）
- 不支持背景音频
- 不支持实时音视频通话

### 阿里小程序