const utils = require('../../utils/utils');
const commonLint = require('../../utils/linter');

const wxmlLineRules = [
  (source) => {
    const rule = 'bind*={{str}}  `str`只能是函数名（字符串），不能包含函数计算（如：`bindtap="flag ? \'fn1\' : \'fn2\'"`）';
    const regBind = /bind\w+\s*=\s*['"]([^'"]+)['"]/;
    const regName = /^\w+$/;
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
    const regList = /{{\s*\w+\s*}}/;
    const match = source.match(regFor);

    if (match) {
      if (!regList.test(match[1])) {
        return { source: source, rule };
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
      let line = utils.calcLine(contents, source);
      schemes.push({path, line, source, rule});
    });

    return schemes;
  }
];

function lint(opt = {}) {
  const sourcePath = opt.source || './src';
  commonLint(sourcePath + '/**/*.wxml', wxmlFileRules, wxmlLineRules);
}

module.exports = lint;
