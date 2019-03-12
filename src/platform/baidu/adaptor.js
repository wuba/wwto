function getInstance() {
  var wx = swan;
  wx['has_baidu_hook_flag'] = true;

  const getStorageSync = swan['getStorageSync'];
  wx['getStorageSync'] = (key) => {
    const val = getStorageSync(key);
    if (val === 'undefined') {
      return '';
    }
    return val;
  };

  const request = wx.request;
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

    // 默认按text解析！
    if (!opt.responseType) {
      opt.responseType = 'json';
    }

    return request(opt);
  };
  // 处理requestTask对象字段缺失
  let requestTask = wx.request;
  requestTask["offHeadersReceived"] = (()=>{});
  requestTask["onHeadersReceived"] = (()=>{});

  const createAnimation = wx.createAnimation;
  wx.createAnimation = function() {
    let animation = createAnimation.call(this, arguments);

    // 处理option字段缺失的问题
    if (!animation.option) {
      animation.option = {
        transformOrigin: animation.transformOrigin,
        transition: {
          delay: animation.delay,
          duration: animation.duration,
          timingFunction: animation.timingFunction
        }
      };
    }

    // 处理step方法链式调用BUG
    let step = animation.__proto__.step;
    animation.__proto__.step = function() {
      return step.apply(this, arguments) || this;
    };

    return animation;
  };

  wx.showShareMenu = wx.showShareMenu || ((opt) => {});

  // 画布导出为图片
  // const canvasToTempFilePath = wx.canvasToTempFilePath;
  // wx.canvasToTempFilePath = function(opt, self) {
  //   const success = opt.success || emptyFn;
  //   opt.success = function(res) {
  //     if (res) {
  //       res.tempFilePath = res.tempFilePath || res.tempImagePath;
  //     }
  //     success(res);
  //   };
  //   canvasToTempFilePath.call(this, opt, self);
  // };

  // wx.uploadFile = wx.uploadFile;
  let uploadTask = wx.uploadFile;
  // 处理uploadTask对象字段缺失问题
  uploadTask["onProgressUpdate"] = (()=>{});
  uploadTask["offProgressUpdate"] = (()=>{});
  uploadTask["onHeadersReceived"] = (()=>{});

  // wx.downloadFile = wx.downloadFile; 此api参数中百度无filePath(指定文件下载后存储的路径)
  let downloadTask = wx.downloadFile;
  // 处理downloadTask对象字段缺失问题
  downloadTask["onProgressUpdate"] = (()=>{});
  downloadTask["offProgressUpdate"]= (()=>{});
  downloadTask["onHeadersReceived"]= (()=>{});

  // wx.connectSocket = wx.connectSocket;  此api百度中无参数tcpNoDelay
  // wx.onSocketOpen = wx.onSocketOpen
  // wx.onSocketError = wx.onSocketError
  // wx.onSocketMessage = wx.onSocketMessage
  // wx.closeSocket = wx.closeSocket
  // wx.onSocketClose = wx.onSocketClose
  // wx.sendSocketMessage = wx.sendSocketMessage

  // mDNS
  wx.stopLocalServiceDiscovery = wx.stopLocalServiceDiscovery || ((opt)=>{});
  wx.startLocalServiceDiscovery = wx.startLocalServiceDiscovery || ((opt)=>{});
  wx.onLocalServiceResolveFail = wx.onLocalServiceResolveFail || ((opt)=>{});
  wx.onLocalServiceLost = wx.onLocalServiceLost || ((opt)=>{});
  wx.onLocalServiceFound = wx.onLocalServiceFound || ((opt)=>{});
  wx.onLocalServiceDiscoveryStop = wx.onLocalServiceDiscoveryStop || ((opt)=>{});
  wx.offLocalServiceResolveFail = wx.offLocalServiceResolveFail || ((opt)=>{});
  wx.offLocalServiceLost = wx.offLocalServiceLost || ((opt)=>{});
  wx.offLocalServiceFound = wx.offLocalServiceFound || ((opt)=>{});
  wx.offLocalServiceDiscoveryStop = wx.offLocalServiceDiscoveryStop || ((opt)=>{});

  // 媒体
  // 图片
  // wx.chooseImage = wx.chooseImage
  // wx.previewImage = wx.previewImage
  // wx.getImageInfo = wx.getImageInfo
  // wx.saveImageToPhotosAlbum = wx.saveImageToPhotosAlbum
  wx.chooseMessageFile = wx.chooseMessageFile || ((opt) => {});
  wx.compressImage = wx.compressImage || ((opt)=>{});

  // 录音
  wx.stopRecord = wx.stopRecord || ((opt)=>{});
  wx.startRecord = wx.startRecord || ((opt)=>{});
  let recorderManager = wx.getRecorderManager();
  // 处理recorderManager对象字段缺失问题
  recorderManager["onFrameRecorded"] = (()=>{});
  recorderManager["onInterruptionBegin"] = (()=>{});
  recorderManager["onInterruptionEnd"] = (()=>{});
  recorderManager["onResume"] = (()=>{});
  // recorderManager.start百度中无frameSize,audioSource两个参数,且采样率和码率有效值微信和百度不一样,具体可参考api进行传值

  // 背景音频
  wx.stopBackgroundAudio = wx.stopBackgroundAudio || ((opt)=>{});
  wx.seekBackgroundAudio = wx.seekBackgroundAudio || ((opt)=>{});
  wx.playBackgroundAudio = wx.playBackgroundAudio || ((opt)=>{});
  wx.pauseBackgroundAudio = wx.pauseBackgroundAudio || ((opt)=>{});
  wx.onBackgroundAudioStop = wx.onBackgroundAudioStop || ((opt)=>{});
  wx.onBackgroundAudioPlay = wx.onBackgroundAudioPlay || ((opt)=>{});
  wx.onBackgroundAudioPause = wx.onBackgroundAudioPause || ((opt)=>{});
  wx.getBackgroundAudioPlayerState = wx.getBackgroundAudioPlayerState || ((opt)=>{});
  let getBackgroundAudioManager = wx.getBackgroundAudioManager;
  getBackgroundAudioManager["webUrl"] = '';
  getBackgroundAudioManager["protocol"] = '';
  getBackgroundAudioManager["buffered"] = 0;
  getBackgroundAudioManager["onNext"] = (()=>{});
  getBackgroundAudioManager["onPrev"] = (()=>{});
  getBackgroundAudioManager["onSeeking"] = (()=>{});
  getBackgroundAudioManager["onSeeked"] = (()=>{});

  // 音频
  wx.stopVoice = wx.stopVoice || ((opt)=>{});
  wx.playVoice = wx.playVoice || ((opt)=>{});
  wx.pauseVoice = wx.pauseVoice || ((opt)=>{});
  wx.getAvailableAudioSources = wx.getAvailableAudioSources || ((opt)=>{});
  wx.createAudioContext = function(){
    return{
      seek: (()=>{}),
      setSrc: (()=>{}),
      pause: (()=>{}),
      play: (()=>{})
    }
  };
  // wx.setInnerAudioOption = wx.setInnerAudioOption // obeyMuteSwitch字段在baidu中缺失
  let  innerAudioContext =  wx.createInnerAudioContext;
  innerAudioContext["buffered"] =  0;

  // 视频
  // wx.chooseVideo = wx.chooseVideo // camera字段在baidu中缺失
  // wx.saveVideoToPhotosAlbum = wx.saveVideoToPhotosAlbum
  let videoContext = wx.createVideoContext;
  videoContext["playbackRate"] = (()=>{});
  videoContext["stop"] = (()=>{});
  // videoContext.requestFullScreen 进入全屏百度中无direction参数

  // 实时音视频
  // wx.createLivePlayerContext = wx.createLivePlayerContext // 百度中无参数Object this
  wx.createLivePusherContext = function(){
    return{
      pause: (()=>{}),
      pauseBGM: (()=>{}),
      playBGM: (()=>{}),
      resume: (()=>{}),
      resumeBGM: (()=>{}),
      setBGMVolume: (()=>{}),
      snapshot: (()=>{}),
      start: (()=>{}),
      stop: (()=>{}),
      stopBGM: (()=>{}),
      switchCamera: (()=>{}),
      toggleTorch: (()=>{})
    }
  };

  // 相机组件控制
  // wx.createCameraContext = wx.createCameraContext
  // const cameraContext = wx.createCameraContext;
  // cameraContext.startRecord 百度中无此timeoutCallback参数

  // 文件
  const saveFile = wx.saveFile;
  wx.saveFile = function(opt, self){
    const success = opt.success || emptyFn;
    opt.success = function(res) {
      if (res) {
        // 处理成功回调参数savedFilePath类型
        res.savedFilePath = res.savedFilePath.toString();
      }
      success(res);
    };
    saveFile.call(this, opt, self);
  };
  // wx.getSavedFileList = wx.getSavedFileList
  // wx.getSavedFileInfo = wx.getSavedFileInfo
  // wx.removeSavedFile = wx.removeSavedFile
  // wx.openDocument = wx.openDocument
  // wx.getFileInfo = wx.getFileInfo
  wx.getFileSystemManager = function(){
    return {
      access: (()=>{}),
      accessSync: (()=>{}),
      appendFile: (()=>{}),
      appendFileSync: (()=>{}),
      copyFile: (()=>{}),
      copyFileSync: (()=>{}),
      getFileInfo:(()=>{}),
      getSavedFileList:(()=>{}),
      mkdir:(()=>{}),
      mkdirSync:(()=>{}),
      readdir:(()=>{}),
      readdirSync:(()=>{}),
      readFile:(()=>{}),
      readFileSync:(()=>{}),
      removeSavedFile:(()=>{}),
      rename:(()=>{}),
      renameSync:(()=>{}),
      rmdir:(()=>{}),
      rmdirSync:(()=>{}),
      saveFile:(()=>{}),
      saveFileSync:(()=>{}),
      stat:(()=>{}),
      statSync:(()=>{}),
      unlink:(()=>{}),
      unlinkSync:(()=>{}),
      unzip:(()=>{}),
      writeFile:(()=>{}),
      writeFileSync:(()=>{})
    }
  };

  // 数据存储
  // wx.setStorage = wx.setStorage
  // wx.setStorageSync = wx.setStorageSync // 此api百度中参数data类型和小程序不完全一样，但无影响
  // wx.getStorage = wx.getStorage
  // wx.getStorageSync = wx.getStorageSync
  // wx.getStorageInfo = wx.getStorageInfo
  // wx.getStorageInfoSync = wx.getStorageInfoSync
  // wx.removeStorage = wx.removeStorage
  // wx.removeStorageSync = wx.removeStorageSync
  // wx.clearStorage = wx.clearStorage
  // wx.clearStorageSync() = wx.clearStorageSync()

  // 位置
  const getLocation = wx.getLocation;
  wx.getLocation = function(opt, self){
    const success = opt.success || emptyFn;
    opt.success = function(res){
      res["street"] = res.street;
      res["cityCode"] = res.cityCode;
      res["city"] = res.city;
      res["country"] = res.country;
      res["province"] = res.province;
      res["streetNumber"] = res.streetNumber;
      res["district"] = res.district;
      success(res);
    };
    getLocation.call(this,opt,self);
  };
  // wx.chooseLocation = wx.chooseLocation
  const openLocation = wx.openLocation;
  wx.openLocation = (opt)=>{
    // 处理参数latitude、longitude、scale类型百度和小程序不一样问题
    opt.latitude = parseFloat(opt.latitude);
    opt.longitude = parseFloat(opt.longitude);
    opt.scale = parseInt(opt.scale);
    return openLocation(opt);
  };
  // const mapContext = wx.createMapContext;
  // mapContext.mapContext百度中无success,complete参数
  // mapContext.includePoints百度中无success,file,complete参数

  // 界面
  // wx.canvasGetImageData = wx.canvasGetImageData;
  // wx.canvasPutImageData = wx.canvasPutImageData
  // wx.canvasToTempFilePath = wx.canvasToTempFilePath
  const createCanvasContext = wx.createCanvasContext;
  wx.createCanvasContext = function(opt){
    let canvasContext = createCanvasContext.call(this, opt);
    canvasContext["setLineDashOffset"] = ((opt)=>{});
    canvasContext["font"] = ((opt)=>{});
    return canvasContext;
  };

  return wx;
}

export default getInstance();