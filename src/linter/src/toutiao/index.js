const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');
const unsupportedAttrs = require('./unsupported-attrs');

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
  }
];

const wxmlFileRules = [
  (contents, path) => {
    const schemes = [];

    unsupportedAttrs.forEach((com) => {
      com.attrs.forEach((attr) => {
        const reg = new RegExp(`<${com}[^>]+${attr}=`);
        const match = contents.match(reg);

        if (match) {
          const line = utils.calcLine(contents, match);
          const rule = `头条小程序 ${com.tag} 组件不支持 ${attr} 属性`;
          schemes.push({
            path, line, source: match, rule
          });
        }
      });
    });

    return schemes;
  }
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
