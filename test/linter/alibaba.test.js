const Plug = require('../../src/linter/src/alibaba/index.js')

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toStrictEqual(code02);
  });
}

// ///////////wxmlLineRules
testCode(
  'linter alibaba-wxmlLineRules-0 testing:',
  Plug.wxmlLineRules[0](`<camera />`),
  {"rule": "camera组件阿里小程序未实现", "source": "<camera />"}
)

testCode(
  'linter alibaba-wxmlLineRules-0 testing:',
  Plug.wxmlLineRules[0](`<test />`),
  null
)

testCode(
  'linter alibaba-wxmlLineRules-1 testing:',
  Plug.wxmlLineRules[1](`<button open-type="openSetting" type="default">打开小程序设置</button>`),
  {"rule": "阿里小程序 button 组件 不支持 contact|getUserInfo|getPhoneNumber|openSetting|feedback 属性", "source": "<button open-type=\"openSetting\" type=\"default\">打开小程序设置</button>"}
)

testCode(
  'linter alibaba-wxmlLineRules-1 testing:',
  Plug.wxmlLineRules[1](`<button open-type="test" type="default"></button>`),
  null
)

testCode(
  'linter alibaba-wxmlLineRules-2 testing:',
  Plug.wxmlLineRules[2](`<progress stroke-width="213rpx"></progress>`),
  {"rule": "progress组件stroke-width属性不支持rpx", "source": "<progress stroke-width=\"213rpx\"></progress>"}
)

testCode(
  'linter alibaba-wxmlLineRules-2 testing:',
  Plug.wxmlLineRules[2](`<progress></progress>`),
  null
)
// /////////wxssFileRules
testCode(
  'linter alibaba-wxssFileRules testing:',
  Plug.wxssFileRules = [],
  []
)

testCode(
  'linter alibaba-wxssLineRules testing:',
  Plug.wxssLineRules = [],
  []
)

// ///////////////scriptLineRules
testCode(
  'linter alibaba-scriptLineRules-0 testing:',
  Plug.scriptLineRules[0](`wx.setTabBarStyle()`),
  {"rule": "setTabBarStyle方法阿里小程序未实现", "source": "wx.setTabBarStyle()"}
)

testCode(
  'linter alibaba-scriptLineRules-0 testing:',
  Plug.scriptLineRules[0](``),
  null
)

// //////////////scriptFileRules
testCode(
  'linter alibaba-scriptFileRules-0 testing:',
  Plug.scriptFileRules[0](`var path = \'/a/b/c\'; require(path);`),
  {"line": 1, "path": undefined, "rule": "`require`，参数只能是字符串直接量，不能是变量（如：`var path = '/a/b/c'; require(path);`）", "source": "require(path)"}
)

testCode(
  'linter alibaba-scriptFileRules-0 testing:',
  Plug.scriptFileRules[0](``),
  null
)

testCode(
  'linter alibaba-scriptFileRules-1 testing:',
  Plug.scriptFileRules[1](`triggerEvent(var name = '', '')`),
  {"line": 1, "path": undefined, "rule": "triggerEvent(name, data)`，`name`目前只支持字符串直接量，不支持变量", "source": "triggerEvent(var name = '', '')"}
)

testCode(
  'linter alibaba-scriptFileRules-1 testing:',
  Plug.scriptFileRules[1](`triggerEvent('name', '')`),
  null
)


// //////////////wxmlFileRules
testCode(
  'linter alibaba-wxmlFileRules-1 testing:',
  JSON.stringify(Plug.wxmlFileRules[1](`<button binderror="error">`, `../test`)),
  JSON.stringify([{"path": "../test", "line": 1, "source": ["<button binderror="], "rule": "阿里小程序 button 组件不支持 binderror 事件"}])
)

testCode(
  'linter alibaba-wxmlFileRules-0 testing:',
  JSON.stringify(Plug.wxmlFileRules[0](`<progress color="" active />`, '../test')),
  JSON.stringify([{"path": '../test', "line": 1, "source": ["<progress color="], "rule": "阿里小程序 progress 组件不支持 color 属性"}])
)

