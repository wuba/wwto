const Plug = require('../../../src/converter/lib/utils/balancing-group.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toBe(code02);
  });
}

testCode(
  'convert util balancing-group testing:',
  Plug(`
  <audio
    poster="{{poster}}"
    name="{{name}}"
    author="{{author}}"></audio>`, '{', '}'),
    `{{poster}}`
)