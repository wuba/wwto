const emptyFn = () => {};

function ignoreFn(opt) {
  if (opt) {
    if (opt.success) {
      opt.success();
    } else if (opt.complete) {
      opt.complete();
    } else if (opt.fail) {
      opt.fail();
    }
  }
}

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

  const bakSetTimeout = setTimeout;
  setTimeout = function(fn, timeout) {
    console.log('setTimeout:', timeout, Math.floor(timeout || 0));
    return bakSetTimeout.call(this, fn, Math.floor(timeout || 0));
  };

  const bakSetInterval = setInterval;
  setInterval = function(fn, timeout) {
    console.log('setInterval:', timeout, Math.floor(timeout || 0));
    return bakSetInterval.call(this, fn, Math.floor(timeout || 0));
  };

  return wx;
}

export default getInstance();