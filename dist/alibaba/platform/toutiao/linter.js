import wx from './../../adaptor.js';
const linter = require('./mp-linter').toutiao;
const commonLint = require('../../utils/linter');

function lint(opt = {}) {
  const sourcePath = opt.source || './src';
  commonLint('头条', `${sourcePath}/**/*.wxml`, linter.wxmlFileRules, linter.wxmlLineRules);
  commonLint('头条', `${sourcePath}/**/*.js`, linter.scriptFileRules, linter.scriptLineRules);
}

module.exports = lint;