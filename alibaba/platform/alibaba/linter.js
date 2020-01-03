import wx from './../../adaptor.js';
const linter = require('./mp-linter').alibaba;
const commonLint = require('../../utils/linter');

function lint(opt = {}) {
  const sourcePath = opt.source || './src';
  commonLint('阿里', `${sourcePath}/**/*.wxml`, linter.wxmlFileRules, linter.wxmlLineRules);
  commonLint('阿里', `${sourcePath}/**/*.js`, linter.scriptFileRules, linter.scriptLineRules);
}

module.exports = lint;