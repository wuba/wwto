const Plug = require('../../src/linter/lib/baidu/index.js')

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
      expect(code01).toStrictEqual(code02);
  });
}

testCode(
  'linter baidu-wxmlLineRules testing:',
  Plug.wxmlLineRules = ['../../src/platform/baidu/converter.js', '', '', '', ''],
  ['../../src/platform/baidu/converter.js', '', '', '', '']
)

testCode(
  'linter baidu-wxmlFileRules testing:',
  Plug.wxmlFileRules = [(`
  <block wx:for="{{methods}}" wx:for-item="method" wx:if="{{hasLocation === true}}">
    <button class="canvas-button" bindtap="{{method}}">{{method}}</button>
  </block>`, '../../src'), 
  (`
  <map
  id="map"
  show-location
  style="width: 100%; height: 300px;"
  ></map>`, ''), 
  (`
  <button bindtap="bindButtonTap">获取视频</button>`, '')],
  ["../../src", "", ""]
)

testCode(
  'linter baidu-wxssFileRules testing:',
  Plug.wxssFileRules = [],
  []
)

testCode(
  'linter baidu-wxssLineRules testing:',
  Plug.wxssLineRules = [],
  []
)

testCode(
  'linter baidu-scriptFileRules testing:',
  Plug.scriptFileRules = [],
  []
)

testCode(
  'linter baidu-scriptLineRules testing:',
  Plug.scriptLineRules = [''],
  [""]
)