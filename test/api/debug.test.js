const simulate = require('miniprogram-simulate')
const _ = require('../utils/utils')

test('getLogManager', async () => {
    expect(wx.getLogManager()).toBe(console)
})

test('setEnableDebug', () => {
    expect(wx.setEnableDebug(true)).toBe(null)
})
