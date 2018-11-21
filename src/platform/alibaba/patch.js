var wx = my;
if (!wx['has_baidu_hook_flag']) {
  wx['has_baidu_hook_flag'] = true;

  const STORAGE_API = ['getStorageSync', 'setStorageSync', 'removeStorageSync'];
  let bak = {};
  STORAGE_API.forEach(api => {
    bak[api] = wx[api];
    wx[api] = (key, data) => {
      let params = {};
      if (typeof key === 'string') {
        params.key = key;
        if (data) {
          params.data = data;
        }
      } else {
        params = key;
      }
      return bak[api](params).data;
    };
  });

  wx.request = wx.httpRequest;
  wx.setNavigationBarTitle = wx.setNavigationBar;

  wx.login = (o) => {
    let bak = {
      success: o.success,
      fail: o.fail,
      complete: o.complete
    };
    o.success = function (res) {
      res.code = res.authCode;
      delete res.authCode;
      bak.success && bak.success(res);
    }
    return wx.getAuthCode(o);
  };

  const getAuthUserInfo = wx.getAuthUserInfo;
  wx.getUserInfo = (o) => {
    let bak = {
      success: o.success,
      fail: o.fail,
      complete: o.complete
    };

    o.success = function (res) {
      let rst = {};
      for (let k in res) {
        rst[k === 'avatar' ? 'avatarUrl' : k] = res[k];
      }
      bak.success && bak.success({userInfo: rst});
    }

    return getAuthUserInfo(o);
  };

  wx.showShareMenu = wx.showShareMenu || ((opt) => {});
}