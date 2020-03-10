/* eslint-disable no-undef */
const convert = require('../../../src/converter/src/baidu/json.js');

function testJson(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testJson(
  'baidu json convert test:',
  convert(`
  "usingComponents": {
    "setTabBar": "./components/set-tab-bar/set-tab-bar",
    "path": "/ test/convert alibaba/json.test.js"
  }`),
  `
  "usingComponents": {
    "set-tab-bar": "./components/set-tab-bar/set-tab-bar",
    "path": "/ test/convert alibaba/json.test.js"
  }`
);