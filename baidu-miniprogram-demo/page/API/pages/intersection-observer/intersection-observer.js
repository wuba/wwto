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
      title: 'WXML节点布局相交状态',
      path: 'page/API/pages/intersection-observer/intersection-observer'
    }
  },

  data: {
    appear: false
  },
  onLoad() {
    this._observer = wx.createIntersectionObserver(this)
    this._observer
      .relativeTo('.scroll-view')
      .observe('.ball', (res) => {
        console.log(res)
        this.setData({
          appear: res.intersectionRatio > 0
        })
      })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  }
})
