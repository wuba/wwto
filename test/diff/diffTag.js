/* eslint-disable no-undef */
const diffTag = require('../../src/platform/diff/diffTag.js');
const wxDiff = diffTag('wx');
const baiduDiff = diffTag('baidu');
const alipayDiff = diffTag('alipay');
const ttDiff = diffTag('tt');

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
const wxResult = wxDiff(code);
debugger;
console.log('wx', wxResult === wxDiffResult);
const baiduResult = baiduDiff(code);
console.log(baiduResult);
console.log('baidu', baiduResult === baiduDiffResult);

// let alipayResult = alipayDiff(code);
// console.log(alipayResult)
// console.log(alipayResult === alipayDiffResult)

// let ttResult = ttDiff(code);
// console.log(ttResult)
// debugger
// console.log(ttResult === ttDiffResult)