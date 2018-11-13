var wx = swan;

if (!wx['has_hook_flag']) {
  wx['has_hook_flag'] = true;
  let getStorageSyncBak = swan['getStorageSync'];
  wx['getStorageSync'] = (key) => {
    const val = getStorageSyncBak(key);
    if (val === 'undefined') {
      return '';
    }
    return val;
  };

  let requestBak = wx.request;
  wx.request = (opt) => {
    // 方法名必须大写
    if (opt.method) {
      opt.method = opt.method.toUpperCase();
    }

    // post请求会将数据序列化，字符串序列化会前后多一个双引号导致后端接口异常
    // TOO 还需要对返回结果处理
    if (opt.method === 'POST' && typeof opt.data === 'string') {
      opt.header = opt.header || {};
      opt.header['content-type'] = 'application/x-www-form-urlencoded';
    }

    requestBak(opt);
  };
}Page({
  onShareAppMessage() {
    return {
      title: '消息提示框',
      path: 'page/API/pages/toast/toast'
    }
  },

  toast1Tap() {
    wx.showToast({
      title: '默认'
    })
  },

  toast2Tap() {
    wx.showToast({
      title: 'duration 3000',
      duration: 3000
    })
  },

  toast3Tap() {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 5000
    })
  },

  hideToast() {
    wx.hideToast()
  }
})
