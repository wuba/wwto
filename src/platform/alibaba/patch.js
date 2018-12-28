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
    o.success = function(res) {
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

    o.success = function(res) {
      let rst = {};
      for (let k in res) {
        rst[k === 'avatar' ? 'avatarUrl' : k] = res[k];
      }
      bak.success && bak.success({userInfo: rst});
    };

    return getAuthUserInfo(o);
  };

  wx.showShareMenu = wx.showShareMenu || ((opt) => {
  });

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
  wx.connectSocket = function() {
    setTimeout(() => {
      // 处理onOpen回调无法触发的问题
      connectSocket.apply(this, arguments);
    }, 100);

    return {
      send: function() {
        wx.sendSocketMessage.apply(this, arguments);
      },
      close: function() {
        wx.closeSocket.apply(this, arguments);
      },
      onOpen: function(cb) {
        wx.onSocketOpen(cb);
      },
      onClose: function(cb) {
        wx.onSocketClose(cb);
      },
      onError: function(cb) {
        wx.onSocketError(cb);
      },
      onMessage: function(cb) {
        wx.onSocketMessage(cb);
      }
    };
  };

  // wx模态弹窗不同的参数对应到支付宝confirm和alert API
  function showModal(opt) {
    let params = paramsMap(opt);
    let showCancel = params.showCancel;

    if (typeof showCancel === 'undefined') {
      showCancel = true
    }

    // 确认框
    if (showCancel) {
      params.confirmButtonText = params.confirmText;
      params.cancelButtonText = params.cancelText;
    } else {
      // 提醒框
      params.buttonText = params.confirmText;
    }

    wx[showCancel ? 'confirm' : 'alert'](params)
  }

  wx.showModal = wx.showModal || showModal;

  // toast提示
  const showToast = wx.showToast;
  wx.showToast = function(opt) {
    showToast.call(this, paramsMap(opt, {
      title: 'content',
      icon: 'type'
    }));
  };

  // 图片预览
  const previewImage = wx.previewImage;
  wx.previewImage = function(opt) {
    let params = paramsMap(opt);
    let current = params.current;

    if (current) {
      current = opt.urls.indexOf(current)
    }

    if (current === -1 || !current) {
      current = 0
    }

    params.current = current;

    previewImage.call(this, params);
  };

  // 拨打电话
  const makePhoneCall = wx.makePhoneCall;
  wx.makePhoneCall = function(opt) {
    makePhoneCall.call(this, paramsMap(opt, {
      phoneNumber: 'number'
    }));
  };

  // 获取系统信息
  const getSystemInfo = wx.getSystemInfo;
  wx.getSystemInfo = function(opt) {
    let success = opt.success || emptyFn;
    opt.success = function(res) {
      res.system = res.platform + " " + res.system;

      // 支付宝小程序windowHeight可能拿到0
      if (!res.windowHeight) {
        res.windowHeight = parseInt(res.screenHeight * res.windowWidth / res.screenWidth, 10) - 40;
      }
      success(res);
    };
    getSystemInfo.call(this, opt);
  };

  // 显示操作菜单
  const showActionSheet = wx.showActionSheet;
  wx.showActionSheet = function(opt) {
    let params = paramsMap(opt, {
      itemList: 'items'
    });

    let success = params.success || emptyFn;
    let fail = params.fail || emptyFn;

    params.success = function({index: tapIndex }) {
      if (tapIndex === -1) {
        fail({
          errMsg: 'showActionSheet:fail cancel'
        });
      } else {
        success({
          tapIndex
        });
      }
    };

    showActionSheet.call(this, params);
  };

  // 发起支付
  const requestPayment = wx.tradePay;
  wx.requestPayment = function(opt) {
    let params = paramsMap(opt, {
      alipay_trade_body: 'orderStr'
    });

    let success = params.success || emptyFn;
    let fail = params.fail || emptyFn;

    params.success = function (res) {
      if (res.resultCode === 9000) {
        success();
      } else {
        fail();
      }
    };

    requestPayment.call(this, params);
  };
}