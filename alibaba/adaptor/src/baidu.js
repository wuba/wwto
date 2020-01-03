import wx from './../../adaptor.js';
function emptyFn() {}

function getInstance() {
  // eslint-disable-next-line no-undef
  const wx = swan;

  wx.has_baidu_hook_flag = true;

  const {
    getStorageSync
  } = wx;
  wx.getStorageSync = (key) => {
    const val = getStorageSync(key);
    if (val === 'undefined') {
      return '';
    }
    return val;
  };

  const {
    request
  } = wx;
  wx.request = (opt) => {
    // 方法名必须大写
    if (opt.method) {
      opt.method = opt.method.toUpperCase();
    }

    // post请求会将数据序列化，字符串序列化会前后多一个双引号导致后端接口异常
    // TODO 还需要对返回结果处理
    if (opt.method === 'POST' && typeof opt.data === 'string') {
      opt.header = opt.header || {};
      opt.header['content-type'] = 'application/x-www-form-urlencoded';
    }

    // 默认按text解析！
    if (!opt.responseType) {
      opt.responseType = 'text';
    }

    // 处理requestTask对象字段缺失
    const requestTask = request.call(this, opt) || {};
    requestTask.abort = emptyFn;
    requestTask.offHeadersReceived = emptyFn;
    requestTask.onHeadersReceived = emptyFn;
    return requestTask;
  };

  const {
    createAnimation
  } = wx;
  wx.createAnimation = function(...args) {
    const animation = createAnimation.call(this, args);

    // 处理animation对象中无export、step字段
    animation.export = emptyFn;
    animation.step = emptyFn;

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
    const {
      step
    } = animation.__proto__;
    animation.__proto__.step = function(...params) {
      return step.apply(this, params) || this;
    };

    return animation;
  };

  // 画布导出为图片
  // const canvasToTempFilePath = wx.canvasToTempFilePath;
  // wx.canvasToTempFilePath = function(opt, self) {
  //   const success = opt.success;
  //   opt.success = function(res) {
  //     if (res) {
  //       res.tempFilePath = res.tempFilePath || res.tempImagePath;
  //     }
  //     success(res);
  //   };
  //   canvasToTempFilePath.call(this, opt, self);
  // };

  // 上传
  const {
    uploadFile
  } = wx;
  wx.uploadFile = function(opt) {
    const uploadTask = uploadFile.call(this, opt);
    // 处理uploadTask对象字段abort、offHeadersReceived缺失问题(百度文档写的有问题)
    const methods = ['abort', 'offHeadersReceived', 'offProgressUpdate', 'onHeadersReceived', 'onProgressUpdate'];
    methods.forEach((method) => {
      uploadTask[method] = uploadTask[method] || emptyFn;
    });

    return uploadTask;
  };

  // wx.downloadFile; 此api参数中百度无filePath(指定文件下载后存储的路径)
  const {
    downloadFile
  } = wx;
  wx.downloadFile = function(opt) {
    const uploadTask = downloadFile.call(this, opt);
    // 处理downloadTask对象字段abort、offHeadersReceived缺失问题(百度文档写的有问题)
    const methods = ['abort', 'offHeadersReceived', 'offProgressUpdate', 'onHeadersReceived', 'onProgressUpdate'];
    methods.forEach((method) => {
      uploadTask[method] = uploadTask[method] || emptyFn;
    });
    return uploadTask;
  };

  // websocket
  // wx.connectSocket = wx.connectSocket;  此api百度中无参数tcpNoDelay
  // wx.onSocketOpen = wx.onSocketOpen
  // wx.onSocketError = wx.onSocketError
  // wx.onSocketMessage = wx.onSocketMessage
  // wx.closeSocket = wx.closeSocket
  // wx.onSocketClose = wx.onSocketClose
  // wx.sendSocketMessage = wx.sendSocketMessage

  // mDNS
  wx.stopLocalServiceDiscovery = wx.stopLocalServiceDiscovery || emptyFn;
  wx.startLocalServiceDiscovery = wx.startLocalServiceDiscovery || emptyFn;
  wx.onLocalServiceResolveFail = wx.onLocalServiceResolveFail || emptyFn;
  wx.onLocalServiceLost = wx.onLocalServiceLost || emptyFn;
  wx.onLocalServiceFound = wx.onLocalServiceFound || emptyFn;
  wx.onLocalServiceDiscoveryStop = wx.onLocalServiceDiscoveryStop || emptyFn;
  wx.offLocalServiceResolveFail = wx.offLocalServiceResolveFail || emptyFn;
  wx.offLocalServiceLost = wx.offLocalServiceLost || emptyFn;
  wx.offLocalServiceFound = wx.offLocalServiceFound || emptyFn;
  wx.offLocalServiceDiscoveryStop = wx.offLocalServiceDiscoveryStop || emptyFn;

  // 媒体
  // 图片
  // wx.chooseImage = wx.chooseImage
  // wx.previewImage = wx.previewImage
  // wx.getImageInfo = wx.getImageInfo
  // wx.saveImageToPhotosAlbum = wx.saveImageToPhotosAlbum
  wx.chooseMessageFile = wx.chooseMessageFile || emptyFn;
  wx.compressImage = wx.compressImage || emptyFn;

  // 录音
  wx.stopRecord = wx.stopRecord || emptyFn;
  wx.startRecord = wx.startRecord || emptyFn;
  const recorderManager = wx.getRecorderManager;
  wx.getRecorderManager = function(opt) {
    const recorderManagers = recorderManager.call(this, opt);
    const methods = ['onFrameRecorded', 'onInterruptionBegin', 'onInterruptionEnd', 'onResume'];
    // 处理recorderManager对象字段缺失问题
    methods.forEach((method) => {
      recorderManagers[method] = recorderManagers[method] || emptyFn;
    });
    // recorderManager.start百度中无frameSize,audioSource两个参数,且采样率和码率有效值微信和百度不一样,具体可参考api进行传值
    return recorderManagers;
  };

  // 背景音频
  wx.stopBackgroundAudio = wx.stopBackgroundAudio || emptyFn;
  wx.seekBackgroundAudio = wx.seekBackgroundAudio || emptyFn;
  wx.playBackgroundAudio = wx.playBackgroundAudio || emptyFn;
  wx.pauseBackgroundAudio = wx.pauseBackgroundAudio || emptyFn;
  wx.onBackgroundAudioStop = wx.onBackgroundAudioStop || emptyFn;
  wx.onBackgroundAudioPlay = wx.onBackgroundAudioPlay || emptyFn;
  wx.onBackgroundAudioPause = wx.onBackgroundAudioPause || emptyFn;
  wx.getBackgroundAudioPlayerState = wx.getBackgroundAudioPlayerState || emptyFn;

  const {
    getBackgroundAudioManager
  } = wx;
  wx.getBackgroundAudioManager = function(opt) {
    const getBackgroundAudioManagers = getBackgroundAudioManager.call(this, opt);
    // 处理getBackgroundAudioManagers对象字段(包括属性和方法)缺失问题
    getBackgroundAudioManagers.webUrl = '';
    getBackgroundAudioManagers.protocol = '';
    getBackgroundAudioManagers.buffered = 0;
    getBackgroundAudioManagers.onNext = emptyFn;
    getBackgroundAudioManagers.onPrev = emptyFn;
    getBackgroundAudioManagers.onSeeking = emptyFn;
    getBackgroundAudioManagers.onSeeked = emptyFn;
    return getBackgroundAudioManagers;
  };

  // 音频
  wx.stopVoice = wx.stopVoice || emptyFn;
  wx.playVoice = wx.playVoice || emptyFn;
  wx.pauseVoice = wx.pauseVoice || emptyFn;
  wx.getAvailableAudioSources = wx.getAvailableAudioSources || emptyFn;
  wx.createAudioContext = wx.createAudioContext || emptyFn; // 返回对象,对象中包含很多方法

  // wx.setInnerAudioOption = wx.setInnerAudioOption // obeyMuteSwitch字段在baidu中缺失
  const innerAudioContext = wx.createInnerAudioContext;
  wx.createInnerAudioContext = function(opt) {
    const innerAudioContexts = innerAudioContext.call(this, opt);
    // 处理innerAudioContext对象字段(buffered)缺失问题
    innerAudioContext.buffered = 0;
    return innerAudioContexts;
  };

  // 视频
  // wx.chooseVideo = wx.chooseVideo
  // camera字段在baidu中缺失,success回调返回值微信中有thumbTempFilePath、和errMsg字段(文档未说明)
  // wx.saveVideoToPhotosAlbum = wx.saveVideoToPhotosAlbum
  const videoContext = wx.createVideoContext;
  wx.createVideoContext = function(opt) {
    const videoContexts = videoContext.call(this, opt);
    const methods = [
      'playbackRate',
      'stop',
      'exitFullScreen',
      'hideStatusBar',
      'play',
      'requestFullScreen',
      'seek',
      'sendDanmu',
      'showStatusBar',
      'pause'
    ];
    // 处理videoContexts对象字段缺失问题
    methods.forEach((method) => {
      videoContexts[method] = videoContexts[method] || emptyFn;
    });

    // videoContext.requestFullScreen 进入全屏百度中无direction参数
    // 百度videoContexts对象中无方法(api文档有问题)
    return videoContexts;
  };

  // 实时音视频
  // wx.createLivePlayerContext = wx.createLivePlayerContext
  wx.createLivePusherContext = wx.createLivePusherContext || emptyFn; // 返回对象,对象中包含很多方法

  // 相机组件控制
  // wx.createCameraContext = wx.createCameraContext
  // const cameraContext = wx.createCameraContext;
  // cameraContext.startRecord 百度中无此timeoutCallback参数

  // 文件
  const {
    saveFile
  } = wx;
  wx.saveFile = function(opt) {
    const {
      success
    } = opt;
    opt.success = function(res) {
      if (res) {
        // 处理成功回调参数savedFilePath类型
        res.savedFilePath = res.savedFilePath.toString();
      }
      success(res);
    };
    return saveFile.call(this, opt);
  };
  // wx.getSavedFileList = wx.getSavedFileList // 微信success返回值中有errMsg
  // wx.getSavedFileInfo = wx.getSavedFileInfo // 百度success返回值有message、status字段
  // wx.removeSavedFile = wx.removeSavedFile
  // wx.openDocument = wx.openDocument
  // wx.getFileInfo = wx.getFileInfo
  wx.getFileSystemManager = wx.getFileSystemManager || emptyFn; // 返回对象,对象中有很多方法

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
  // wx.getLocation = wx.getLocation
  // wx.getLocation中回调参数,百度中有以下参数,微信中没有
  // street、cityCode、city、province、streetNumber、district、country

  // wx.chooseLocation = wx.chooseLocation
  const {
    openLocation
  } = wx;
  wx.openLocation = (opt) => {
    // 处理参数latitude、longitude、scale类型百度和小程序不一样问题
    opt.latitude = parseFloat(opt.latitude);
    opt.longitude = parseFloat(opt.longitude);
    opt.scale = parseInt(opt.scale, 10);
    return openLocation(opt);
  };

  // 地图(媒体)
  // const mapContext = wx.createMapContext;
  // mapContext.translateMarker百度api文档中无success,complete参数
  // mapContext.includePoints百度api文档中无success,file,complete参数

  // 界面
  // wx.canvasGetImageData = wx.canvasGetImageData;
  // wx.canvasPutImageData = wx.canvasPutImageData
  // wx.canvasToTempFilePath = wx.canvasToTempFilePath

  // 画布
  const {
    createCanvasContext
  } = wx;
  wx.createCanvasContext = function(opt) {
    const canvasContext = createCanvasContext.call(this, opt);
    // 处理canvasContext对象某些字段更新
    canvasContext.lineCap = canvasContext.setLineCap;
    canvasContext.lineJoin = canvasContext.setLineJoin;
    canvasContext.lineDashOffset = canvasContext.setLineDash;
    canvasContext.miterLimit = canvasContext.setMiterLimit;

    //微信中canvasContext.setShadow从基础库 1.9.90 开始，接口停止维护，
    //请使用 CanvasContext.shadowOffsetX
    // |CanvasContext.shadowOffsetY
    // |CanvasContext.shadowColor
    // |CanvasContext.shadowBlur 代替
    //这些是属性,不是方法
    return canvasContext;
  };

  // 交互(界面)
  // wx.showToast = wx.showToast
  // wx.showLoading = wx.showLoading
  // wx.hideToast = wx.hideToast // 百度中没有填写success,fail，complate回调,但是有
  // wx.hideLoading = wx.hideLoading // 百度中没有填写success,fail，complate回调,但是有
  // wx.showModal = wx.showModal
  // wx.showActionSheet = wx.showActionSheet 参数itemColor的默认值不同

  // 导航栏(界面)
  // wx.setNavigationBarTitle = wx.setNavigationBarTitle
  // wx.showNavigationBarLoading = wx.showNavigationBarLoading // 百度中没有填写success,fail，complate回调,但是有
  // wx.hideNavigationBarLoading = wx.hideNavigationBarLoading // 百度中没有填写success,fail，complate回调,但是有
  // wx.setNavigationBarColor = wx.setNavigationBarColor

  // Tab bar(界面)
  // wx.setTabBarBadge = wx.setTabBarBadge
  // wx.removeTabBarBadge = wx.removeTabBarBadge
  // wx.showTabBarRedDot = wx.showTabBarRedDot
  // wx.hideTabBarRedDot = wx.hideTabBarRedDot
  // wx.setTabBarStyle = wx.setTabBarStyle
  // wx.setTabBarItem = wx.setTabBarItem
  // wx.showTabBar = wx.showTabBar
  // wx.hideTabBar = wx.hideTabBar

  //路由
  // wx.navigateTo = wx.navigateTo
  // wx.redirectTo = wx.redirectTo
  // wx.switchTab = wx.switchTab
  // wx.navigateBack = wx.navigateBack
  // wx.reLaunch = wx.reLaunch

  // 滚动(界面)
  // wx.pageScrollTo = wx.pageScrollTo

  // 背景(界面)
  // wx.setBackgroundColor = wx.setBackgroundColor
  // wx.setBackgroundTextStyle = wx.setBackgroundTextStyle

  // 下拉刷新(界面)
  // wx.startPullDownRefresh = wx.startPullDownRefresh
  // wx.stopPullDownRefresh = wx.stopPullDownRefresh // 百度中没有填写success,fail，complate回调,但是有

  // 自定义组件
  // wx.nextTick = wx.nextTick

  //节点信息

  // wx.createIntersectionObserver = wx.createIntersectionObserver
  // wx.createSelectorQuery = wx.createSelectorQuery;
  // selectorQuery调用方法的返回对象nodesRef.fields方法参数中，微信中有context字段，百度中无此字段
  // nodesRef对象百度中无content方法,使用时需注意

  wx.loadFontFace = wx.loadFontFace || emptyFn; // 字体
  wx.setTopBarText = wx.setTopBarText || emptyFn;
  wx.getMenuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect || emptyFn;
  wx.onWindowResize = wx.onWindowResize || emptyFn;
  wx.offWindowResize = wx.offWindowResize || emptyFn;

  // 设备
  // 系统信息
  // wx.getSystemInfo = wx.getSystemInfo;
  // wx.getSystemInfoSync = wx.getSystemInfoSync;
  // 系统信息api返回值微信中有以下字段，百度没有
  // benchmarkLevel
  // albumAuthorized
  // locationAuthorized
  // microphoneAuthorized
  // notificationAuthorized
  // notificationAlertAuthorized
  // notificationBadgeAuthorized
  // notificationSoundAuthorized
  // bluetoothEnabled
  // locationEnabled
  // wifiEnabled
  // cameraAuthorized

  // wx.canIUse = wx.canIUse
  // wx.onMemoryWarning = wx.onMemoryWarning
  // wx.getNetworkType = wx.getNetworkType
  // wx.onNetworkStatusChange = wx.onNetworkStatusChange
  // wx.onAccelerometerChange = wx.onAccelerometerChange
  // wx.startAcceleromete = wx.startAcceleromete
  // wx.stopAccelerometer = wx.stopAccelerometer

  //  罗盘
  // wx.onCompassChange = wx.onCompassChange // 该api回调函数success返回值中百度无accuracy字段(精度)
  // wx.startCompass = wx.startCompass
  // wx.stopCompass = wx.stopCompass

  // 扫码
  // wx.scanCode = wx.scanCode
  // 该api的success回调函数返回值中百度无path(当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path),
  // rawData(原始数据，base64编码)字段

  // 屏幕亮度
  // wx.setScreenBrightness = wx.setScreenBrightness
  // wx.getScreenBrightnes = wx.getScreenBrightnes
  // wx.setKeepScreenOn = wx.setKeepScreenOn
  // wx.onUserCaptureScreen = wx.onUserCaptureScreen
  // 振动
  // wx.vibrateShort = wx.vibrateShort
  // wx.vibrateLong = wx.vibrateLong
  // 手机联系人
  // wx.addPhoneContact = wx.addPhoneContact
  // wx.makePhoneCall = wx.makePhoneCall
  // 剪贴板
  // wx.setClipboardData = wx.setClipboardData
  // wx.getClipboardData = wx.getClipboardData

  // 陀螺仪
  wx.onGyroscopeChange = wx.onGyroscopeChange || emptyFn;
  wx.stopGyroscope = wx.stopGyroscope || emptyFn;
  wx.startGyroscope = wx.startGyroscope || emptyFn;

  // 设备方向
  wx.onDeviceMotionChange = wx.onDeviceMotionChange || emptyFn;
  wx.startDeviceMotionListening = wx.startDeviceMotionListening || emptyFn;
  wx.stopDeviceMotionListening = wx.stopDeviceMotionListening || emptyFn;

  // NFC
  wx.stopHCE = wx.stopHCE || emptyFn;
  wx.startHCE = wx.startHCE || emptyFn;
  wx.sendHCEMessage = wx.sendHCEMessage || emptyFn;
  wx.onHCEMessage = wx.onHCEMessage || emptyFn;
  wx.getHCEState = wx.getHCEState || emptyFn;

  // 电量
  wx.getBatteryInfoSync = wx.getBatteryInfoSync || emptyFn;
  wx.getBatteryInfo = wx.getBatteryInfo || emptyFn;

  // 蓝牙
  wx.stopBluetoothDevicesDiscovery = wx.stopBluetoothDevicesDiscovery || emptyFn;
  wx.startBluetoothDevicesDiscovery = wx.startBluetoothDevicesDiscovery || emptyFn;
  wx.openBluetoothAdapte = wx.openBluetoothAdapte || emptyFn;
  wx.onBluetoothDeviceFound = wx.onBluetoothDeviceFound || emptyFn;
  wx.onBluetoothAdapterStateChange = wx.onBluetoothAdapterStateChange || emptyFn;
  wx.getConnectedBluetoothDevices = wx.getConnectedBluetoothDevices || emptyFn;
  wx.getBluetoothDevices = wx.getBluetoothDevices || emptyFn;
  wx.getBluetoothAdapterState = wx.getBluetoothAdapterState || emptyFn;
  wx.closeBluetoothAdapter = wx.closeBluetoothAdapter || emptyFn;

  // 低功耗蓝牙
  wx.readBLECharacteristicValue = wx.readBLECharacteristicValue || emptyFn;
  wx.onBLEConnectionStateChange = wx.onBLEConnectionStateChange || emptyFn;
  wx.onBLECharacteristicValueChange = wx.onBLECharacteristicValueChange || emptyFn;
  wx.notifyBLECharacteristicValueChange = wx.notifyBLECharacteristicValueChange || emptyFn;
  wx.getBLEDeviceServices = wx.getBLEDeviceServices || emptyFn;
  wx.getBLEDeviceCharacteristics = wx.getBLEDeviceCharacteristics || emptyFn;
  wx.createBLEConnection = wx.createBLEConnection || emptyFn;
  wx.closeBLEConnection = wx.closeBLEConnection || emptyFn;
  wx.writeBLECharacteristicValue = wx.writeBLECharacteristicValue || emptyFn;

  // iBeacon
  wx.stopBeaconDiscovery = wx.stopBeaconDiscovery || emptyFn;
  wx.startBeaconDiscovery = wx.startBeaconDiscovery || emptyFn;
  // wx.onBeaconUpdate = wx.onBeaconUpdate // 其返回值beacons即IBeaconInfo,在百度中不能进行操作,会报错
  wx.onBeaconServiceChange = wx.onBeaconServiceChange || emptyFn;
  wx.getBeacons = wx.getBeacons || emptyFn;

  // WI_FI
  wx.stopWifi = wx.stopWifi || emptyFn;
  wx.startWifi = wx.startWifi || emptyFn;
  wx.setWifiList = wx.setWifiList || emptyFn;
  wx.onWifiConnected = wx.onWifiConnected || emptyFn;
  wx.onGetWifiList = wx.onGetWifiList || emptyFn; // 其返回值wifiList即WifiInfo,在百度中不能进行操作,会报错
  wx.getWifiList = wx.getWifiList || emptyFn;
  wx.getConnectedWifi = wx.getConnectedWifi || emptyFn;
  wx.connectWifi = wx.connectWifi || emptyFn;

  // 小程序声明周期
  wx.getLaunchOptionsSync = wx.getLaunchOptionsSync || emptyFn;

  // 应用级事件
  wx.onPageNotFound = wx.onPageNotFound || emptyFn;
  wx.onError = wx.onError || emptyFn;
  wx.onAudioInterruptionBegin = wx.onAudioInterruptionBegin || emptyFn;
  wx.onAudioInterruptionEnd = wx.onAudioInterruptionEnd || emptyFn;
  wx.onAppShow = wx.onAppShow || emptyFn;
  wx.onAppHide = wx.onAppHide || emptyFn;
  wx.offPageNotFound = wx.offPageNotFound || emptyFn;
  wx.offError = wx.offError || emptyFn;
  wx.offAudioInterruptionBegin = wx.offAudioInterruptionBegin || emptyFn;
  wx.offAudioInterruptionEnd = wx.offAudioInterruptionEnd || emptyFn;
  wx.offAppShow = wx.offAppShow || emptyFn;
  wx.offAppHide = wx.offAppHide || emptyFn;



  // 第三方平台
  // wx.getExtConfig = wx.getExtConfig;
  // wx.getExtConfigSync = wx.getExtConfigSync;

  // 开放接口

  // wx.login = wx.login
  // wx.checkSession = wx.checkSession
  // wx.authorize = wx.authorize // 传递参数scope列表百度和微信不完全一样,百度中无scope.invoice、scope.werun,百度中是7个,微信是9个
  // 更新
  // wx.getUpdateManager = wx.getUpdateManager
  // 调试
  // wx.setEnableDebug = wx.setEnableDebug // 百度中没有填写success,fail，complate回调,但是有
  wx.getLogManager = wx.getLogManager || emptyFn; // 返回一个对象,对象中有方法

  // 小程序跳转
  wx.navigateToMiniProgram = wx.navigateToSmartProgram; // 打开另一个小程序 传的参数中百度无envVersion(要打开的小程序版本)
  wx.navigateToSmartProgram = function(opt) {
    // 处理传入参数微信appid与百度appKey映射问题
    if (opt) {
      opt.appKey = opt.appId;
    }
    return opt;
  };
  wx.navigateBackMiniProgram = wx.navigateBackSmartProgram; // 返回到上一个小程序

  // 发票
  // wx.chooseInvoiceTitle = wx.chooseInvoiceTitle // 该api回调函数success返回值中百度无errMsg字段
  wx.chooseInvoice = wx.chooseInvoice || emptyFn;

  // 收获地址
  // wx.chooseAddress = wx.chooseAddress // 该api回调函数success返回值中百度无errMsg字段

  // 设置
  // wx.getSetting = wx.getSetting
  // wx.openSetting = wx.openSetting

  // 用户信息
  const {
    getUserInfo
  } = wx;
  wx.getUserInfo = function(opt) {
    const {
      success
    } = opt;
    opt.success = function(res) {
      // success回调中百度无rawData、signature字段
      // success回调字段userInfo对象中百度无country,province,language,city属性,
      // 多了isAnonymous属性(表示用户信息是否为匿名，若是用户未登录或者拒绝授权为true，正常流程为false。)
      // 处理success回调字段名称encryptedData不对应问题
      if (res) {
        res.encryptedData = res.data;
      }
      success(res);
    };
    return getUserInfo.call(this, opt);
  };

  // 帐号信息
  wx.getAccountInfoSync = wx.getAccountInfoSync || emptyFn;

  // 数据上报
  wx.reportMonitor = wx.reportMonitor || emptyFn;

  // 支付
  wx.requestPayment = wx.requestPayment || emptyFn;

  // 卡劵
  wx.openCard = wx.openCard || emptyFn;
  wx.addCard = wx.addCard || emptyFn;
  wx.startSoterAuthentication = wx.startSoterAuthentication || emptyFn;
  wx.checkIsSupportSoterAuthentication = wx.checkIsSupportSoterAuthentication || emptyFn;
  wx.checkIsSoterEnrolledInDevice = wx.checkIsSoterEnrolledInDevice || emptyFn;
  // 微信运动
  // wx.getWeRunData = wx.getWeRunData

  // 数据分析
  // wx.reportAnalytics = wx.reportAnalytics

  // 定时器
  // clearInterval = clearInterval
  // clearTimeout = clearTimeout
  // setInterval = setInterval
  // setTimeout = setTimeout

  // 转发
  wx.updateShareMenu = wx.updateShareMenu || emptyFn;
  wx.showShareMenu = wx.showShareMenu || emptyFn;
  wx.hideShareMenu = wx.hideShareMenu || emptyFn;
  wx.getShareInfo = wx.getShareInfo || emptyFn;

  // Worker
  wx.createWorker = wx.createWorker || emptyFn; // 返回一个对象，对象中有方法

  return wx;
}

export default getInstance();