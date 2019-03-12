const utils = require('../utils/utils');

const wxmlLineRules = [];

const wxmlFileRules = [];

const wxssFileRules = [];

const wxssLineRules = [];

const scriptLineRules = [
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