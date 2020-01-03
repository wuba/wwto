const convert = require('../../../src/converter/src/toutiao/json.js');

function testJson(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testJson(
  'toutiao json convert test:',
  convert('test'),
  'test'
)