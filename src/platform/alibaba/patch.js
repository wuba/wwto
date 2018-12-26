var wx = my;
if (!wx['has_ali_hook_flag']) {
  wx['has_ali_hook_flag'] = true;

  function paramsMap(options, maps = {}) {
    let params = {};

    for (let key in options) {
      let myKey = maps.hasOwnProperty(key) ? maps[key] : key;
      params[myKey] = options[key]
    }

    return params;
  }

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

  const getStorage = wx.getStorage;
  wx.getStorage = function(opt) {
    let success = opt.success;
    opt.success = function(res) {
      if (res.data) {
        success(res);
      } else {
        opt.fail({
          errMsg: 'getStorage:fail data not found'
        });
      }
    };
    getStorage.call(this, opt);
  };

  wx.request = function(opt) {
    opt.headers = opt.header || opt.headers || {};
    opt.headers['referer'] = '';
    opt.headers['content-type'] = opt.headers['content-type'] || 'application/json';

    let success = opt.success || emptyFn;
    opt.success = function(res) {
      success.call(this, paramsMap(res, {
        headers: 'header',
        status: 'statusCode'
      }));
    };

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
  };

  // websocket适配
  const connectSocket = wx.connectSocket;
  const onSocketOpen = wx.onSocketOpen;
  const onSocketError = wx.onSocketError;
  const onSocketClose = wx.onSocketClose;
  const onSocketMessage = wx.onSocketMessage;

  let onOpenCb, onCloseCb, onErrorCb, onMessageCb;

  wx.onSocketOpen = function(res) {
    onSocketOpen.apply(this, arguments);
    onOpenCb && onOpenCb(res);
  };
  wx.onSocketError = function(res) {
    onSocketError.apply(this, arguments);
    onErrorCb && onErrorCb(res);
  };
  wx.onSocketClose = function(res) {
    onSocketClose.apply(this, arguments);
    onCloseCb && onCloseCb(res);
  };
  wx.onSocketMessage = function(res) {
    onSocketMessage.apply(this, arguments);
    onMessageCb && onMessageCb(res);
  };

  wx.connectSocket = function() {
    connectSocket.apply(this, arguments);

    return {
      send: function() {
        wx.sendSocketMessage.apply(this, arguments);
      },
      close: function() {
        wx.closeSocket.apply(this, arguments);
      },
      onOpen: function(cb) {
        onOpenCb = cb && cb.bind(this);
      },
      onClose: function(cb) {
        onCloseCb = cb && cb.bind(this);
      },
      onError: function(cb) {
        onErrorCb = cb && cb.bind(this);
      },
      onMessage: function(cb) {
        onMessageCb = cb && cb.bind(this);
      }
    };
  };

  /**
   * wx模态弹窗不同的参数对应到支付宝confirm和alert API
   */
  function showModal(options) {
    let params = paramsMap(options);
    let showCancel = params.showCancel;

    if (typeof showCancel === 'undefined') {
      showCancel = true
    }

    // 确认框
    if (showCancel) {
      params.confirmButtonText = params.confirmText;
      params.cancelButtonText = params.cancelText
    } else {
      // 提醒框
      params.buttonText = params.confirmText
    }

    wx[showCancel ? 'confirm' : 'alert'](params)
  }
  wx.showModal = wx.showModal || showModal;
}