/* eslint-disable no-undef */
const Plug = require('../../../src/converter/src/utils/extra-function.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}

testCode(
  'convert util extra-function testing:',
  Plug(`
  success: function (res) {}
  success: (res) => {}`, ''),
  { args: "res", body: "{}", name: "" }
);