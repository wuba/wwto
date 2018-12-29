var emptyFn = () => {};
var ignoreFn = function(opt) {
  if (opt) {
    if (opt.success) {
      opt.success();
    } else if (opt.complete) {
      opt.complete();
    } else if (opt.fail) {
      opt.fail();
    }
  }
};

function getInstance() {
  var wx = tt;

  wx['has_toutiao_hook_flag'] = true;

  wx.reportAnalytics = wx.reportAnalytics || emptyFn;
  wx.hideShareMenu = wx.showShareMenu || ignoreFn;
  wx.showShareMenu = wx.showShareMenu || ignoreFn;
  wx.hideKeyboard = wx.hideKeyboard || emptyFn;

  wx.hideTabBar = wx.hideTabBar || ignoreFn;
  wx.showTabBar = wx.showTabBar || ignoreFn;
  wx.navigateToMiniProgram = wx.navigateToMiniProgram || ignoreFn;
  wx.onUserCaptureScreen = wx.onUserCaptureScreen || emptyFn;

  // 导航URL修正
  const jumpApis = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'];
  jumpApis.forEach((apiName) => {
    const api = wx[apiName];
    wx[apiName] = (opt) => {
      // opt.url = opt.url.replace(/^\//, '');
      return api(opt);
    }
  });

  return wx;
}

export default getInstance();