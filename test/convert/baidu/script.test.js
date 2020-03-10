/* eslint-disable no-undef */
const convert = require('../../../src/converter/src/baidu/script.js');

function testScript(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testScript(
  'baidu script convert test:',
  convert(`
  "//github.com/fulme/wwto-cli.git/issues"
  commander.option()
  commander.transition()
  commander.timingFunction()`),
  `
  "https://github.com/fulme/wwto-cli.git/issues"
  commander.option()
  commander.transition()
  commander.timingFunction()`
);