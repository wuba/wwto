const Plug = require('../../src/scope/scope-style.js');

function testCode(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(JSON.stringify(code1)).toBe(JSON.stringify(code2))
  });
}

testCode(
  'scope-style testing:',
  Plug('map', 'test'),
  {}
)