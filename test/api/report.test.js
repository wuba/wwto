/* eslint-disable no-undef */
const simulate = require('miniprogram-simulate');

test('reportMonitor', () => {
  expect(wx.reportMonitor('1', 1)).toBe(null);
});