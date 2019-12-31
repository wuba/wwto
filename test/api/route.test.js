const simulate = require('miniprogram-simulate')
const _ = require('../utils/utils')

test('navigateBack', async () => {
    const res = await _.wa(wx.navigateBack)
    console.log("res:", res)
    expect(res).toEqual({ errMsg: 'navigateBack:ok' })
})

test('navigateTo', async () => {
    const res = await _.wa(wx.navigateTo)
    expect(res).toEqual({ errMsg: 'navigateTo:ok' })
})

test('redirectTo', async () => {
    const res = await _.wa(wx.redirectTo)
    expect(res).toEqual({ errMsg: 'redirectTo:ok' })
})

test('reLaunch', async () => {
    const res = await _.wa(wx.reLaunch)
    expect(res).toEqual({ errMsg: 'reLaunch:ok' })
})

test('switchTab', async () => {
    const res = await _.wa(wx.switchTab)
    expect(res).toEqual({ errMsg: 'switchTab:ok' })
})
