const wxss = require('../../../src/converter/lib/alibaba/wxss.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'alibaba wxss convert test:',
  // wxss('test.wxss\.wxss([])'),
  wxss(`test.wxss\.wxss(["'])`),
  `test.wxss.wxss([\"'])`
  // 'test.wxss.wxss([])'
)
