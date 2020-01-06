/* eslint-disable no-undef */
const simulate = require('miniprogram-simulate');
const _ = require('../utils/utils');

test('getExtConfig', async () => {
  const res = await _.wa(wx.getExtConfig);

  expect(res).toEqual({
    errMsg: 'getExtConfig:ok',
    extConfig: wx.getExtConfigSync(),
  });
});

test('getExtConfigSync', () => {
  expect(wx.getExtConfigSync()).toEqual({});
});
