/* eslint-disable no-undef */
const Plug = require('../src/config.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}

testCode(
  'config test:',
  Plug.getAssets('/index/baidu'),
  ["/index/baidu/**/*.*", "!/index/baidu/**/package.json", "!/index/baidu/**/*.wxml", "!/index/baidu/**/*.wxss", "!/index/baidu/**/*.js", "!/index/baidu/**/*.json"]
);