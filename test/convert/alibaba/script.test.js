const convert = require('../../../src/converter/lib/alibaba/script.js');

function testScript(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testScript(
  'alibaba script convert test:',
  convert(`
  Component()`, true),
  `
  Component()`
)