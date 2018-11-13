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
      title: '模态弹窗',
      path: 'page/API/pages/modal/modal'
    }
  },

  data: {
    modalHidden: true,
    modalHidden2: true
  },
  modalTap() {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      showCancel: false,
      confirmText: '确定'
    })
  },
  noTitlemodalTap() {
    wx.showModal({
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: '确定',
      cancelText: '取消'
    })
  }
})
