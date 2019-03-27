const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');
const unsupportedAttrs = require('./unsupported-attrs');
const unsupportedEvents = require('./unsupported-events');

const wxmlLineRules = [
  (source) => {
    const rule = '组件阿里小程序未实现';

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
    const attrs = ['contact', 'getUserInfo', 'getPhoneNumber', 'openSetting', 'feedback'].join('|');
    const rule = `阿里小程序 button 组件 不支持 ${attrs} 属性`;
    const reg = `<button[^>]*open-type=["'](contact|getUserInfo|getPhoneNumber|openSetting|feedback)["']`;
    const match = source.match(reg);

    if (match) {
      return { source, rule };
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
  (contents, path) => utils.unsupportedAttrOrEvents(contents, path, unsupportedAttrs, '阿里', '属性'),
  (contents, path) => utils.unsupportedAttrOrEvents(contents, path, unsupportedEvents, '阿里', '事件')
];

const wxssFileRules = [];

const wxssLineRules = [];

const scriptLineRules = [
  (source) => {
    const rule = '方法阿里小程序未实现';

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

const scriptFileRules = [
  (contents, path) => {
    const rule = '`require`，参数只能是字符串直接量，不能是变量（如：`var path = \'/a/b/c\'; require(path);`）';
    const reg = /require\(([^)]+)\)/;
    const regStr = /['"][\w/.]+['"]/;
    const match = contents.match(reg);

    if (match) {
      if (!regStr.test(match[1])) {
        const line = utils.calcLine(contents, match[0]);
        return {
          line, path, source: match[0], rule
        };
      }
    }

    return null;
  },

  (contents, path) => {
    const rule = 'triggerEvent(name, data)`，`name`目前只支持字符串直接量，不支持变量';
    const reg = /triggerEvent\(([^)]+)\)/;
    const regStr = /triggerEvent\(['"]/;
    const match = contents.match(reg);

    if (match) {
      if (!regStr.test(match[0])) {
        const line = utils.calcLine(contents, match[0]);
        return {
          line, path, source: match[0], rule
        };
      }
    }

    return null;
  }
];

module.exports = {
  wxmlLineRules,
  wxmlFileRules,
  wxssLineRules,
  wxssFileRules,
  scriptLineRules,
  scriptFileRules
};
