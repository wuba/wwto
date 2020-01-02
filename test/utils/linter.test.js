const lint = require('../../src/utils/linter.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'utils linter testing:',
  lint('alibaba', '../../src/platform/alibaba', '', ''),
  undefined
);