var wx = tt;
var emptyFn = () => {};

if (!wx['has_toutiao_hook_flag']) {
  wx['has_toutiao_hook_flag'] = true;

  wx.reportAnalytics = wx.reportAnalytics || emptyFn;
  wx.showShareMenu = wx.showShareMenu || emptyFn;
  wx.hideKeyboard = wx.hideKeyboard || emptyFn;

  // 导航URL修正
  const jumpApis = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'];
  jumpApis.forEach((apiName) => {
    const api = wx[apiName];
    wx[apiName] = (opt) => {
      opt.url = opt.url.replace(/^\//, '');
      return api(opt);
    }
  });
}