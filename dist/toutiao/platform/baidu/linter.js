var wx = require('./../../adaptor.js').default;
const linter = require('mp-linter').baidu;
const commonLint = require('../../utils/linter');

function lint(opt = {}) {
  const sourcePath = opt.source || './src';
  commonLint('百度', `${sourcePath}/**/*.wxml`, linter.wxmlFileRules, linter.wxmlLineRules);
  commonLint('百度', `${sourcePath}/**/*.js`, linter.scriptFileRules, linter.scriptLineRules);
}

module.exports = lint;