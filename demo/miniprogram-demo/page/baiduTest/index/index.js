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
    const requestTask = wx.request({
      url: 'http://www.baidu.com', // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
      }
    });
    console.log(requestTask,2);

    requestTask.abort() // 取消请求任务
    // console.log(requestTask.offHeadersReceived());
    // console.log(requestTask.onHeadersReceived());

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
        task.onProgressUpdate((res) => {
          this.setData({
            progress: res.progress
          });
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
  previewImageEvent(){
    wx.previewImage({
      current: "http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552551629018825.jpg", // 当前显示图片的http链接
      urls: ["http://127.0.0.1:8199/program/c4f04e4a6569ce0ab2e75ba2a1cfe93d/devices/baidu-0/tmp/1552551629018825.jpg"] // 需要预览的图片http链接列表
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
        const status = res.status
        const dataUrl = res.dataUrl
        const currentPosition = res.currentPosition
        const duration = res.duration
        const downloadPercent = res.downloadPercent
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
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  },
  createAudioContextEvent(){

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
        if (res.fileList.length > 0){
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            success: function (res) {
              console.log(res);
            }
          });
        };
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
    console.log(getFileSystemManager.stat);
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
      canvasId: 'myCanvas',
      success(res) {
        console.log(res)
      }
    })
  },
  canvasContextEvent(){
    const ctx = wx.createCanvasContext('firstCanvas');
    console.log(ctx);
    ctx.setFillStyle('red')
    // ctx.shadowOffsetX = 10;
    // ctx.shadowOffsetY = 50;
    // ctx.shadowBlur = 50;
    // ctx.shadowColor = 'blue';
    ctx.setShadow(10, 50, 50, 'blue');
    ctx.fillRect(10, 10, 150, 75);
    ctx.draw();
    const metrics = ctx.measureText('Hello World')
    console.log(metrics.width);
    console.log(typeof metrics.width);
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
    console.log(query.select('#the-id').context(),13);
    console.log(query.select('#the-id').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'],
      computedStyle: ['margin', 'backgroundColor'],
      context: true})
      ,12);
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },
  getSystemInfoEvent(){
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        console.log(res.benchmarkLevel);
        console.log(res.albumAuthorized);
        console.log(res.bluetoothEnabled);
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
  onReady() {
    this.mapContext = wx.createMapContext('myMap');
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('demo/miniprogram-demo/audio/许巍 - 此时此刻.mp3')
    this.audioCtx.play()
    this.videoContext = wx.createVideoContext('myVideo')
    console.log(this.videoContext, 'wx.createVideoContext');
  },
})