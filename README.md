# wto
> **wto**: wechat mini-program to other mini-program

## 简介
**wto**是一款支持将原生微信小程序转换成其他小程序的工具集合。  
使用**wto**，几乎不需要对已有的微信小程序做任何改动，可以接近零成本获得`百度小程序`、`阿里小程序`、`头条小程序`。

## 安装
```shell
  npm config set registry http://ires.58corp.com/repository/58npm
  npm i wto-cli -g

  #or
  yarn config set registry http://ires.58corp.com/repository/58npm
  yarn global add wto-cli
```

## 使用
### 命令行
```shell
  # 转换成百度小程序
  wto build -p baidu -s src -t dist/baidu
  
  # 转换成阿里小程序
  wto build -p alibaba -s src -t dist/alibaba
  
  # 转换成头条小程序
  wto build -p toutiao -s src -t dist/toutiao
  
  # 转换成百度&&阿里&&头条小程序
  wto build -s src -t dist
```

### 打包工具
```javascript
const gulp = require('gulp');
const wto = require('wto-cli');

// 转换成百度/阿里/头条小程序
gulp.task('all', function(cb) {
    wto.toAll({
      source: './miniprogram-demo',
      baiduTarget: './baidu-miniprogram-demo',
      alibabaTarget: './alibaba-miniprogram-demo',
      toutiaoTarget: './toutiao-miniprogram-demo',
    });
});
```

## 使用案例
`wto`已经投入了我们的生产环境中使用，包括`58微聊`和`神奇江湖`


## 注意事项
注意事项是各平台不支持且无法通过本工具转换完成的一些点，如果要开发跨平台的应用需要规避或者降级处理。

### 百度小程序
- bind*={{str}}   `str`不能包含函数调用（如：`bindtap="flag ? 'fn1' : 'fn2'"`）
- wx:for={{arr}}  `arr`不能包含函数调用（如：`wx:for="{{flag ? arr1 : arr2}}"`）
- 不要使用`setData`保存视图不需要的变量（如原生变量：`Animation`），继承字段会被丢弃
- 图片的`src`属性不能用数组赋值（如：`<image src="{{arr}}"></image>`）

### 头条小程序
- 不支持组件（如：`movable-area`、`movable-view`、`cover-view`、`cover-image`、`map`、`audio`、`canmera`等）
- `websocket`不能使用全局事件（如：`wx.onSocketOpen`）
- 录音功能没有全局方法（`wx.startRecord`, `wx.stopRecord`）
- 不支持背景音频
- 不支持实时音视频通话
- 条件/循环渲染，不能进行函数调用运算（如：`wx:if="{{['aa', 'bb'].indexOf('aa')===-1}}"`）
- 图片的`src`属性不能用数组赋值（如：`<image src="{{arr}}"></image>`）
- `wx:for`不支持对象，从源码规避（转换一下）
- 不支持`selectComponent`，可以通过监听属性的`observer`来实现外部的调用

### 阿里小程序
- `json`文件或模板绝对路径必须以`/`开头，相对路径必须以./开头
- 自定义组件命名只能使用短横线（custom-com）
- `fetch`是全局只读对象，不能对其赋值
- `require`，参数只能是字符串直接量，不能是变量（如：`var path = '/a/b/c'; require(path);`）
- `triggerEvent(name, data)`，`name`目前只支持字符串直接量，不支持变量
- `swiper`组件手动设置`current`后，不会自动触发`bindChange`事件，如果需要主动触发
- 只能存在一个`websocket`连接
- 组件样式不是隔离的，父子组件之间class不要重复
- 自定义组件不能响应事件（如：bindTap）