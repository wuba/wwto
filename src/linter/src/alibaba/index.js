const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');

const wxmlLineRules = [
  (source) => {
    const rule = '组件阿里小程序未实现';

    for (let i = 0; i < unsupportedTags.length; i++) {
      let fn = unsupportedTags[i];
      let reg = new RegExp('<' + fn + '\\s+');
      let match = source.match(reg);

      if (match) {
        return {source: source, rule: [fn, rule].join('')};
      }
    }

    return null;
  }
];

const wxmlFileRules = [];

const wxssFileRules = [];

const wxssLineRules = [];

const scriptLineRules = [
  (source) => {
    const rule = '方法阿里小程序未实现';

    for (let i = 0; i < unsupportedFns.length; i++) {
      let fn = unsupportedFns[i];
      let reg = new RegExp('\\.' + fn + '\\(');
      let match = source.match(reg);

      if (match) {
        return {source: source, rule: [fn, rule].join('')};
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
        let line = utils.calcLine(contents, match[0]);
        return { line, path, source: match[0], rule };
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
        let line = utils.calcLine(contents, match[0]);
        return { line, path, source: match[0], rule };
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