const wxss = require('../../../src/converter/src/baidu/wxss.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'baidu wxss convert test:',
  wxss(`
  test.wxss
  background: url("//sungd.github.io/Pacifico.ttf") no-repeat;
  .div{
    image {}
  }`),
  `
  test.wxss
  background: url("https://sungd.github.io/Pacifico.ttf") no-repeat;
  .div{
    .fix-image-cls {}
  }`
)