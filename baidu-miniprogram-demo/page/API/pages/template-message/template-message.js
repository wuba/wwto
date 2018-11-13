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
}const templateMessageUrl = require('../../../../config').templateMessageUrl

const app = getApp()

const formData = {
  address: 'T.I.T 造舰厂',
  time: '2017.01.09',
  name: '帝国歼星舰',
  serial: '123456789'
}

Page({
  onShareAppMessage() {
    return {
      title: '模板消息',
      path: 'page/API/pages/template-message/template-message'
    }
  },

  onLoad() {
    this.setData({
      formData
    })
  },

  submitForm(e) {
    const self = this
    const {formId} = e.detail
    const formData = e.detail.value

    console.log('form_id is:', formId)

    self.setData({
      loading: true
    })

    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: templateMessageUrl,
          method: 'POST',
          data: {
            formId,
            openid,
            formData
          },
          success(res) {
            console.log('submit form success', res)
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
            self.setData({
              loading: false
            })
          },
          fail({errMsg}) {
            console.log('submit form fail, errMsg is:', errMsg)
          }
        })
      } else {
        console.log('err:', err)
      }
    })
  }
})
