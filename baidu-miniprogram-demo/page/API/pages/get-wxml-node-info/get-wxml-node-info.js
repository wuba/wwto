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
      title: '获取WXML节点信息',
      path: 'page/API/pages/get-wxml-node-info/get-wxml-node-info'
    }
  },

  data: {
    metrics: []
  },

  onReady() {
    this.getNodeInfo()
  },

  getNodeInfo() {
    const $ = wx.createSelectorQuery()
    const target = $.select('.target')
    target.boundingClientRect()

    $.exec((res) => {
      const rect = res[0]
      if (rect) {
        const metrics = []
        // eslint-disable-next-line
        for (const key in rect) {
          if (key !== 'id' && key !== 'dataset') {
            const val = rect[key]
            metrics.push({key, val})
          }
        }

        this.setData({metrics})
      }
    })
  }

})
