/* eslint-disable no-undef */
const Plug = require('../../src/scope/scope-template.js');

function testCode(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testCode(
  'scope-template testing:',
  // Plug('template', 'head'),
  Plug('view', ''),
  undefined
);