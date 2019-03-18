const { hasOwnProperty } = Object.prototype;

function paramsMap(options, maps = {}) {
  const params = {};

  Object.keys(options).forEach((key) => {
    let newKey = key;
    if (hasOwnProperty.call(maps, key)) {
      newKey = maps[key];
    }
    params[newKey] = options[key];
  });

  return params;
}

function emptyFn() {}

function getInstance() {
  // eslint-disable-next-line no-undef
  const wx = my;

  wx.has_ali_hook_flag = true;

  // wx.hideNavigationBarLoading = my.hideNavigationBarLoading

  // 本地存储
  const storageApis = ['getStorageSync', 'setStorageSync', 'removeStorageSync'];
  const storageBak = {};
  storageApis.forEach(api => {
    storageBak[api] = wx[api];
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

      let result = storageBak[api](params).data;
      if (api === 'getStorageSync') {
        result = result || '';
      }

      return result;
    };
  });

  ///////////// 基础
  // wx.canIUse = my.canIUse
  // wx.getSystemInfoSync = my.getSystemInfoSync

  const { getSystemInfo } = wx;
  wx.getSystemInfo = function(opt) {
    const success = opt.success || emptyFn;
    opt.success = function(res) {
      res.system = `${res.platform} ${res.system}`;

      // 支付宝小程序windowHeight可能拿到0
      if (!res.windowHeight) {
        res.windowHeight = parseInt(res.screenHeight * res.windowWidth / res.screenWidth, 10) - 40;
      }
      success(res);
    };
    return getSystemInfo.call(this, opt);
  };

  const { getUpdateManager } = wx;
  wx.getUpdateManager = function() {
    const manager = getUpdateManager();
    const apis = ['applyUpdate', 'onCheckForUpdate', 'onUpdateFailed', 'onUpdateReady'];
    apis.forEach((api) => {
      manager[api] = manager[api] || emptyFn;
    });
    return manager;
  };

  // 调试
  wx.setEnableDebug = wx.setEnableDebug || emptyFn;
  wx.getLogManager = wx.getLogManager || emptyFn;

  // 生命周期
  wx.getLaunchOptionsSync = wx.getLaunchOptionsSync || emptyFn;
  wx.onPageNotFound = wx.onPageNotFound || emptyFn;
  wx.onError = wx.onError || emptyFn;
  wx.onAudioInterruptionBegin = wx.onAudioInterruptionBegin || emptyFn;
  wx.onAppShow = wx.onAppShow || emptyFn;
  wx.onAppHide = wx.onAppHide || emptyFn;
  wx.offPageNotFound = wx.offPageNotFound || emptyFn;
  wx.offError = wx.offError || emptyFn;
  wx.offAudioInterruptionBegin = wx.offAudioInterruptionBegin || emptyFn;
  wx.offAppShow = wx.offAppShow || emptyFn;
  wx.offAppHide = wx.offAppHide || emptyFn;

  ///////////路由
  // wx.redirectTo = my.redirectTo
  // wx.navigateTo = my.navigateTo
  // wx.reLaunch = my.reLaunch
  // wx.switchTab = my.switchTab
  // wx.navigateBack = my.navigateBack

  // 界面交互
  // wx.hideToast = my.hideToast
  // wx.hideLoading = my.hideLoading

  // toast提示
  const { showToast } = wx;
  wx.showToast = function(opt) {
    if (typeof opt.icon === 'undefined') {
      opt.icon = 'success';
    }
    return showToast.call(this, paramsMap
    (opt, {
      title: 'content',
      icon: 'type'
    }));
  };

  // wx模态弹窗不同的参数对应到支付宝confirm和alert API
  function showModal(opt) {
    const params = paramsMap(opt);
    let { showCancel } = params;

    if (typeof showCancel === 'undefined') {
      showCancel = true;
    }

    // 确认框
    if (showCancel) {
      params.confirmButtonText = params.confirmText;
      params.cancelButtonText = params.cancelText;
    } else {
      // 提醒框
      params.buttonText = params.confirmText;
    }

    wx[showCancel ? 'confirm' : 'alert'](params);
  }

  wx.showModal = wx.showModal || showModal;

  // loading
  const { showLoading } = wx;
  wx.showLoading = function(opt) {
    return showLoading.call(this, paramsMap(opt, {
      title: "content"
    }));
  };

  // 显示操作菜单
  const { showActionSheet } = wx;
  wx.showActionSheet = function(opt) {
    const params = paramsMap(opt, {
      itemList: 'items'
    });

    const success = params.success || emptyFn;
    const fail = params.fail || emptyFn;

    params.success = function({ index: tapIndex }) {
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
  // wx.hideNavigationBarLoading = my.hideNavigationBarLoading
  // wx.showNavigationBarLoading = my.showNavigationBarLoading

  wx.setNavigationBarTitle = wx.setNavigationBar;
  wx.setNavigationBarColor = wx.setNavigationBar;

  /////// 界面背景
  // wx.setBackgroundColor = my.setBackgroundColor
  // wx.setBackgroundTextStyle = my.setBackgroundTextStyle

  ////////界面 Tab Bar
  // wx.showTabBar = my.showTabBar
  // wx.hideTabBar = my.hideTabBar

  wx.showTabBarRedDot = wx.showTabBarRedDot || emptyFn;
  wx.setTabBarStyle = wx.setTabBarStyle || emptyFn;
  wx.setTabBarItem = wx.setTabBarItem || emptyFn;
  wx.setTabBarBadge = wx.setTabBarBadge || emptyFn;
  wx.removeTabBarBadge = wx.removeTabBarBadge || emptyFn;
  wx.hideTabBarRedDot = wx.hideTabBarRedDot || emptyFn;

  ////////// 界面字体
  wx.loadFontFace = wx.loadFontFace || emptyFn;

  ////////// 下拉刷新
  // wx.stopPullDownRefresh = my.stopPullDownRefresh
  wx.startPullDownRefresh = wx.startPullDownRefresh || emptyFn;

  ////////// 滚动
  const { pageScrollTo } = wx;
  wx.pageScrollTo = function(opt) {
    opt.success = opt.success || emptyFn;
    opt.fail = opt.fail || emptyFn;

    try {
      pageScrollTo(opt);
      opt.success({ errMsg: 'pageScrollTo:ok' });
    } catch (e) {
      opt.fail(e);
    }
  };

  ///////// 动画
  // wx.createAnimation = my.createAnimation

  //////////置顶
  wx.setTopBarText = wx.setTopBarText || emptyFn;

  ///////// 自定义组价
  wx.nextTick = wx.nextTick || emptyFn;

  ////////菜单
  wx.getMenuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect || emptyFn;

  ////////窗口
  wx.onWindowResize = wx.onWindowResize || emptyFn;
  wx.offWindowResize = wx.offWindowResize || emptyFn;

  ////////网络 发起请求
  wx.request = function(opt) {
    opt.headers = opt.header || opt.headers || {};
    opt.headers.referer = '';
    opt.headers['content-type'] = opt.headers['content-type'] || 'application/json';

    const success = opt.success || emptyFn;
    opt.success = function(res) {
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
  const { downloadFile } = wx;
  wx.downloadFile = function(opt) {
    const success = opt.success || emptyFn;
    const downTask = downloadFile(Object.assign({}, opt, {
      success(res) {
        res.tempFilePath = res.apFilePath;
        res.statusCode = 200;
        success(res);
      }
    }));

    const methods = ['abort', 'offHeadersReceived', 'offProgressUpdate', 'onHeadersReceived', 'onProgressUpdate'];
    methods.forEach((method) => {
      downTask[method] = downTask[method] || emptyFn;
    });

    return downTask;
  };

  ///////上传
  const { uploadFile } = wx;
  wx.uploadFile = function(opt) {
    const paths = opt.filePath.split(/[/\\]/);
    const fileName = paths[paths.length - 1];
    const isImg = /\.(png|jpg|jpeg|gif|webp)/i.test(fileName);
    const isVideo = /\.(mp4|mov|WMV|3GP|FLV|RMVB|WebM|AVI|ASF|MPEG|MPG|DAT|MKV)/i.test(fileName);
    const fileType = isImg ? 'image' : (isVideo ? 'video' : 'audio');

    opt = Object.assign({}, opt, {
      fileName,
      fileType,
    });

    const uploadTask = uploadFile(opt);
    const methods = ['abort', 'offHeadersReceived', 'offProgressUpdate', 'onHeadersReceived', 'onProgressUpdate'];
    methods.forEach((method) => {
      uploadTask[method] = uploadTask[method] || emptyFn;
    });
    return uploadTask;
  };

  ///////websocket
  const { connectSocket } = wx;
  wx.connectSocket = function(...params) {
    setTimeout(() => {
      // 处理onOpen回调无法触发的问题
      connectSocket.apply(this, params);
    }, 100);

    return {
      send(...args) {
        wx.sendSocketMessage.apply(this, args);
      },
      close(...args) {
        wx.closeSocket.apply(this, args);
      },
      onOpen(cb) {
        wx.onSocketOpen(cb);
      },
      onClose(cb) {
        wx.onSocketClose(cb);
      },
      onError(cb) {
        wx.onSocketError(cb);
      },
      onMessage(cb) {
        wx.onSocketMessage(cb);
      }
    };
  };

  //////////mDns
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

  //////////数据缓存
  const { getStorage } = wx;
  wx.getStorage = function(opt) {
    const { success } = opt;
    opt.success = function(res) {
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
  const { createMapContext } = wx;
  wx.createMapContext = function(opt) {
    const mapContext = createMapContext(opt);
    const attrs = ['getRegion', 'getScale', 'includePoints'];
    attrs.forEach((attr) => {
      mapContext[attr] = mapContext[attr] || emptyFn;
    });
    return mapContext;
  };

  ////////图片
  // wx.getImageInfo = my.getImageInfo
  const { getImageInfo } = wx;
  wx.getImageInfo = function(opt) {
    const { success } = opt;
    return getImageInfo.call(this, Object.assign({}, opt, {
      success(res) {
        res.type = res.type.substring(0, res.type.indexOf('?'));
        success(res);
      }
    }));
  };

  wx.saveImageToPhotosAlbum = function(opt) {
    return wx.saveImage(Object.assign({}, opt, {
      url: opt.filePath,
      success(res) {
        res.errMsg = "saveImageToPhotosAlbum:ok";
        opt.success && opt.success(res);
      }
    }));
  };

  const { previewImage } = wx;
  wx.previewImage = function(opt) {
    const params = paramsMap(opt);
    let { current } = params;

    if (current) {
      current = opt.urls.indexOf(current);
    }

    if (current === -1 || !current) {
      current = 0;
    }

    params.current = current;

    return previewImage.call(this, params);
  };

  const { compressImage } = wx;
  wx.compressImage = function(opt) {
    const { src } = opt;
    const success = opt.success || emptyFn;
    return compressImage.call(this, Object.assign({}, opt, {
      compressLevel: 4,
      apFilePaths: [src],
      success(res) {
        res.tempFilePath = res.apFilePaths[0] || "";
        success(res);
      }
    }));
  };

  wx.chooseMessageFile = wx.chooseMessageFile || emptyFn;
  const { chooseImage } = wx;
  wx.chooseImage = function(opt) {
    const success = opt.success || emptyFn;
    opt.count = opt.count || 9;

    return chooseImage.call(this, Object.assign({}, opt, {
      success(res) {
        const tempFilePaths = [].concat(res.apFilePaths);
        const arr = res.apFilePaths.map(item => ({
          path: item,
          size: null
        }));
        const tempFiles = [].concat(arr);
        success({ tempFilePaths, tempFiles });
      }
    }));
  };

  //////////视频
  wx.saveVideoToPhotosAlbum = wx.saveVideoToPhotosAlbum || emptyFn;
  wx.createVideoContext = wx.createVideoContext || emptyFn;
  wx.chooseVideo = wx.chooseVideo || emptyFn;

  ///////////音频
  wx.stopVoice = wx.stopVoice || emptyFn;
  wx.setInnerAudioOption = wx.setInnerAudioOption || emptyFn;
  wx.playVoice = wx.playVoice || emptyFn;
  wx.pauseVoice = wx.pauseVoice || emptyFn;
  wx.getAvailableAudioSources = wx.getAvailableAudioSources || emptyFn;
  wx.createInnerAudioContext = wx.createInnerAudioContext || emptyFn;

  ////////背景音频
  wx.createAudioContext = wx.createAudioContext || emptyFn;

  wx.stopBackgroundAudio = wx.stopBackgroundAudio || emptyFn;
  wx.seekBackgroundAudio = wx.seekBackgroundAudio || emptyFn;
  wx.playBackgroundAudio = wx.playBackgroundAudio || emptyFn;
  wx.pauseBackgroundAudio = wx.pauseBackgroundAudio || emptyFn;
  wx.onBackgroundAudioStop = wx.onBackgroundAudioStop || emptyFn;
  wx.onBackgroundAudioPlay = wx.onBackgroundAudioPlay || emptyFn;
  wx.onBackgroundAudioPause = wx.onBackgroundAudioPause || emptyFn;
  wx.getBackgroundAudioPlayerState = wx.getBackgroundAudioPlayerState || emptyFn;
  wx.getBackgroundAudioManager = wx.getBackgroundAudioManager || emptyFn;

  ////////////实时音视频
  wx.createLivePusherContext = wx.createLivePusherContext || emptyFn;
  wx.createLivePlayerContext = wx.createLivePlayerContext || emptyFn;

  //////////录音
  wx.stopRecord = wx.stopRecord || emptyFn;
  wx.startRecord = wx.startRecord || emptyFn;
  wx.getRecorderManager = wx.getRecorderManager || emptyFn;

  //////////相机
  wx.createCameraContext = wx.createCameraContext || emptyFn;

  //////////位置
  // wx.chooseLocation = my.chooseLocation
  const { openLocation } = wx;
  wx.openLocation = function(opt) {
    if (typeof opt.name === 'undefined') {
      opt.name = '位置';
    }
    if (typeof opt.address === 'undefined') {
      opt.address = "-";
    }
    return openLocation.call(this, opt);
  };

  // res无speed、accuracy、altitude、verticalAccuracy、horizontalAccuracy
  const { getLocation } = wx;
  wx.getLocation = function(opt) {
    return getLocation(Object.assign({}, opt, {
      type: 0
    }));
  };

  //////////分享
  // wx.hideShareMenu = my.hideShareMenu
  wx.updateShareMenu = wx.updateShareMenu || emptyFn;
  wx.getShareInfo = wx.getShareInfo || emptyFn;
  wx.showShareMenu = wx.showShareMenu || emptyFn;

  /////////画布
  const { createCanvasContext } = wx;
  wx.createCanvasContext = function(opt) {
    const canvasContext = createCanvasContext.call(this, opt);
    canvasContext.arcTo = canvasContext.arcTo || (() => canvasContext);
    canvasContext.createPattern = canvasContext.createPattern || (() => canvasContext);
    canvasContext.strokeText = canvasContext.strokeText || (() => canvasContext);
    canvasContext.miterLimit = canvasContext.setMiterLimit;
    canvasContext.lineCap = canvasContext.setLineCap;
    canvasContext.lineDashOffset = canvasContext.setLineDash;
    canvasContext.lineJoin = canvasContext.setLineJoin;
    return canvasContext;
  };

  wx.canvasToTempFilePath = function(opt) {
    const canvasContext = wx.createCanvasContext(opt.canvasId);
    const success = opt.success || emptyFn;
    canvasContext.toTempFilePath(Object.assign({}, opt, {
      success(res) {
        res.tempFilePath = res.apFilePath;
        success(res);
      }
    }));
  };

  wx.canvasPutImageData = function(opt) {
    const canvasContext = wx.createCanvasContext(opt.canvasId);
    canvasContext.putImageData(opt);
  };

  wx.canvasGetImageData = function(opt) {
    const canvasContext = wx.createCanvasContext(opt.canvasId);
    canvasContext.getImageData(opt);
  };

  //////////文件
  const { saveFile } = wx;
  wx.saveFile = function(opt) {
    const success = opt.success || emptyFn;
    const apFilePath = opt.tempFilePath;
    return saveFile.call(this, Object.assign({}, opt, {
      apFilePath,
      success(res) {
        res.savedFilePath = res.apFilePath;
        success(res);
      }
    }));
  };

  const { removeSavedFile } = wx;
  wx.removeSavedFile = function(opt) {
    return removeSavedFile.call(this, paramsMap(opt, {
      filePath: 'apFilePath'
    }));
  };

  const { getSavedFileList } = wx;
  wx.getSavedFileList = function(opt) {
    const success = opt.success || emptyFn;
    return getSavedFileList.call(this, Object.assign({}, opt, {
      success(res) {
        res && res.fileList.map(item => {
          item.filePath = item.apFilePath;
          return item;
        });
        success(res);
      }
    }));
  };

  const { getSavedFileInfo } = wx;
  wx.getSavedFileInfo = function(opt) {
    return getSavedFileInfo.call(this, paramsMap(opt, {
      filePath: "apFilePath"
    }));
  };

  const { getFileInfo } = wx;
  wx.getFileInfo = function(opt) {
    return getFileInfo.call(this, paramsMap(opt, {
      filePath: 'apFilePath'
    }));
  };

  wx.getFileSystemManager = wx.getFileSystemManager || emptyFn;

  //////////设备
  /////////iBeacon
  // wx.stopBeaconDiscovery = my.stopBeaconDiscovery
  // wx.startBeaconDiscovery = my.startBeaconDiscovery
  // wx.onBeaconUpdate = my.onBeaconUpdate
  // wx.onBeaconServiceChange = my.onBeaconServiceChange
  // wx.getBeacons = my.getBeacons

  //////////wifi
  wx.stopWifi = wx.stopWifi || emptyFn;
  wx.startWifi = wx.startWifi || emptyFn;
  wx.setWifiList = wx.setWifiList || emptyFn;
  wx.onWifiConnected = wx.onWifiConnected || emptyFn;
  wx.onGetWifiList = wx.onGetWifiList || emptyFn;
  wx.getWifiList = wx.getWifiList || emptyFn;
  wx.getConnectedWifi = wx.getConnectedWifi || emptyFn;
  wx.connectWifi = wx.connectWifi || emptyFn;

  ///////////低功耗蓝牙
  // wx.readBLECharacteristicValue = my.readBLECharacteristicValue
  // wx.onBLECharacteristicValueChange = my.onBLECharacteristicValueChange
  // wx.notifyBLECharacteristicValueChange = my.notifyBLECharacteristicValueChange
  // wx.getBLEDeviceServices = my.getBLEDeviceServices
  // wx.getBLEDeviceCharacteristics = my.getBLEDeviceCharacteristics
  // wx.writeBLECharacteristicValue = my.writeBLECharacteristicValue
  wx.onBLEConnectionStateChange = wx.onBLEConnectionStateChanged;
  wx.createBLEConnection = wx.connectBLEDevice;
  wx.closeBLEConnection = wx.disconnectBLEDevice;

  //////////蓝牙
  // wx.stopBluetoothDevicesDiscovery = my.stopBluetoothDevicesDiscovery
  // wx.startBluetoothDevicesDiscovery = my.startBluetoothDevicesDiscovery
  // wx.openBluetoothAdapter = my.openBluetoothAdapter
  // wx.onBluetoothDeviceFound = my.onBluetoothDeviceFound
  // wx.onBluetoothAdapterStateChange = my.onBluetoothAdapterStateChange
  // wx.getConnectedBluetoothDevices = my.getConnectedBluetoothDevices
  // wx.getBluetoothDevices = my.getBluetoothDevices
  // wx.getBluetoothAdapterState = my.getBluetoothAdapterState
  // wx.closeBluetoothAdapter = my.closeBluetoothAdapter

  /////////联系人
  // wx.addPhoneContact = my.addPhoneContact

  /////////电量
  wx.getBatteryInfoSync = wx.getBatteryInfoSync || emptyFn;
  wx.getBatteryInfo = wx.getBatteryInfo || emptyFn;

  ////////剪贴板
  wx.setClipboardData = function(opt) {
    return wx.setClipboard(paramsMap(opt, {
      data: 'text'
    }));
  };

  wx.getClipboardData = function(opt) {
    const { success } = opt;
    return wx.getClipboard(Object.assign({}, opt, {
      success(res) {
        res.data = res.text;
        success(res);
      }
    }));
  };

  ///////////nfc
  wx.stopHCE = wx.stopHCE || emptyFn;
  wx.startHCE = wx.startHCE || emptyFn;
  wx.sendHCEMessage = wx.sendHCEMessage || emptyFn;
  wx.onHCEMessage = wx.onHCEMessage || emptyFn;
  wx.getHCEState = wx.getHCEState || emptyFn;

  //////////网络
  //getNetworkType
  const { getNetworkType } = wx;
  wx.getNetworkType = function(opt) {
    const success = opt.success || emptyFn;
    return getNetworkType(Object.assign({}, opt, {
      success(res) {
        res.networkType = res.networkType.toLocaleLowerCase();
        success(res);
      }
    }));
  };

  const { onNetworkStatusChange } = wx;
  wx.onNetworkStatusChange = function(fn) {
    return onNetworkStatusChange((res) => {
      res.networkType = res.networkType.toLocaleLowerCase();
      fn(res);
    });
  };

  ////////屏幕
  // wx.setScreenBrightness = my.setScreenBrightness
  // wx.setKeepScreenOn = my.setKeepScreenOn
  // wx.getScreenBrightness = my.getScreenBrightness
  // wx.onUserCaptureScreen = my.onUserCaptureScreen

  //////////电话
  const { makePhoneCall } = wx;
  wx.makePhoneCall = function(opt) {
    return makePhoneCall.call(this, paramsMap(opt, {
      phoneNumber: 'number'
    }));
  };

  /////////加速器
  // wx.onAccelerometerChange = my.onAccelerometerChange
  wx.startAccelerometer = wx.startAccelerometer || emptyFn;
  wx.stopAccelerometer = wx.offAccelerometerChange;

  ////////罗盘
  // wx.onCompassChange = my.onCompassChange 缺少accuracy
  wx.stopCompass = wx.offCompassChange;
  wx.startCompass = wx.startCompass || emptyFn;

  /////////设备方向
  wx.stopDeviceMotionListening = wx.stopDeviceMotionListening || emptyFn;
  wx.startDeviceMotionListening = wx.startDeviceMotionListening || emptyFn;
  wx.onDeviceMotionChange = wx.onDeviceMotionChange || emptyFn;

  // 陀螺仪
  // wx.onGyroscopeChange = my.onGyroscopeChange
  wx.stopGyroscope = wx.offGyroscopeChange;
  wx.startGyroscope = wx.startGyroscope || emptyFn;

  // 性能
  wx.onMemoryWarning = wx.onMemoryWarning || emptyFn;

  // 扫码
  wx.scanCode = function(opt) {
    const typeMap = {
      qrCode: "qr",
      barCode: "bar"
    };
    const success = opt.success || emptyFn;
    return wx.scan(Object.assign({}, opt, {
      hideAlbum: typeof opt.onlyFromCamera === 'undefined' ? true : opt.onlyFromCamera,
      type: typeof opt.scanType === 'undefined' ? "qr" : typeMap[opt.scanType[0]],
      success(res) {
        let scanType = "";
        if (res.qrCode) {
          scanType = "QR_CODE";
        } else if (res.barCode) {
          scanType = "BAR_CODE";
        }
        success({
          result: res.code,
          scanType,
          errMsg: "scanCode:ok"
        });
      }
    }));
  };

  // 震动
  // wx.vibrateShort = my.vibrateShort
  // wx.vibrateLong = my.vibrateLong

  /////////worker
  wx.createWorker = wx.createWorker || emptyFn;

  /////////第三方平台
  wx.getExtConfigSync = wx.getExtConfigSync || emptyFn;
  wx.getExtConfig = wx.getExtConfig || emptyFn;

  // WXML
  // 查找元素 返回的只有SelectorQuery对象
  // SelectorQuery对象只有.exec .select .selectAll .selectViewport 方法
  const { createSelectorQuery } = wx;
  wx.createSelectorQuery = function(...args) {
    const query = createSelectorQuery.apply(this, args);
    query.in = query.in || function() {
      return query;
    };
    return query;
  };

  wx.createIntersectionObserver = wx.createIntersectionObserver || emptyFn;

  //////////// 开放接口
  // wx.navigateBackMiniProgram = my.navigateBackMiniProgram
  // wx.navigateToMiniProgram = my.navigateToMiniProgram
  wx.login = (o) => {
    const bak = {
      success: o.success,
      fail: o.fail,
      complete: o.complete
    };
    o.success = function(res) {
      res.code = res.authCode;
      delete res.authCode;
      bak.success && bak.success(res);
    };
    return wx.getAuthCode(o);
  };

  wx.checkSession = wx.checkSession || emptyFn;

  const { getAuthUserInfo } = wx;
  wx.getUserInfo = (o) => {
    const bak = {
      success: o.success,
      fail: o.fail,
      complete: o.complete
    };

    o.success = function(res) {
      const rst = {};
      Object.keys(res).forEach((k) => {
        rst[k === 'avatar' ? 'avatarUrl' : k] = res[k];
      });

      bak.success && bak.success({
        userInfo: rst
      });
    };

    return getAuthUserInfo(o);
  };

  // 发起支付
  const requestPayment = wx.tradePay;
  wx.requestPayment = function(opt) {
    const params = paramsMap(opt, {
      alipay_trade_body: 'orderStr'
    });

    const success = params.success || emptyFn;
    const fail = params.fail || emptyFn;

    params.success = function(res) {
      if (res.resultCode === 9000) {
        success();
      } else {
        fail();
      }
    };

    return requestPayment.call(this, params);
  };

  wx.getAccountInfoSync = wx.getAccountInfoSync || emptyFn;
  wx.reportMonitor = wx.reportMonitor || emptyFn;
  wx.reportAnalytics = wx.reportAnalytics || emptyFn;
  wx.getWeRunData = wx.getWeRunData || emptyFn;
  wx.authorize = wx.authorize || emptyFn;
  wx.startSoterAuthentication = wx.startSoterAuthentication || emptyFn;
  wx.checkIsSupportSoterAuthentication = wx.checkIsSupportSoterAuthentication || emptyFn;
  wx.checkIsSoterEnrolledInDevice = wx.checkIsSoterEnrolledInDevice || emptyFn;
  wx.chooseInvoiceTitle = wx.chooseInvoiceTitle || emptyFn;
  wx.chooseInvoice = wx.chooseInvoice || emptyFn;
  wx.addCard = wx.addCard || emptyFn;
  wx.openCard = wx.openCard || emptyFn;
  wx.chooseAddress = wx.chooseAddress || emptyFn;

  // 设置
  // authSetting 缺少address，invoiceTitle，invoice，werun
  const { getSetting } = wx;
  wx.getSetting = function(opt) {
    const success = opt.success || emptyFn;
    return getSetting(Object.assign({}, opt, {
      success(res) {
        res.authSetting["scope.userLocation"] = res.authSetting['scope.location'];
        res.authSetting["scope.writePhotosAlbum"] = res.authSetting['scope.album'];
        res.authSetting["scope.record"] = res.authSetting['scope.audioRecord'];
        success(res);
      }
    }));
  };

  const { openSetting } = wx;
  wx.openSetting = function(opt) {
    const success = opt.success || emptyFn;
    return openSetting(Object.assign({}, opt, {
      success(res) {
        res.authSetting["scope.userLocation"] = res.authSetting['scope.location'];
        res.authSetting["scope.writePhotosAlbum"] = res.authSetting['scope.album'];
        res.authSetting["scope.record"] = res.authSetting['scope.audioRecord'];
        success(res);
      }
    }));
  };

  return wx;
}

export default getInstance();
