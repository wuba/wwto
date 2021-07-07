/* eslint-disable no-undef */
const index = require("../../src/platform/diff/index");
const baiduDiff = index.diffDefine("baidu");
const wxDiff = index.diffDefine("wx");
const alipayDiff = index.diffDefine("alipay");
const ttDiff = index.diffDefine("tt");
const code = "if (WWTO_WX) { console.log('wx'); } else if (WWTO_BAIDU) { console.log('baidu'); } else if (WWTO_ALIPAY) { console.log('alipay'); } else if (WWTO_TT) { console.log('tt') }";

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}

const wxDiffResult = "if (true) {  console.log('wx');} else if (false) {} else if (false) {} else if (false) {}";
const baiduDiffResult = "if (false) {} else if (true) {  console.log('baidu');} else if (false) {} else if (false) {}";
const alipayDiffResult = "if (false) {} else if (false) {} else if (true) {  console.log('alipay');} else if (false) {}";
const ttDiffResult = "if (false) {} else if (false) {} else if (false) {} else if (true) {  console.log('tt');}";

testCode(
  'wx diffDefine test:',
  wxDiff(code).replace(/\n/g, ''),
  wxDiffResult
);
testCode(
  'baidu diffDefine test:',
  baiduDiff(code).replace(/\n/g, ''),
  baiduDiffResult
);
testCode(
  'tt diffDefine test:',
  ttDiff(code).replace(/\n/g, ''),
  ttDiffResult
);
testCode(
  'alipay diffDefine test:',
  alipayDiff(code).replace(/\n/g, ''),
  alipayDiffResult
);