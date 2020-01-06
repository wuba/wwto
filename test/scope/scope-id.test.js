/* eslint-disable no-undef */
const Plug = require('../../src/scope/scope-id.js');

function testCode(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testCode(
  'test:',
  Plug('add-id', ``),
  ``
);
