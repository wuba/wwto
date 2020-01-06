import wx from './../../../adaptor.js';
const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');
const unsupportedAttrs = require('./unsupported-attrs');
const unsupportedEvents = require('./unsupported-events');

const wxmlLineRules = [
  (source) => {
    const rule = '组件百度小程序未实现';

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
    const rule = 'bind*={{str}}  `str`只能是函数名（字符串），不能包含函数计算（如：`bindtap="flag ? \'fn1\' : \'fn2\'"`）';
    const regBind = /bind\w+\s*=\s*['"]([^'"]+)['"]/;
    const regName = /[^<>(?:]+/;
    const match = source.match(regBind);

    if (match) {
      if (!regName.test(match[1])) {
        return { source: match[0], rule };
      }
    }

    return null;
  },

  (source) => {
    const rule = 'wx:for={{arr}}  `arr`不能包含达式计算（如：`wx:for=\'{{flag ? arr1 : arr2}}\'`）';
    const regFor = /wx:for=['"](.+)['"]/;
    const regList = /[^<>(?:]+/;
    const match = source.match(regFor);

    if (match) {
      if (!regList.test(match[1])) {
        return { source, rule };
      }
    }

    return null;
  },

  (source) => {
    const rule = 'wxml不支持`hidden`';
    const reg = /\s+hidden=["'].+['"]/;
    const match = source.match(reg);

    if (match) {
      return { source, rule };
    }

    return null;
  },

  (source) => {
    const regList = [
      {
        rule: 'wxml不支持`hidden`',
        reg: `\\s+hidden=["'].+['"]`
      },
      {
        rule: 'scroll-view组件upper-threshold、lower-threshold、scroll-top、scroll-left属性不支持rpx',
        reg: `<scroll-view[^>]*(upper-threshold|lower-threshold|scroll-top|scroll-left)=["']\\d*rpx["']`
      },
      {
        rule: 'swiper组件previous-margin、next-margin属性不支持rpx',
        reg: `<swiper[^>]*(previous-margin|next-margin)=["']\\d*rpx["']`
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
        rule: 'input组件cursor-spacing属性不支持rpx',
        reg: `<input[^>]*cursor-spacing=["']\\d*rpx["']`
      },
      {
        rule: 'textarea组件cursor-spacing属性不支持rpx',
        reg: `<textarea[^>]*cursor-spacing=["']\\d*rpx["']`
      },
      {
        rule: 'input组件type属性不支持idcard',
        reg: `<input[^>]*type=["']idcard["']`
      },
      {
        rule: 'live-player组件src属性仅支持m3u8',
        reg: `<live-player[^>]*src=["']((?!m3u8).)*["']`
      },
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
  (contents, path) => {
    const rule = '在同一个标签上，`wx:for`和`wx:if`不能同时使用';
    const reg = /<[^>]+wx:for=[^>]+wx:if=['"](.+)['"][^>]*>/g;
    const schemes = [];

    contents.replace(reg, (source) => {
      const line = utils.calcLine(contents, source);
      schemes.push({
        path, line, source, rule
      });
    });

    return schemes;
  },
  (contents, path) => utils.unsupportedAttrOrEvents(contents, path, unsupportedAttrs, '百度', '属性'),
  (contents, path) => utils.unsupportedAttrOrEvents(contents, path, unsupportedEvents, '百度', '事件')
];

const wxssLineRules = [];

const wxssFileRules = [];

const scriptFileRules = [];

const scriptLineRules = [
  (source) => {
    const rule = '方法百度小程序未实现';

    for (let i = 0; i < unsupportedFns.length; i++) {
      const fn = unsupportedFns[i];
      const reg = new RegExp(`\\.${fn}\\(`);
      const match = source.match(reg);

      if (match) {
        return { source, rule: [fn, rule].join('') };
      }
    }

    return null;
  }
];

module.exports = {
  wxmlFileRules,
  wxmlLineRules,
  wxssFileRules,
  wxssLineRules,
  scriptFileRules,
  scriptLineRules
};
