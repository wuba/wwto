//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: '40.042500',
    longitude: '116.274040',
    animationData: {},
    src: '',
    inputValue: '',
  },
  onShow() {
    const animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  rotateAndScale() {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale() {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate() {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({duration: 1000})
    this.setData({
      animationData: this.animation.export()
    })
  },
  onLoad: function () {
    console.log(1234);
  },
  // 请求
  requestEvent(){
    let task = wx.request({
      url: 'someurl',
      data: {
        user_name: 'hello'
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(`request调用成功 ${res}`);
      },
      fail (res) {
        console.log(`request调用失败`);
      }
    });
    console.log(task);
  },
  // 动画
  createAnimationEvent(){
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    console.log(animation,123);
  },
  showShareMenuEvent(){
    wx.showShareMenu({
      withShareTicket: true,
      success:function(res){
        console.log(res);
      }
    })
  },
  hideShareMenuEvent(){
    wx.hideShareMenu({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`hideShareMenu 调用失败`);
      }
    });
  },
  uploadEvent(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        let task = wx.uploadFile({
          url: 'https://www.baidu.com', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = res
            console.log(data);
            // do something
          }
        });
        console.log(task,12);
        task.onProgressUpdate((res) => {
          console.log(res);
        });
        // task.abort();
      }
    })
  },
  downloadfileEvent(){
    const downloadTask = wx.downloadFile({
      url: 'http://www.baidu.com', // 仅为示例，并非真实的资源
      success(res) {
        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    });
    console.log(downloadTask);
    // downloadTask.abort() // 取消下载任务
  },
  chooseImageEvent(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
      }
    })
  },
  saveImageToPhotosAlbumEvent(){
    wx.saveImageToPhotosAlbum({
      filePath: "http://127.0.0.1:20002/static/temImages/bb6f2a5709dd1b0c4c85c01096f457b1.jpg",
      success (res) {
        console.log(`saveImageToPhotosAlbum调用成功`,res);
      },
      fail (res) {
        console.log(`saveImageToPhotosAlbum调用失败`,res);
      }
    });
  },
  previewImageEvent(){
    wx.previewImage({
      current: "http://127.0.0.1:20002/static/temImages/bb6f2a5709dd1b0c4c85c01096f457b1.jpg", // 当前显示图片的http链接
      urls: ["http://127.0.0.1:20002/static/temImages/bb6f2a5709dd1b0c4c85c01096f457b1.jpg"] // 需要预览的图片http链接列表
    })
  },
  getImageInfoEvent(){
    wx.getImageInfo({
      src: 'http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552551629018825.jpg',
      success(res) {
        console.log(res)
      }
    })

  },
  connectSocketEvent(){
    console.log(1);
    wx.connectSocket({
      url: 'wss://example.qq.com',
      header: {
        'content-type': 'application/json'
      },
      tcpNoDelay: true,
      protocols: ['protocol1'],
      method: 'GET'
    })
  },
  stopLocalServiceDiscoveryEvent(){
    wx.stopLocalServiceDiscovery({
      success(res){
        console.log(res);
      }
    })
  },
  startLocalServiceDiscoveryEvent(){
    wx.startLocalServiceDiscovery({
      // 当前手机所连的局域网下有一个 _http._tcp. 类型的服务
      serviceType: '_http._tcp.',
      success: console.log,
      fail: console.log
    })
  },
  onLocalServiceResolveFailEvent(){
    wx.onLocalServiceResolveFail(function(res){
      console.log(res);
    })
  },
  onLocalServiceLostEvent(){
    wx.onLocalServiceLost(function(res){
      console.log(res);
    })
  },
  onLocalServiceFoundEvent(){
    wx.onLocalServiceFound(function(res){
      console.log(res);
    })
  },
  onLocalServiceDiscoveryStopEvent(){
    wx.onLocalServiceDiscoveryStop(function(res){
      console.log(res);
    })
  },
  offLocalServiceResolveFailEvent(){
    wx.offLocalServiceResolveFail(function(res){
      console.log(res);
    })
  },
  offLocalServiceLostEvent(){
    wx.offLocalServiceLost(function(res){
      console.log(res);
    })
  },
  offLocalServiceFoundEvent(){
    wx.offLocalServiceFound(function(res){
      console.log(res);
    })
  },
  offLocalServiceDiscoveryStopEvent(){
    wx.offLocalServiceDiscoveryStop(function(res){
      console.log(res);
    })
  },
  chooseMessageFileEvent(){
    wx.chooseMessageFile({
      count: 10,
      type: 'image',
      success(res) {
        console.log(res);
      }
    })
  },
  compressImageEvent(){
    wx.compressImage({
      src: 'http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552551629018825.jpg', // 图片路径
      quality: 80, // 压缩质量,
      success:function(){
        console.log(rs);
      }
    })
  },
  stopRecordEvent(){
    wx.startRecord({
      success(res) {
        console.log(res)
      }
    });
    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 10000)
  },
  startRecordEvent(){
    wx.startRecord({
      success(res) {
        const tempFilePath = res.tempFilePath
      }
    })
    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 10000)
  },
  getRecorderManagerEvent(){
    let recorderManager = wx.getRecorderManager();// 返回对象
    console.log(recorderManager,111);
    console.log(recorderManager.onFrameRecorded);
    console.log(recorderManager.onInterruptionBegin);
    console.log(recorderManager.onInterruptionEnd);
    console.log(recorderManager.onResume);
    console.log(recorderManager.start({
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'aac',
      frameSize: 0,
      audioSource: 'auto',
    }));
    console.log(recorderManager.start);
  },
  stopBackgroundAudioEvent(){
    wx.stopBackgroundAudio()
  },
  seekBackgroundAudioEvent(){
    wx.seekBackgroundAudio({
      position: 30
    })
  },
  playBackgroundAudioEvent(){
    wx.playBackgroundAudio({
      dataUrl: '',
      title: '',
      coverImgUrl: ''
    })
  },
  pauseBackgroundAudioEvent(){
    wx.pauseBackgroundAudio();
  },
  onBackgroundAudioStopEvent(){
    wx.onBackgroundAudioStop(function(res){
      console.log(res);
    })
  },
  onBackgroundAudioPlayEvent() {
    wx.onBackgroundAudioPlay(function(res){
      console.log(res);
    })
  },
  onBackgroundAudioPauseEvent(){
    wx.onBackgroundAudioPause(function(res){
      console.log(res);
    })
  },
  getBackgroundAudioPlayerStateEvent(){
    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log(res);
      }
    })
  },
  getBackgroundAudioManagerEvent(){
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    console.log(backgroundAudioManager);
  },
  stopVoiceEvent(){
    wx.stopVoice();
  },
  playVoiceEvent(){
    wx.playVoice({
      filePath: '123',
      complete() { }
    })
  },
  pauseVoiceEvent(){
    wx.pauseVoice()
  },
  getAvailableAudioSourcesEvent(){
    wx.getAvailableAudioSources({
      success:function(res){
        console.log(res);
      }
    })
  },
  setInnerAudioOptionEvent(){
    console.log(123);
    wx.setInnerAudioOption({
      mixWithOther: true,
      obeyMuteSwitch: true,
      success: res => {
        console.log('设置音频混播成功')
      },
      fail: err => {
        console.log('设置音频混播失败', err)
      }
    })
  },
  innerAudioContextEvent(){
    let innerAudioContext = wx.createInnerAudioContext();
    console.log(innerAudioContext);
  },
  getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
  },
  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: this.getRandomColor()
    })
  },
  createVideoContextEvent(){
    let VideoContext = wx.createVideoContext('myVideo');
    console.log(VideoContext);
  },
  chooseVideoEvent(){
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res)
      }
    })
  },
  saveVideoToPhotosAlbumEvent(){
    wx.saveVideoToPhotosAlbum({
      filePath: "http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552553446735756.mp4",
      success(res) {
        console.log(res)
      }
    })
  },
  createLivePlayerContextEvent(){
    let createLivePlayerContext = wx.createLivePlayerContext('plat');
    console.log(createLivePlayerContext);
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  createCameraContextEvent(){

  },
  createLivePusherContextEvent(){
    let LivePusherContext = wx.createLivePusherContext();
  },
  saveFileEvent(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            const savedFilePath = res.savedFilePath;
            console.log(typeof savedFilePath, 1);
          }
        })
      }
    })
  },
  getSavedFileListEvent(){
    wx.getSavedFileList({
      success: function (res) {
        console.log(res);
      }
    });
  },
  getSavedFileInfoEvent(){
    wx.getSavedFileInfo({
      filePath: 'http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552553446735756.mp4',
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
  },
  removeSavedFileEvent(){
    wx.getSavedFileList({
      success: function (res) {
        console.log(res);
      }
    });
  },
  openDocumentEvent(){
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'http://www.baidu.com',
      success(res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath,
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },
  getFileInfoEvent(){
    wx.getFileInfo({
      filePath: 'http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552551629018825.jpg',
      success(res) {
        console.log(res)
      }
    })
  },
  getFileSystemManagerEvent(){
    let getFileSystemManager = wx.getFileSystemManager();
    console.log(getFileSystemManager);
  },
  setStorageEvent(){
    wx.setStorage({
      key: 'key',
      data: 'value'
    })
  },
  setStorageSyncEvent(){
    wx.setStorageSync('time', new Date)
    wx.setStorageSync('num', 1)
    const res = wx.getStorageInfoSync()
    console.log(res)
  },
  getStorageEvent(){
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res.data)
      }
    })
  },
  getStorageSyncEvent(){
    try {
      const value = wx.getStorageSync('key')
      console.log(value);
      if (value) {
        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  getStorageInfoEvent(){
    wx.getStorageInfo({
      success(res) {
        console.log(res)
      }
    })
  },
  getStorageInfoSyncEvent(){
    try {
      const res = wx.getStorageInfoSync()
      console.log(res)
    } catch (e) {
      // Do something when catch error
    }
  },
  removeStorageEvent(){
    wx.removeStorage({
      key: 'key',
      success(res) {
        console.log(res.data)
      }
    })
  },
  removeStorageSyncEvent(){
    try {
      console.log(wx.removeStorageSync('key'));
    } catch (e) {
      // Do something when catch error
    }
  },
  clearStorageEvent(){
    wx.clearStorage();
  },
  clearStorageSyncEvent(){
    try {
      wx.clearStorageSync()
    } catch (e) {
      // Do something when catch error
    }
  },
  getLocationEvent(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        wx.openLocation({
          latitude:43.5,
          longitude:55.6,
          scale: 18,
          success: function(res){
            console.log(res);
          }
        })
      }
    })
  },
  chooseLocationEvent(){
    wx.chooseLocation({
      success:function(res){
        console.log(res);
      }
    })
  },
  openLocationEvent(){
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          success:function(res){
            console.log(res);
          }
        })
      }
    })
  },
  includePoints: function () {
    this.mapContext.includePoints({
      padding: [10],
      points: [{
        latitude: 23,
        longitude: 113.33,
      }, {
        latitude: 23,
        longitude: 113.3345211,
      }]
    })
  },
  canvasEvent(){
    wx.canvasGetImageData({
      canvasId: 'firstCanvas',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success(res) {
        console.log(res);
      }
    })
  },
  canvasPutImageDataEvent(){
    const data = new Uint8ClampedArray([255, 0, 0, 1])
    wx.canvasPutImageData({
      canvasId: 'firstCanvas',
      x: 0,
      y: 0,
      width: 1,
      data,
      success:function(res){
        console.log(res);
      }
    })
  },
  canvasToTempFilePathEvent(){
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'firstCanvas',
      success(res) {
        console.log(res)
      }
    })
  },
  canvasContextEvent(){
    const ctx = wx.createCanvasContext('firstCanvas');
    console.log(ctx);
  },
  hideToastEvent(){
    wx.hideToast({
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      },
      complete:function(res){
        console.log(res);
      }
    })
  },
  hideLoadingEvent(){
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    setTimeout(function() {
      wx.hideLoading({
        success:function(res){
          console.log(res);
        },
        fail:function(res){
          console.log(res);
        },
        complete: function(res){
          console.log(res);
        }
      });
    }, 2000);
  },
  showNavigationBarLoadingEvent(){
    wx.showNavigationBarLoading({
      success: function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      },
      complete: function(res){
        console.log(res);
      }
    })
  },
  stopPullDownRefreshEvent(){
    wx.stopPullDownRefresh({
      success:function (res) {
        console.log(res);
      },
      fail:function (res) {
        console.log(res);
      },
      complete:function (res) {
        console.log(res);
      }
    })
  },
  createSelectorQueryEvent(){
    const query = wx.createSelectorQuery();
    query.select('#the-id').boundingClientRect();
    console.log(query);
  },
  createIntersectionObserverEvent(){
    let createIntersectionObserver = wx.createIntersectionObserver(this, {
      selectAll: true
    });
    console.log(createIntersectionObserver,12);
  },
  getSystemInfoEvent(){
    wx.getSystemInfo({
      success(res) {
        console.log(res);
      }
    });
  },
  getSystemInfoSyncEvent(){
    try {
      const res = wx.getSystemInfoSync()
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
    } catch (e) {
      // Do something when catch error
    }
  },
  onCompassChangeEvent(){
    console.log(123);
    wx.onCompassChange(function (res) {
      console.log(res.accuracy)
    });
    setTimeout(function(){
      wx.stopCompass();
    },500)
  },
  scanCodeEvent(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType:['barCode', 'qrCode'],
      success(res) {
        console.log(res)
        console.log(res.path);
        console.log(res.rawData);
      }
    })
  },
  onGyroscopeChangeEvent(){
    wx.onGyroscopeChange(function(res){
      console.log(res);
    })
    setTimeout(function(){
      wx.stopGyroscope();
    },500)
  },
  onGetWifiListEvent(){
    wx.onGetWifiList(function(res){
      console.log(res.wifiList);
    });
  },
  onBeaconUpdateEvent(){
    console.log(1);
    wx.onBeaconUpdate(function(res){
      console.log(res);
    });
    setTimeout(function(){
      wx.stopBeaconDiscovery();
    },1000)
  },
  setEnableDebugEvent(){
    console.debug();
    console.error();
    console.group();
    console.groupEnd();
    console.info();
    console.log();
    console.warn();
    wx.setEnableDebug({
      enableDebug: true,
      success: function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      },
      complete:function(res){
        console.log(res);
      }
    })
  },
  getSettingEvent(){
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting['scope.userInfo']);
        console.log(res.authSetting['scope.userLocation']);
        console.log(res.authSetting['scope.address']);
        console.log(res.authSetting['scope.invoiceTitle']);
        console.log(res.authSetting['scope.invoice']);
        console.log(res.authSetting['scope.werun']);
        console.log(res.authSetting['scope.record']);
        console.log(res.authSetting['scope.writePhotosAlbum']);
        console.log(res.authSetting['scope.camera']);
      }
    });
  },
  createInnerAudioContextEvent(){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  getNetworkTypeEvent(){
    wx.getNetworkType({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(res);
      }
    });
  },
  onNetworkStatusChangeEvent(){
    wx.onNetworkStatusChange(function(res) {
      console.log(res);
    });
  },
  getConnectedWifiEvent(){
    wx.getConnectedWifi({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`getConnectedWifi调用失败`);
      }
    });
  },
  startAccelerometerEvent(){
    wx.startAccelerometer({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`startAccelerometer调用失败`);
      }
    });
  },
  stopAccelerometerEvent(){
    wx.stopAccelerometer({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`stopAccelerometer调用失败`);
      }
    });
  },
  onAccelerometerChangeEvent(){
    wx.onAccelerometerChange((res) => {
      console.log(res);
    });
  },
  startCompass(){
    wx.startCompass({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`startCompass 调用失败`);
      }
    });
  },
  stopCompassEvent(){
    wx.stopCompass({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`stopCompass 调用失败`);
      }
    });
  },
  makePhoneCallEvent(){
    wx.makePhoneCall({
      phoneNumber: '15829087682',
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`makePhoneCall调用失败`);
      }
    });
  },
  getClipboardDataEvent(){
    wx.getClipboardData({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`getClipboardData调用失败`);
      }
    });
  },
  setClipboardDataEvent(){
    tt.setClipboardData({
      data: 'hello kitty',
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`setClipboardData调用失败`);
      }
    });
  },
  setKeepScreenOnEvent(){
    wx.setKeepScreenOn({
      keepScreenOn: false,
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`setKeepScreenOn调用失败`);
      }
    });
  },
  vibrateShortEvent(){
    wx.vibrateShort({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`vibrateShort调用失败`);
      }
    });
  },
  vibrateLongEvent(){
    wx.vibrateLong({
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`vibrateLong调用失败`);
      }
    });
  },
  showToastEvent(){
    wx.showToast({
      title: '添加购物车成功',
      duration: 2000,
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`showToast调用失败`);
      }
    });
  },
  showModalEvent(){
    wx.showModal({
      title: '请求获得定位权限',
      content: '获得你的地理位置能够更好的为你推荐本地信息',
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`showModal调用失败`);
      }
    });
  },
  showLoadingEvent(){
    wx.showLoading({
      title: '请求中，请稍后...',
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`showLoading调用失败`);
      }
    });
  },
  showActionSheetEvent(){
    const itemList = ['加精', '置顶', '删除', '封禁作者'];
    wx.showActionSheet({
      itemList,
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`showActionSheet调用失败`);
      }
    });
  },
  setNavigationBarTitleEvent(){
    wx.setNavigationBarTitle({
      title: '新的标题',
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`setNavigationBarTitle调用失败`);
      }
    });
  },
  pageScrollToEvent(){
    tt.pageScrollTo({
      scrollTop: 200,
      duration: 1000,
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log(`pageScrollTo调用失败`);
      }
    });
  },
  canvasGetImageDataEvent(){
    wx.canvasGetImageData({
      canvasId: 'firstCanvas',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success(res) {
        console.log(res);
      }
    })
  },
  onReady() {
    this.mapContext = wx.createMapContext('myMap');
    this.videoContext = wx.createVideoContext('myVideo')
    console.log(this.videoContext, 'wx.createVideoContext');
  },
})