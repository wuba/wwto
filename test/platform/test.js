const linter = require('../../src/platform/alibaba/linter.js');
const cover = require('../../src/platform/alibaba/converter.js')

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'platform alibaba linter testing:',
  linter.lint,
  undefined
)

testCode(
  'platform alibaba converter testing:',
  cover.convert,
  undefined
)
