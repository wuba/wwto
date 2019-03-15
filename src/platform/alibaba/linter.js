const linter = require('mp-linter').alibaba;
const commonLint = require('../../utils/linter');

function lint(opt = {}) {
  const sourcePath = opt.source || './src';
  commonLint(sourcePath + '/**/*.wxml', linter.wxmlFileRules, linter.wxmlLineRules);
  commonLint(sourcePath + '/**/*.js', linter.scriptFileRules, linter.scriptLineRules);
}

module.exports = lint;