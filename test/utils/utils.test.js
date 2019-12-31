const Plugins = require('../../src/utils/utils.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'utils testing:',
  Plugins.calcLine(`https://
  element.eleme.cn/#/
  zh-CN/component/input
  #autocomplete-methods`, `#`),
  2
)