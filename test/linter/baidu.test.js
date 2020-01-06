/* eslint-disable no-undef */
const Plug = require('../../src/linter/src/baidu/index.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}

// //////////////////////////wxmlLineRules
testCode(
  'linter baidu-wxmlLineRules-0 testing:',
  Plug.wxmlLineRules[0](`<ad />`),
  { rule: "ad组件百度小程序未实现", source: "<ad />" }
);

testCode(
  'linter baidu-wxmlLineRules-0 testing:',
  Plug.wxmlLineRules[0](`<test />`),
  null
);

testCode(
  'linter baidu-wxmlLineRules-1 testing:',
  Plug.wxmlLineRules[1](`bindtap='flag ? fn1 : fn2'`),
  null
);

testCode(
  'linter baidu-wxmlLineRules-2 testing:',
  Plug.wxmlLineRules[2](`wx:for='{{flag ? arr1 : arr2}}'`),
  null
);

testCode(
  'linter baidu-wxmlLineRules-3 testing:',
  Plug.wxmlLineRules[3](`<test hidden='a.b' />`),
  { rule: "wxml不支持`hidden`", source: "<test hidden='a.b' />" }
);

testCode(
  'linter baidu-wxmlLineRules-4 testing:',
  Plug.wxmlLineRules[4](`<textarea cursor-spacing="2rpx" id="" cols="30" rows="10"></textarea>`),
  { rule: "textarea组件cursor-spacing属性不支持rpx", source: "<textarea cursor-spacing=\"2rpx\" id=\"\" cols=\"30\" rows=\"10\"></textarea>" }
);

// ////////////////////////////wxmlFileRules
testCode(
  'linter baidu-wxmlFileRules-0 testing:',
  Plug.wxmlFileRules[0](`
  <block wx:for="{{methods}}" wx:for-item="method" wx:if="{{hasLocation === true}}">
    <button class="canvas-button" bindtap="{{method}}">{{method}}</button>
  </block>`, '../../src'),
  [{ line: 2, path: "../../src", rule: "在同一个标签上，`wx:for`和`wx:if`不能同时使用", source: "<block wx:for=\"{{methods}}\" wx:for-item=\"method\" wx:if=\"{{hasLocation === true}}\">" }]
);

testCode(
  'linter baidu-wxmlFileRules-1 testing:',
  Plug.wxmlFileRules[1](`
  <map
  id="map"
  show-location
  style="width: 100%; height: 300px;"
  ></map>`, ''),
  []
);

testCode(
  'linter baidu-wxmlFileRules-2 testing:',
  Plug.wxmlFileRules[2](`<button bindtap="bindButtonTap">获取视频</button>`, ''),
  []
);

testCode(
  'linter baidu-wxssFileRules testing:',
  Plug.wxssFileRules = [],
  []
);

testCode(
  'linter baidu-wxssLineRules testing:',
  Plug.wxssLineRules = [],
  []
);

testCode(
  'linter baidu-scriptFileRules testing:',
  Plug.scriptFileRules = [],
  []
);

testCode(
  'linter baidu-scriptLineRules testing:',
  Plug.scriptLineRules[0](`wx.requestPayment()`),
  { rule: "requestPayment方法百度小程序未实现", source: "wx.requestPayment()" }
);

testCode(
  'linter baidu-scriptLineRules testing:',
  Plug.scriptLineRules[0](`wx.requestPayment`),
  null
);