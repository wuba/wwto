/* eslint-disable no-undef */
const simulate = require('miniprogram-simulate');
const path = require('path');

test('canIUse', () => {
  // // 对象的属性或方法
  // wx.canIUse('console.log')
  // wx.canIUse('CameraContext.onCameraFrame')
  // wx.canIUse('CameraFrameListener.start')
  // wx.canIUse('Image.src')

  // // wx接口参数、回调或者返回值
  // wx.canIUse('openBluetoothAdapter')
  // wx.canIUse('getSystemInfoSync.return.safeArea.left')
  // wx.canIUse('getSystemInfo.success.screenWidth')
  // wx.canIUse('showToast.object.image')
  // wx.canIUse('onCompassChange.callback.direction')
  // wx.canIUse('request.object.method.GET')

  // // 组件的属性
  // wx.canIUse('live-player')
  // wx.canIUse('text.selectable')
  // wx.canIUse('button.open-type.contact')

  expect(wx.canIUse('button.open-type.contact')).toBe(true);
});