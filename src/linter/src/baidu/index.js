const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');
const unsupportedAttrs = require('./unsupported-attrs');

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
  (contents, path) => {
    const schemes = [];

    unsupportedAttrs.forEach((com) => {
      com.attrs.forEach((attr) => {
        const reg = new RegExp(`<${com}[^>]+${attr}=`);
        const match = contents.match(reg);

        if (match) {
          const line = utils.calcLine(contents, match);
          const rule = `百度小程序 ${com.tag} 组件不支持 ${attr} 属性`;
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
