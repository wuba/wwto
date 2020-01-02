const wxss = require('../../../src/converter/lib/baidu/wxss.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'baidu wxss convert test:',
  wxss(`
  test\.wxss(["'])
  background: url(http://a?\stest) no-repeat;
  .a .image {}`),
  `
  test.wxss([\"'])
  background: url(http://a?stest) no-repeat;
  .a .image {}`
)