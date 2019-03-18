const utils = require('../utils/utils');
const unsupportedFns = require('./unsupported-fns');
const unsupportedTags = require('./unsupported-tags');
const unsupportedAttrs = require('./unsupported-attrs');

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
          const rule = `阿里小程序 ${com.tag} 组件不支持 ${attr} 属性`;
          schemes.push({
            path, line, source: match, rule
          });
        }
      });
    });

    return schemes;
  }
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
