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
      title: 'checkbox',
      path: 'page/component/pages/checkbox/checkbox'
    }
  },

  data: {
    items: [
      {value: 'USA', name: '美国'},
      {value: 'CHN', name: '中国', checked: 'true'},
      {value: 'BRA', name: '巴西'},
      {value: 'JPN', name: '日本'},
      {value: 'ENG', name: '英国'},
      {value: 'FRA', name: '法国'}
    ]
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  }
})
