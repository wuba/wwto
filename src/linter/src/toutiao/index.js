const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');
const unsupportedAttrs = require('./unsupported-attrs');
const unsupportedEvents = require('./unsupported-events');

const wxmlLineRules = [
  (source) => {
    const rule = '组件头条小程序未实现';

    for (let i = 0; i < unsupportedTags.length; i++) {
      const fn = unsupportedTags[i];
      const reg = new RegExp(`<${fn}\\s+`);
      const match = source.match(reg);

      if (match) {
        return { source, rule: [fn, rule].join('') };
      }
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
  },

  (source) => {
    const regList = [
      {
        rule: 'scroll-view组件upper-threshold、lower-threshold、scroll-top、scroll-left属性不支持rpx',
        reg: `<scroll-view[^>]*(upper-threshold|lower-threshold|scroll-top|scroll-left)=["']\\d*rpx["']`
      },
      {
        rule: 'icon组件size属性不支持rpx',
        reg: `<icon[^>]*size=["']\\d*rpx["']`
      },
      {
        rule: 'progress组件stroke-width属性不支持rpx',
        reg: `<progress[^>]*stroke-width=["']\\d*rpx["']`
      },
      {
        rule: 'button组件open-type仅支持share',
        reg: `<button[^>]*open-type=["']((?!share).)*["']`
      },
      {
        rule: 'input组件cursor-spacing属性不支持rpx',
        reg: `<input[^>]*cursor-spacing=["']\\d*rpx["']`
      },
      {
        rule: 'textarea组件cursor-spacing属性不支持rpx',
        reg: `<textarea[^>]*cursor-spacing=["']\\d*rpx["']`
      },
      {
        rule: 'navigator组件open-type不支持支持reLaunch、exit',
        reg: `<navigator[^>]*open-type=["'](reLaunch|exit)["']`
      }
    ];

    for (let i = 0; i < regList.length; i++){
      const reg = new RegExp(regList[i].reg);
      const match = source.match(reg);

      if (match) {
        return { source, rule: regList[i].rule };
      }
    }
    return null;
  }
];

const wxmlFileRules = [
  (contents, path) => utils.unsupportedAttrOrEvents(contents, path, unsupportedAttrs, '头条', '属性'),
  (contents, path) => utils.unsupportedAttrOrEvents(contents, path, unsupportedEvents, '头条', '事件')
];

const wxssLineRules = [];
const wxssFileRules = [];

const scriptLineRules = [
  (source) => {
    const rule = '方法头条小程序未实现';

    for (let i = 0; i < unsupportedFns.length; i++) {
      const fn = unsupportedFns[i];
      const reg = new RegExp(`\\.${fn}\\(`);
      const match = source.match(reg);

      if (match) {
        return { source, rule: [fn, rule].join('') };
      }
    }

    return null;
  },

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
    const rule = '不支持`selectComponent`，可以通过监听属性的`observer`来实现外部的调用';
    const reg = /\.selectComponent\(/;
    const match = source.match(reg);

    if (match) {
      return { source: match[0], rule };
    }

    return null;
  }
];
const scriptFileRules = [];

module.exports = {
  wxmlLineRules,
  wxmlFileRules,
  wxssFileRules,
  wxssLineRules,
  scriptFileRules,
  scriptLineRules
};
