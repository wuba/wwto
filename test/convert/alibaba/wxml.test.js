const wxml = require('../../../src/converter/lib/alibaba/wxml.js');

function testWxml(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testWxml(
  'alibaba wxml convert test:',
  wxml(`
  <import src="../././common/foot.wxml" />
  <block wx:for-items="{{list}}" wx:key="{{item.id}}">
    <navigator url="pages/{{page.url}}" class="navigator" wx:if="{{page.url !== '@set-tab-bar'}}">
      <view class="navigator-text">{{page.zh}}</view>
      <view class="navigator-arrow"></view>
    </navigator>
    <view wx:else class="navigator" bindtap=""></view>
  </block>
  <view class="page-body-wrapper">
    <canvas id="canvas" class="canvas" data-set="Abs"></canvas>
  </view>
  <view class="page-body-wrapper">
    <canvas canvas-id="canvas" class="canvas"></canvas>
  </view>
  <view wx:for="{{devices}}" wx:key="index" a:for-index="{{idx}}"
    data-device-id="{{item.deviceId}}"
    data-Name="{{item.name || item.localName}}"
    bindtap="createBLEConnection" class="device_item"
    hover-class="device_item_hover">
  </view>
  <template is="head" data="{{title: 'tabBar'}}"/>
  <button bindtap="hideTabBar">
    {{ a<0 ? 'a' :'b' }}
  </button>
  <button type="defualt" formType="reset" onTouch(start)=""></button>
  <slider activeColor=""></slider>
  <slider block-color=""></slider>
  <progress activeColor="" backgroundColor></progress>
  <form catchsubmit="formSubmit" catchreset="formReset" bind:test></form>
  `, true),
  `
  <import src="../././common/foot.axml" />
  <block a:for="{{list}}" a:key="{{item.id}}">
    <navigator url="pages/{{page.url}}" class="navigator" a:if="{{page.url !== '@set-tab-bar'}}">
      <view class="navigator-text">{{page.zh}}</view>
      <view class="navigator-arrow"></view>
    </navigator>
    <view a:else class="navigator" onTap=""></view>
  </block>
  <view class="page-body-wrapper">
    <canvas id="canvas" class="canvas" data-set="Abs"></canvas>
  </view>
  <view class="page-body-wrapper">
    <canvas id="canvas" class="canvas"></canvas>
  </view>
  <view a:for="{{devices}}" a:key="index" a:for-index="idx"
    data-device-id="{{item.deviceId}}"
    data-Name="{{item.name || item.localName}}"
    onTap="createBLEConnection" class="device_item"
    hover-class="device_item_hover">
  </view>
  <template is="head" data="{{title: 'tabBar'}}"/>
  <button onTap="hideTabBar">
    {{ a< 0 ? 'a' :'b' }}
  </button>
  <button type="defualt" form-type="reset" onTouch(start)=""></button>
  <slider active-color=""></slider>
  <slider handle-color=""></slider>
  <progress active-color="" backgroundColor></progress>
  <form onSubmit="formSubmit" catchReset="formReset" bindtest></form>
  `
)