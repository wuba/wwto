const utils = require('../../utils/utils');
const commonLint = require('../../utils/linter');

const wxmlLineRules = [
  (source) => {
    const rule = '不支持组件（如：`movable-area`、`movable-view`、`cover-view`、`cover-image`、`map`、`audio`、`canmera`等）';
    const reg = /<(movable-\w+|map|audio|canmera|live-\w+)[^>]*>/;
    const match = source.match(reg);

    if (match) {
      return { source: match[0], rule };
    }

    return null;
  },
  (source) => {
    const rule = '条件/循环渲染，不能进行函数调用运算（如：`wx:if="{{[\'aa\', \'bb\'].indexOf(\'aa\')===-1}}"`）';
    const reg = /wx:(for|if)=['"](.+)['"]/;
    const regFn = /\.\w+\(/;
    const match = source.match(reg);

    if (match) {
      if (regFn.test(match[0])) {
        return { source: match[0], rule };
      }
    }

    return null;
  }
];

const wxmlFileRules = [];

const jsLineRules = [
  (source) => {
    const rule = '`websocket`不能使用全局事件（如：`wx.onSocketOpen`）';
    const reg = /wx\.onSocketOpen/;
    const match = source.match(reg);

    if (match) {
      return { source: match[0], rule };
    }

    return null;
  },
  (source) => {
    const rule = '录音功能没有全局方法（`wx.startRecord`, `wx.stopRecord`）';
    const reg = /wx\.(startRecord|stopRecord)/;
    const match = source.match(reg);

    if (match) {
      return { source: match[0], rule };
    }

    return null;
  },
  (source) => {
    const rule = '不支持背景音频';
    const reg = /wx\.\w+BackgroundAudio/;
    const match = source.match(reg);

    if (match) {
      return { source: match[0], rule };
    }

    return null;
  },
  (source) => {
    const rule = '不支持`selectComponent`，可以通过监听属性的`observer`来实现外部的调用';
    const reg = /\.selectComponent\(/;
    const match = source.match(reg);

    if (match) {
      return { source: match[0], rule };
    }

    return null;
  }
];
const jsFileRules = [];

function lint(sourcePath = './src') {
  commonLint(sourcePath + '/**/*.wxml', wxmlFileRules, wxmlLineRules);
  commonLint(sourcePath + '/**/*.js', jsFileRules, jsLineRules);
}

module.exports = lint;
