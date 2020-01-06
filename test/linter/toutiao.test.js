const Plug = require('../../src/linter/src/toutiao/index.js')

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toStrictEqual(code02);
  });
}

// ///////////wxmlLineRules
testCode(
  'linter toutiao-wxmlLineRules-0 testing:',
  Plug.wxmlLineRules[0](`<camera />`),
  {"rule": "camera组件头条小程序未实现", "source": "<camera />"}
)

testCode(
  'linter toutiao-wxmlLineRules-0 testing:',
  Plug.wxmlLineRules[0](`<test />`),
  null
)

testCode(
  'linter toutiao-wxmlLineRules-1 testing:',
  Plug.wxmlLineRules[1](`wx:if="{{[\'aa\', \'bb\'].indexOf(\'aa\')===-1}}"`),
  {"rule": "条件/循环渲染，不能进行函数调用运算（如：`wx:if=\"{{['aa', 'bb'].indexOf('aa')===-1}}\"`）", "source": "wx:if=\"{{['aa', 'bb'].indexOf('aa')===-1}}\""}
)

testCode(
  'linter toutiao-wxmlLineRules-1 testing:',
  Plug.wxmlLineRules[1](``),
  null
)

testCode(
  'linter toutiao-wxmlLineRules-2 testing:',
  Plug.wxmlLineRules[2](`<progress stroke-width="213rpx"></progress>`),
  {"rule": "progress组件stroke-width属性不支持rpx", "source": "<progress stroke-width=\"213rpx\"></progress>"}
)

testCode(
  'linter toutiao-wxmlLineRules-2 testing:',
  Plug.wxmlLineRules[2](`<progress></progress>`),
  null
)

// ////////////////wxssLineRules
testCode(
  'linter toutiao-wxssLineRules testing:',
  Plug.wxssLineRules = [],
  []
)

// ////////////wxssFileRules
testCode(
  'linter toutiao-wxssFileRules testing:',
  Plug.wxssFileRules = [],
  []
)

// ////////////scriptLineRules
testCode(
  'linter toutiao-scriptLineRules-0 testing:',
  Plug.scriptLineRules[0](`wx.setTabBarStyle()`),
  {"rule": "setTabBarStyle方法头条小程序未实现", "source": "wx.setTabBarStyle()"}
)

testCode(
  'linter toutiao-scriptLineRules-0 testing:',
  Plug.scriptLineRules[0](`wx.test()`),
  null
)

testCode(
  'linter toutiao-scriptLineRules-1 testing:',
  Plug.scriptLineRules[1](`wx.onSocketOpen`),
  {"rule": "`websocket`不能使用全局事件（如：`wx.onSocketOpen`）", "source": "wx.onSocketOpen"}
)

testCode(
  'linter toutiao-scriptLineRules-1 testing:',
  Plug.scriptLineRules[1](`wx.test`),
  null
)

testCode(
  'linter toutiao-scriptLineRules-2 testing:',
  Plug.scriptLineRules[2](`wx.selectComponent()`),
  {"rule": "不支持`selectComponent`，可以通过监听属性的`observer`来实现外部的调用", "source": ".selectComponent("}
)

testCode(
  'linter toutiao-scriptLineRules-2 testing:',
  Plug.scriptLineRules[2](`wx.test()`),
  null
)

// /////////////////scriptFileRules
testCode(
  'linter toutiao-scriptFileRules testing:',
  Plug.scriptFileRules = [],
  []
)

// ////////////////wxmlFileRules
testCode(
  'linter toutiao-wxmlFileRules-0 testing:',
  JSON.stringify(Plug.wxmlFileRules[0](`<form class="page-body" bindsubmit="submitForm" report-submit="true"></form>`, `../test`)),
  JSON.stringify([{"path": "../test", "line": 1, "source": ["<form class=\"page-body\" bindsubmit=\"submitForm\" report-submit="], "rule": "头条小程序 form 组件不支持 report-submit 属性"}])
)

testCode(
  'linter toutiao-wxmlFileRules-1 testing:',
  JSON.stringify(Plug.wxmlFileRules[1](`<button binderror="error">`, `../test`)),
  JSON.stringify([{"path": "../test", "line": 1, "source": ["<button binderror="], "rule": "头条小程序 button 组件不支持 binderror 事件"}])
)