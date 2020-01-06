/* eslint-disable no-undef */
const Plugins = require('../../src/utils/logger.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toBe(code02);
  });
}

testCode(
  'warn testing:',
  Plugins.warn('警告提示', '\n[WARN] '),
  console.warn('[WARN] 警告提示')
);

testCode(
  'error testing:',
  Plugins.error('错误提示', '\n[Error] '),
  console.error('[Error] 错误提示')
);

testCode(
  'success testing:',
  Plugins.success('成功提示', '\n[SUCCESS] '),
  console.log('[SUCCESS] 成功提示')
);

testCode(
  'info testing:',
  Plugins.info('信息提示', '\n[INFO] '),
  console.info('[INFO] 信息提示')
);

// 控制台输出警告
testCode(
  'lintWarning testing:',
  Plugins.lintWarning('百度小程序', '/index/a', '33', '<a/>', ''),
  undefined
);
