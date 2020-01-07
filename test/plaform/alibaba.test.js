/* eslint-disable no-undef */
// const cover = require('../../src/platform/alibaba/converter.js');
const lint = require('../../src/platform/alibaba/linter.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}

testCode(
  'platform alibaba linter test:',
  lint(opt = {}),
  function lint(opt = {}) {
    const sourcePath = opt.source || './src';
    commonLint('阿里', `${sourcePath}/**/*.wxml`, linter.wxmlFileRules, linter.wxmlLineRules);
    commonLint('阿里', `${sourcePath}/**/*.js`, linter.scriptFileRules, linter.scriptLineRules);
  }
);
