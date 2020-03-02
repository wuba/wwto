/* eslint-disable no-undef */
const wxml = require('../../../src/converter/src/baidu/wxml.js');

function testWxml(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testWxml(
  'baidu wxml convert test:',
  wxml(`
  <block wx:if="{{tempFilePath != ''}}"></block>
  <view s-for-items=""></view>
  <import src="../../../common/foot.wxml"/>
  <input></input>
  <form formData=""></form>
  <testData />
  <div data-Attr="">{{ a <.123 ? 'a' :'b' }}</div>
  <scroll-view scroll-y="true" style="height: 300rpx;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}" scroll-left="{{scrollLeft}}"></scroll-view>
  <template is="head" data="{{title: 'tabBar'}}"/>
  <image src="demo/miniprogram-demo/image/preview.png" bindtap="previewImage"></image>
  <navigator url="navigate?title=navigate" hover-class="navigator-hover"></navigator>
  <video object-fit="ff"></video>
  <video page-gesture="test"></video>`),
  `
  <block s-if="{{tempFilePath != ''}}"></block>
  <view s-for=""></view>
  <import src="../../../common/foot.swan"/>
  <input/>
  <form form-Data=""></form>
  <test-data />
  <div data-attr="">{{ a < .123 ? 'a' :'b' }}</div>
  <scroll-view scroll-y="true" style="height: 300rpx;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="{=toView=}" scroll-top="{=scrollTop=}" scroll-left="{=scrollLeft=}"></scroll-view>
  <template is="head" data="{{{title: 'tabBar'}}}"/>
  <image class="fix-image-cls"  src="demo/miniprogram-demo/image/preview.png" bindtap="previewImage"></image>
  <navigator url="navigate?title=navigate" hover-class="navigator-hover"></navigator>
  <video objectFit="ff"></video>
  <video page-gesture="test"></video>`
);