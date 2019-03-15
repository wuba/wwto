function getInstance() {
  var wx = my;

  wx['has_ali_hook_flag'] = true;

  // wx.hideNavigationBarLoading = my.hideNavigationBarLoading


  function paramsMap(options, maps = {}) {
    let params = {};

    for (let key in options) {
      let myKey = maps.hasOwnProperty(key) ? maps[key] : key;
      params[myKey] = options[key]
    }

    return params;
  }

  function fn() {
    return function () {
    }
  }

  const STORAGE_API = ['getStorageSync', 'setStorageSync', 'removeStorageSync'];
  let bak = {};
  STORAGE_API.forEach(api => {
    bak[api] = wx[api];
    wx[api] = (key, data) => {
      let params = {};
      if (typeof key === 'string') {
        params.key = key;
        if (data) {
          params.data = data;
        }
      } else {
        params = key;
      }
      let result = bak[api](params).data;

      if (api === 'getStorageSync') {
        result = result || '';
      }

      return result;
    };
  });

  ///////////// 基础
  // wx.canIUse=my.canIUse
  // wx.getSystemInfoSync=my.getSystemInfoSync

  const getSystemInfo = wx.getSystemInfo;
  wx.getSystemInfo = function (opt) {
    let success = opt.success || fn();
    opt.success = function (res) {
      res.system = res.platform + " " + res.system;

      // 支付宝小程序windowHeight可能拿到0
      if (!res.windowHeight) {
        res.windowHeight = parseInt(res.screenHeight * res.windowWidth / res.screenWidth, 10) - 40;
      }
      success(res);
    };
    return getSystemInfo.call(this, opt);
  };

  const getUpdateManager = wx.getUpdateManager;
  wx.getUpdateManager = function (opt) {
    let obj = getUpdateManager();
    obj['applyUpdate'] = obj['applyUpdate'] || fn();
    obj['onCheckForUpdate'] = obj['onCheckForUpdate'] || fn();
    obj['onUpdateFailed'] = obj['onUpdateFailed'] || fn();
    obj['onUpdateReady'] = obj['onUpdateReady'] || fn();
    return obj;
  };

  // 调试
  wx.setEnableDebug = wx.setEnableDebug || fn();
  wx.getLogManager = wx.getLogManager || fn();

  ///////////路由
  // wx.redirectTo=my.redirectTo
  // wx.navigateTo=my.navigateTo
  // wx.reLaunch=my.reLaunch
  // wx.switchTab=my.switchTab
  // wx.navigateBack=my.navigateBack


  // 界面交互
  // wx.hideToast=my.hideToast
  // wx.hideLoading=my.hideLoading

  // toast提示
  const showToast = wx.showToast;
  wx.showToast = function (opt) {
    if (typeof opt['icon'] === 'undefined') {
      opt['icon'] = 'success'
    }
    return showToast.call(this, paramsMap(opt, {
      title: 'content',
      icon: 'type'
    }));
  };

  // wx模态弹窗不同的参数对应到支付宝confirm和alert API
  function showModal(opt) {
    let params = paramsMap(opt);
    let showCancel = params.showCancel;

    if (typeof showCancel === 'undefined') {
      showCancel = true
    }

    // 确认框
    if (showCancel) {
      params.confirmButtonText = params.confirmText;
      params.cancelButtonText = params.cancelText;
    } else {
      // 提醒框
      params.buttonText = params.confirmText;
    }

    wx[showCancel ? 'confirm' : 'alert'](params)
  }

  wx.showModal = wx.showModal || showModal;

  // loading
  const showLoading = wx.showLoading;
  wx.showLoading = function (opt) {
    return showLoading.call(this, paramsMap(opt, {
      title: "content"
    }))
  };

  // 显示操作菜单
  const showActionSheet = wx.showActionSheet;
  wx.showActionSheet = function (opt) {
    let params = paramsMap(opt, {
      itemList: 'items'
    });

    let success = params.success || fn();
    let fail = params.fail || fn();

    params.success = function ({index: tapIndex}) {
      if (tapIndex === -1) {
        fail({
          errMsg: 'showActionSheet:fail cancel'
        });
      } else {
        success({
          tapIndex
        });
      }
    };

    return showActionSheet.call(this, params);
  };

  /////// 界面导航栏
  // wx.hideNavigationBarLoading=my.hideNavigationBarLoading
  // wx.showNavigationBarLoading=my.showNavigationBarLoading

  wx.setNavigationBarTitle = wx.setNavigationBar;
  wx.setNavigationBarColor = wx.setNavigationBar;

  /////// 界面背景
  // wx.setBackgroundColor = my.setBackgroundColor
  // wx.setBackgroundTextStyle=my.setBackgroundTextStyle

  ////////界面 Tab Bar
  // wx.showTabBar=my.showTabBar
  // wx.hideTabBar=my.hideTabBar

  wx.showTabBarRedDot = wx.showTabBarRedDot || fn();
  wx.setTabBarStyle = wx.setTabBarStyle || fn();
  wx.setTabBarItem = wx.setTabBarItem || fn();
  wx.setTabBarBadge = wx.setTabBarBadge || fn();
  wx.removeTabBarBadge = wx.removeTabBarBadge || fn();
  wx.hideTabBarRedDot = wx.hideTabBarRedDot || fn();

  ////////// 界面字体
  wx.loadFontFace = wx.loadFontFace || fn();

  ////////// 下拉刷新
  // wx.stopPullDownRefresh = my.stopPullDownRefresh
  wx.startPullDownRefresh = wx.startPullDownRefresh || fn();

  ////////// 滚动
  const pageScrollTo = wx.pageScrollTo;
  wx.pageScrollTo = function (opt) {
    opt.success = opt.success || fn();
    opt.fail = opt.fail || fn();
    try {
      pageScrollTo(opt);
      opt.success({errMsg: 'pageScrollTo:ok'})
    }
    catch (e) {
      opt.fail(e)
    }
  };

  ///////// 动画
  // wx.createAnimation = my.createAnimation


  //////////置顶
  wx.setTopBarText = wx.setTopBarText || fn();

  ///////// 自定义组价
  wx.nextTick = wx.nextTick || fn();

  ////////菜单
  wx.getMenuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect || fn();

  ////////窗口
  wx.onWindowResize = wx.onWindowResize || fn();
  wx.offWindowResize = wx.offWindowResize || fn();

  ////////网络 发起请求
  wx.request = function (opt) {
    opt.headers = opt.header || opt.headers || {};
    opt.headers['referer'] = '';
    opt.headers['content-type'] = opt.headers['content-type'] || 'application/json';

    let success = opt.success || fn();
    opt.success = function (res) {
      success.call(this, paramsMap(res, {
        headers: 'header',
        status: 'statusCode'
      }));
    };

    if (wx.canIUse('request')) {
      return wx.request(opt);
    }
    return wx.httpRequest(opt);
  };

  //////////下载
  const downloadFile = wx.downloadFile;
  wx.downloadFile = function (opt) {
    let success = opt.success || fn();
    let downTask = downloadFile(Object.assign({}, opt, {
      success(res) {
        res['tempFilePath'] = res.apFilePath;
        res['statusCode'] = 200;
        success(res)
      }
    }));
    downTask['abort'] = downTask['abort'] || fn();
    downTask['offHeadersReceived'] = downTask['offHeadersReceived'] || fn();
    downTask['offProgressUpdate'] = downTask['offProgressUpdate'] || fn();
    downTask['onHeadersReceived'] = downTask['onHeadersReceived'] || fn();
    downTask['onProgressUpdate'] = downTask['onProgressUpdate'] || fn();
    return downTask;
  };

  ///////上传
  const uploadFile = wx.uploadFile;
  wx.uploadFile = function (opt) {
    const paths = opt.filePath.split(/\\|\//);
    const fileName = paths[paths.length - 1];
    const isImg = /\.(png|jpg|jpeg|gif|webp)/i.test(fileName);
    const isVideo = /\.(mp4|mov|WMV|3GP|FLV|RMVB|WebM|AVI|ASF|MPEG|MPG|DAT|MKV)/i.test(fileName);
    const fileType = isImg ? 'image' : (isVideo ? 'video' : 'audio');

    opt = Object.assign({}, opt, {
      fileName: fileName,
      fileType: fileType,
    });

    let uploadTask = uploadFile(opt);
    uploadTask['abort'] = uploadTask['abort'] || fn();
    uploadTask['offHeadersReceived'] = uploadTask['offHeadersReceived'] || fn();
    uploadTask['offProgressUpdate'] = uploadTask['offProgressUpdate'] || fn();
    uploadTask['onHeadersReceived'] = uploadTask['onHeadersReceived'] || fn();
    uploadTask['onProgressUpdate'] = uploadTask['onProgressUpdate'] || fn();

    return uploadTask;
  };

  ///////websocket
  const connectSocket = wx.connectSocket;
  wx.connectSocket = function () {
    setTimeout(() => {
      // 处理onOpen回调无法触发的问题
      connectSocket.apply(this, arguments);
    }, 100);

    return {
      send: function () {
        wx.sendSocketMessage.apply(this, arguments);
      },
      close: function () {
        wx.closeSocket.apply(this, arguments);
      },
      onOpen: function (cb) {
        wx.onSocketOpen(cb);
      },
      onClose: function (cb) {
        wx.onSocketClose(cb);
      },
      onError: function (cb) {
        wx.onSocketError(cb);
      },
      onMessage: function (cb) {
        wx.onSocketMessage(cb);
      }
    };
  };

  //////////mDns
  wx.stopLocalServiceDiscovery = wx.stopLocalServiceDiscovery || fn();
  wx.startLocalServiceDiscovery = wx.startLocalServiceDiscovery || fn();
  wx.onLocalServiceResolveFail = wx.onLocalServiceResolveFail || fn();
  wx.onLocalServiceLost = wx.onLocalServiceLost || fn();
  wx.onLocalServiceFound = wx.onLocalServiceFound || fn();
  wx.onLocalServiceDiscoveryStop = wx.onLocalServiceDiscoveryStop || fn();
  wx.offLocalServiceResolveFail = wx.offLocalServiceResolveFail || fn();
  wx.offLocalServiceLost = wx.offLocalServiceLost || fn();
  wx.offLocalServiceFound = wx.offLocalServiceFound || fn();
  wx.offLocalServiceDiscoveryStop = wx.offLocalServiceDiscoveryStop || fn();

  //////////数据缓存
  const getStorage = wx.getStorage;
  wx.getStorage = function (opt) {
    let success = opt.success;
    opt.success = function (res) {
      if (res.data) {
        success(res);
      } else {
        opt.fail({
          errMsg: 'getStorage:fail data not found'
        });
      }
    };
    return getStorage.call(this, opt);
  };

  ////////地图
  const createMapContext = wx.createMapContext;
  wx.createMapContext = function (opt) {
    let mapContext = createMapContext(opt);
    mapContext['getRegion'] = mapContext['getRegion'] || fn();
    mapContext['getScale'] = mapContext['getScale'] || fn();
    mapContext['includePoints'] = mapContext['includePoints'] || fn();
    return mapContext;
  };

  ////////图片
  // wx.getImageInfo=my.getImageInfo
  const getImageInfo = wx.getImageInfo;
  wx.getImageInfo = function (opt) {
    let success = opt.success;
    return getImageInfo.call(this, Object.assign({}, opt, {
      success(res) {
        let type = res.type.substring(0, res.type.indexOf('?'));
        res.type = type;
        success(res)
      }
    }))
  };

  wx.saveImageToPhotosAlbum = function (opt) {
    return wx.saveImage(Object.assign({}, opt, {
      url: opt.filePath,
      success(res) {
        res['errMsg'] = "saveImageToPhotosAlbum:ok";
        opt.success && opt.success(res)
      }
    }))
  };

  const previewImage = wx.previewImage;
  wx.previewImage = function (opt) {
    let params = paramsMap(opt);
    let current = params.current;

    if (current) {
      current = opt.urls.indexOf(current)
    }

    if (current === -1 || !current) {
      current = 0
    }

    params.current = current;

    return previewImage.call(this, params);
  };
  const compressImage = wx.compressImage;
  wx.compressImage = function (opt) {
    let src = opt.src;
    let success = opt.success || fn();
    return compressImage.call(this, Object.assign({}, opt, {
      compressLevel: 4,
      apFilePaths: [src],
      success(res) {
        res['tempFilePath'] = res.apFilePaths[0] || "";
        success(res)
      }
    }))
  };
  wx.chooseMessageFile = wx.chooseMessageFile || fn();
  const chooseImage = wx.chooseImage;
  wx.chooseImage = function (opt) {
    let success = opt.success || fn();
    opt.count = opt.count || 9;
    return chooseImage.call(this, Object.assign({}, opt, {
      success(res) {
        let tempFilePaths = [].concat(res.apFilePaths);
        let arr = [];
        res.apFilePaths.map(function (item) {
          arr.push({
            path: item,
            size: null
          })
        });
        let tempFiles = [].concat(arr);
        success({tempFilePaths, tempFiles})
      }
    }))
  };

  //////////视频
  wx.saveVideoToPhotosAlbum = wx.saveVideoToPhotosAlbum || fn();
  wx.createVideoContext = wx.createVideoContext || fn()
  wx.chooseVideo = wx.chooseVideo || fn();

  ///////////音频
  wx.stopVoice = wx.stopVoice || fn();
  wx.setInnerAudioOption = wx.setInnerAudioOption || fn();
  wx.playVoice = wx.playVoice || fn();
  wx.pauseVoice = wx.pauseVoice || fn();
  wx.getAvailableAudioSources = wx.getAvailableAudioSources || fn();
  wx.createInnerAudioContext = wx.createInnerAudioContext || fn();

  ////////背景音频
  wx.createAudioContext = wx.createAudioContext || fn()

  wx.stopBackgroundAudio = wx.stopBackgroundAudio || fn();
  wx.seekBackgroundAudio = wx.seekBackgroundAudio || fn();
  wx.playBackgroundAudio = wx.playBackgroundAudio || fn();
  wx.pauseBackgroundAudio = wx.pauseBackgroundAudio || fn();
  wx.onBackgroundAudioStop = wx.onBackgroundAudioStop || fn();
  wx.onBackgroundAudioPlay = wx.onBackgroundAudioPlay || fn();
  wx.onBackgroundAudioPause = wx.onBackgroundAudioPause || fn();
  wx.getBackgroundAudioPlayerState = wx.getBackgroundAudioPlayerState || fn();
  wx.getBackgroundAudioManager = wx.getBackgroundAudioManager || fn()

  ////////////实时音视频
  wx.createLivePusherContext = wx.createLivePusherContext || fn();
  wx.createLivePlayerContext = wx.createLivePlayerContext || fn()


  //////////录音
  wx.stopRecord = wx.stopRecord || fn();
  wx.startRecord = wx.startRecord || fn();
  wx.getRecorderManager = wx.getRecorderManager || fn();


  //////////相机
  wx.createCameraContext = wx.createCameraContext || fn()

  //////////位置
  // wx.chooseLocation=my.chooseLocation
  const openLocation = wx.openLocation;
  wx.openLocation = function (opt) {
    if (typeof opt['name'] === 'undefined') {
      opt['name'] = '位置'
    }
    if (typeof opt['address'] === 'undefined') {
      opt['address'] = "-"
    }
    return openLocation.call(this, opt)
  };

  // res 无speed	 accuracy	 altitude	 verticalAccuracy  horizontalAccuracy
  const getLocation = wx.getLocation;
  wx.getLocation = function (opt) {
    let success = opt.success || fn();
    return getLocation(Object.assign({}, opt, {
      type: 0
    }))
  };

  //////////分享
  // wx.hideShareMenu=my.hideShareMenu
  wx.updateShareMenu = wx.updateShareMenu || fn();
  wx.getShareInfo = wx.getShareInfo || fn();
  wx.showShareMenu = wx.showShareMenu || fn()

  /////////画布
  const createCanvasContext = wx.createCanvasContext;
  wx.createCanvasContext = function (opt) {
    let canvasContext = createCanvasContext.call(this, opt);
    canvasContext['arcTo'] = canvasContext['arcTo'] || (() => canvasContext);
    canvasContext['createPattern'] = canvasContext['createPattern'] || (() => canvasContext);
    canvasContext['strokeText'] = canvasContext['strokeText'] || (() => canvasContext)
    canvasContext['miterLimit'] = canvasContext.setMiterLimit
    canvasContext['lineCap'] = canvasContext.setLineCap
    canvasContext['lineDashOffset'] = canvasContext.setLineDash
    canvasContext['lineJoin'] = canvasContext.setLineJoin
    return canvasContext
  };

  const canvasToTempFilePath = wx.canvasToTempFilePath;
  wx.canvasToTempFilePath = function (opt) {
    let canvasContext = wx.createCanvasContext(opt.canvasId);
    let success = opt.success || fn();
    canvasContext.toTempFilePath(Object.assign({}, opt, {
      success(res) {
        res['tempFilePath'] = res.apFilePath;
        success(res);
      }
    }))
  };

  const canvasPutImageData = wx.canvasPutImageData;
  wx.canvasPutImageData = function (opt) {
    let canvasContext = wx.createCanvasContext(opt.canvasId);
    let success = opt.success || fn();
    canvasContext.putImageData(opt)
  };

  const canvasGetImageData = wx.canvasGetImageData;
  wx.canvasGetImageData = function (opt) {
    let canvasContext = wx.createCanvasContext(opt.canvasId);
    let success = opt.success || fn();
    canvasContext.getImageData(opt)
  };


  //////////文件
  const saveFile = wx.saveFile;
  wx.saveFile = function (opt) {
    let success = opt.success || fn();
    let apFilePath = opt.tempFilePath;
    return saveFile.call(this, Object.assign({}, opt, {
      apFilePath: apFilePath,
      success(res) {
        res['savedFilePath'] = res['apFilePath'];
        success(res);
      }
    }))
  };

  const removeSavedFile = wx.removeSavedFile;
  wx.removeSavedFile = function (opt) {
    return removeSavedFile.call(this, paramsMap(opt, {
      filePath: apFilePath
    }))
  };

  const getSavedFileList = wx.getSavedFileList;
  wx.getSavedFileList = function (opt) {
    let success = opt.success || fn();
    return getSavedFileList.call(this, {}, opt, {
      success(res) {
        res.fileList.map((item) => {
          item['filePath'] = item.apFilePath
        });
        success(res)
      }
    })
  };

  const getSavedFileInfo = wx.getSavedFileInfo;
  wx.getSavedFileInfo = function (opt) {
    return getSavedFileInfo.call(this, paramsMap(opt, {
      filePath: "apFilePath"
    }))
  };

  const getFileInfo = wx.getFileInfo;
  wx.getFileInfo = function (opt) {
    return getFileInfo.call(this, paramsMap(opt, {
      filePath: 'apFilePath'
    }))
  };

  wx.getFileSystemManager = wx.getFileSystemManager || fn()


  //////////设备
  /////////iBeacon
  // wx.stopBeaconDiscovery=my.stopBeaconDiscovery
  // wx.startBeaconDiscovery=my.startBeaconDiscovery
  // wx.onBeaconUpdate=my.onBeaconUpdate
  // wx.onBeaconServiceChange=my.onBeaconServiceChange
  // wx.getBeacons=my.getBeacons

  //////////wifi
  wx.stopWifi = wx.stopWifi || fn();
  wx.startWifi = wx.startWifi || fn();
  wx.setWifiList = wx.setWifiList || fn();
  wx.onWifiConnected = wx.onWifiConnected || fn();
  wx.onGetWifiList = wx.onGetWifiList || fn();
  wx.getWifiList = wx.getWifiList || fn();
  wx.getConnectedWifi = wx.getConnectedWifi || fn();
  wx.connectWifi = wx.connectWifi || fn();


  ///////////低功耗蓝牙
  // wx.readBLECharacteristicValue=my.readBLECharacteristicValue
  // wx.onBLECharacteristicValueChange=my.onBLECharacteristicValueChange
  // wx.notifyBLECharacteristicValueChange=my.notifyBLECharacteristicValueChange
  // wx.getBLEDeviceServices=my.getBLEDeviceServices
  // wx.getBLEDeviceCharacteristics=my.getBLEDeviceCharacteristics
  // wx.writeBLECharacteristicValue=my.writeBLECharacteristicValue
  wx.onBLEConnectionStateChange = wx.onBLEConnectionStateChanged;
  wx.createBLEConnection = wx.connectBLEDevice;
  wx.closeBLEConnection = wx.disconnectBLEDevice;


  //////////蓝牙
  // wx.stopBluetoothDevicesDiscovery=my.stopBluetoothDevicesDiscovery
  // wx.startBluetoothDevicesDiscovery=my.startBluetoothDevicesDiscovery
  // wx.openBluetoothAdapter=my.openBluetoothAdapter
  // wx.onBluetoothDeviceFound=my.onBluetoothDeviceFound
  // wx.onBluetoothAdapterStateChange=my.onBluetoothAdapterStateChange
  // wx.getConnectedBluetoothDevices=my.getConnectedBluetoothDevices
  // wx.getBluetoothDevices=my.getBluetoothDevices
  // wx.getBluetoothAdapterState=my.getBluetoothAdapterState
  // wx.closeBluetoothAdapter=my.closeBluetoothAdapter

  /////////联系人
  // wx.addPhoneContact=my.addPhoneContact


  /////////电量
  wx.getBatteryInfoSync = wx.getBatteryInfoSync || function () {
    return {}
  };
  wx.getBatteryInfo = wx.getBatteryInfo || function () {
    return {}
  };


  ////////剪贴板
  wx.setClipboardData = function (opt) {
    return wx.setClipboard(paramsMap(opt, {
      data: 'text'
    }))
  };

  wx.getClipboardData = function (opt) {
    let success = opt.success;
    return wx.getClipboard(Object.assign({}, opt, {
      success(res) {
        res['data'] = res.text;
        success(res)
      }
    }))
  };


  ///////////nfc
  wx.stopHCE = wx.stopHCE || fn();
  wx.startHCE = wx.startHCE || fn();
  wx.sendHCEMessage = wx.sendHCEMessage || fn();
  wx.onHCEMessage = wx.onHCEMessage || fn();
  wx.getHCEState = wx.getHCEState || fn();

  //////////网络
  //getNetworkType
  const getNetworkType = wx.getNetworkType;
  wx.getNetworkType = function (opt) {
    let success = opt.success || fn();
    return getNetworkType(Object.assign({}, opt, {
      success(res) {
        res.networkType = res.networkType.toLocaleLowerCase();
        success(res)
      }
    }))
  };

  let onNetworkStatusChange = wx.onNetworkStatusChange;
  wx.onNetworkStatusChange = function (fn) {
    return onNetworkStatusChange(function (res) {
      res.networkType = res.networkType.toLocaleLowerCase();
      fn(res)
    })
  };


  ////////屏幕
  // wx.setScreenBrightness=my.setScreenBrightness
  // wx.setKeepScreenOn=my.setKeepScreenOn
  // wx.getScreenBrightness=my.getScreenBrightness
  // wx.onUserCaptureScreen=my.onUserCaptureScreen

  //////////电话
  const makePhoneCall = wx.makePhoneCall;
  wx.makePhoneCall = function (opt) {
    return makePhoneCall.call(this, paramsMap(opt, {
      phoneNumber: 'number'
    }));
  };

  /////////加速器
  // wx.stopAccelerometer=my.stopAccelerometer
  // wx.onAccelerometerChange=my.onAccelerometerChange
  wx.startAccelerometer = wx.startAccelerometer || fn();


  ////////罗盘
  // stopCompass
  // wx.onCompassChange=my.onCompassChange

  //缺少accuracy
  const onCompassChange = wx.onCompassChange;
  wx.onCompassChange = function (fn) {
    let oldFn = fn;
    return onCompassChange.call(this, function (res) {
      oldFn({direction: res.direction})
    })
  }
  wx.stopCompass = wx.offCompassChange;
  wx.startCompass = wx.startCompass || fn();

  /////////设备方向
  wx.stopDeviceMotionListening = wx.stopDeviceMotionListening || fn();
  wx.startDeviceMotionListening = wx.startDeviceMotionListening || fn();
  wx.onDeviceMotionChange = wx.onDeviceMotionChange || fn();


  //////////设备方向
  // wx.onGyroscopeChange=my.onGyroscopeChange
  wx.stopGyroscope = wx.offGyroscopeChange;
  wx.startGyroscope = wx.startGyroscope || fn();

  //性能
  wx.onMemoryWarning = wx.onMemoryWarning || fn();

  ////////扫码
  wx.scanCode = function (opt) {
    let typeMap = {
      'qrCode': "qr",
      'barCode': "bar"
    };
    let success = opt.success || fn();
    return wx.scan(Object.assign({}, opt, {
      hideAlbum: typeof opt.onlyFromCamera === 'undefined' ? true : opt.onlyFromCamera,
      type: typeof opt.scanType === 'undefined' ? "qr" : typeMap[opt.scanType[0]],
      success(res) {
        let scanType = "";
        if (res.qrCode) {
          scanType = "QR_CODE"
        }
        else if (res.barCode) {
          scanType = "BAR_CODE"
        }
        success({
          result: res.code,
          scanType: scanType,
          errMsg: "scanCode:ok"
        })
      }
    }))
  };

  //////////震动
  // wx.vibrateShort=my.vibrateShort
  // wx.vibrateLong=my.vibrateLong


  /////////worker
  wx.createWorker = wx.createWorker || fn();

  /////////第三方平台
  wx.getExtConfigSync = wx.getExtConfigSync || fn();
  wx.getExtConfig = wx.getExtConfig || fn();

  ///////////WXML
  ///////////
  //查找元素 返回的只有SelectorQuery对象
  //SelectorQuery对象只有.exec .select .selectAll .selectViewport 方法
  const createSelectorQuery = wx.createSelectorQuery;
  wx.createSelectorQuery = function () {
    let query = createSelectorQuery.apply(this, arguments);
    query['in'] = query['in'] || function () {
      return query;
    };
    return query;
  };

  wx.createIntersectionObserver = wx.createIntersectionObserver || fn()

  //////////// 开放接口
  // wx.navigateBackMiniProgram=my.navigateBackMiniProgram
  // wx.navigateToMiniProgram=my.navigateToMiniProgram
  wx.login = (o) => {
    let bak = {
      success: o.success,
      fail: o.fail,
      complete: o.complete
    };
    o.success = function (res) {
      res.code = res.authCode;
      delete res.authCode;
      bak.success && bak.success(res);
    };
    return wx.getAuthCode(o);
  };

  wx.checkSession = wx.checkSession || fn();

  const getAuthUserInfo = wx.getAuthUserInfo;
  wx.getUserInfo = (o) => {
    let bak = {
      success: o.success,
      fail: o.fail,
      complete: o.complete
    };

    o.success = function (res) {
      let rst = {};
      for (let k in res) {
        rst[k === 'avatar' ? 'avatarUrl' : k] = res[k];
      }
      bak.success && bak.success({
        userInfo: rst
      });
    };

    return getAuthUserInfo(o);
  };

  // 发起支付
  const requestPayment = wx.tradePay;
  wx.requestPayment = function (opt) {
    let params = paramsMap(opt, {
      alipay_trade_body: 'orderStr'
    });

    let success = params.success || fn();
    let fail = params.fail || fn();

    params.success = function (res) {
      if (res.resultCode === 9000) {
        success();
      } else {
        fail();
      }
    };

    return requestPayment.call(this, params);
  };

  wx.getAccountInfoSync = wx.getAccountInfoSync || fn();
  wx.reportMonitor = wx.reportMonitor || fn();
  wx.reportAnalytics = wx.reportAnalytics || fn();
  wx.getWeRunData = wx.getWeRunData || fn();
  wx.authorize = wx.authorize || fn();
  wx.startSoterAuthentication = wx.startSoterAuthentication || fn();
  wx.checkIsSupportSoterAuthentication = wx.checkIsSupportSoterAuthentication || fn();
  wx.checkIsSoterEnrolledInDevice = wx.checkIsSoterEnrolledInDevice || fn();
  wx.chooseInvoiceTitle = wx.chooseInvoiceTitle || fn();
  wx.chooseInvoice = wx.chooseInvoice || fn();
  wx.addCard = wx.addCard || fn();
  wx.openCard = wx.openCard || fn();
  wx.chooseAddress = wx.chooseAddress || fn();

  // 设置
  // authSetting 缺少address，invoiceTitle，invoice，werun
  const getSetting = wx.getSetting;
  wx.getSetting = function (opt) {
    let success = opt.success || fn();
    return getSetting(Object.assign({}, opt, {
      success(res) {
        res.authSetting["scope.userLocation"] = res.authSetting['scope.location'];
        res.authSetting["scope.writePhotosAlbum"] = res.authSetting['scope.album'];
        res.authSetting["scope.record"] = res.authSetting['scope.audioRecord'];
        success(res)
      }
    }))
  };
  const openSetting = wx.openSetting;
  wx.openSetting = function (opt) {
    let success = opt.success || fn();
    return openSetting(Object.assign({}, opt, {
      success(res) {
        res.authSetting["scope.userLocation"] = res.authSetting['scope.location'];
        res.authSetting["scope.writePhotosAlbum"] = res.authSetting['scope.album'];
        res.authSetting["scope.record"] = res.authSetting['scope.audioRecord'];
        success(res)
      }
    }))
  };

  return wx;
}

export default getInstance();