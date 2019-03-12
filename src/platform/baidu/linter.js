const linter = require('mp-linter').baidu;
const commonLint = require('../../utils/linter');

function lint(opt = {}) {
  const sourcePath = opt.source || './src';
  commonLint(sourcePath + '/**/*.wxml', linter.wxmlFileRules, linter.wxmlLineRules);
}

module.exports = lint;