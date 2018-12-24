var wx = my;
if (!wx['has_ali_hook_flag']) {
  wx['has_ali_hook_flag'] = true;

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
      let result = bak[api](params).data;

      if (api === 'getStorageSync') {
        result = result || '';
      }

      return result;
    };
  });

  wx.request = function(opt) {
    opt.headers = opt.header || opt.headers || {};
    opt.headers['referer'] = '';
    opt.headers['content-type'] = opt.headers['content-type'] || 'application/json';

    return wx.httpRequest(opt);
  };

  wx.setNavigationBarTitle = wx.setNavigationBar;
  wx.setNavigationBarColor = wx.setNavigationBar;

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
    };
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
    };

    return getAuthUserInfo(o);
  };

  wx.showShareMenu = wx.showShareMenu || ((opt) => {});

  const createSelectorQuery = wx.createSelectorQuery;
  wx.createSelectorQuery = function() {
    let query = createSelectorQuery.apply(this, arguments);
    query.in = function() {
      return query;
    };
    return query;
  }
}