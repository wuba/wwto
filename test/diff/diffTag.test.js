/* eslint-disable no-undef */
const diffTag = require('../../src/platform/diff/diffTag.js');
const wxDiff = diffTag('wx');
const baiduDiff = diffTag('baidu');
const alipayDiff = diffTag('alipay');
const ttDiff = diffTag('tt');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}
const code = `
<button>
<wwto-wx>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'wx';
</wwto-wx>
</button>

<button>
<wwto-baidu>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'baidu';
</wwto-baidu>
</button>

<button>
<wwto-tt>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'tt';
</wwto-tt>
</button>

<button>
<wwto-alipay>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'alipay';
</wwto-alipay>
</button>
`;

const wxDiffResult = `
<button>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'wx';
</button>

<button></button>

<button></button>

<button></button>
`;
const baiduDiffResult = `
<button></button>

<button>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'baidu';
</button>

<button></button>

<button></button>
`;

const alipayDiffResult = `
<button></button>

<button></button>

<button></button>

<button>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'alipay';
</button>
`;

const ttDiffResult = `
<button></button>

<button></button>

<button>
<button bindtap="createCanvasContext">createCanvasContext</button>
const name = 'tt';
</button>

<button></button>
`;
testCode(
  'wx diffTag test:',
  wxDiff(code),
  wxDiffResult
);
testCode(
  'baidu diffTag test:',
  baiduDiff(code),
  baiduDiffResult
);
testCode(
  'tt diffTag test:',
  ttDiff(code),
  ttDiffResult
);
testCode(
  'alipay diffTag test:',
  alipayDiff(code),
  alipayDiffResult
);