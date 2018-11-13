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
      title: 'Wi-Fi',
      path: 'page/API/pages/wifi/wifi'
    }
  },

  data: {
    wifiList: []
  },

  onUnload() {
    this.stopSearch()
  },

  startSearch() {
    const getWifiList = () => {
      wx.getWifiList({
        success: () => {
          wx.onGetWifiList((res) => {
            const wifiList = res.wifiList
              .sort((a, b) => b.signalStrength - a.signalStrength)
              .map(wifi => {
                const strength = Math.ceil(wifi.signalStrength * 4)
                return Object.assign(wifi, {strength})
              })
            this.setData({
              wifiList
            })
          })
        },
        fail(err) {
          console.error(err)
        }
      })
    }

    const startWifi = () => {
      wx.startWifi({
        success: getWifiList,
        fail(err) {
          console.error(err)
        }
      })
    }

    wx.getSystemInfo({
      success(res) {
        const isIOS = res.platform === 'ios'
        if (isIOS) {
          wx.showModal({
            title: '提示',
            content: '由于系统限制，iOS用户请手动进入系统WiFi页面，然后返回小程序。',
            showCancel: false,
            success() {
              startWifi()
            }
          })
          return
        }
        startWifi()
      }
    })
  },

  stopSearch() {
    wx.stopWifi({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      }
    })
  }
})
