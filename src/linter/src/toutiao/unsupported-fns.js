module.exports = [

  // WebSocket
  'sendSocketMessage',
  'onSocketOpen',
  'onSocketMessage',
  'onSocketError',
  'onSocketClose',
  'closeSocket',

  // mDNS
  'stopLocalServiceDiscovery',
  'startLocalServiceDiscovery',
  'onLocalServiceResolveFail',
  'onLocalServiceLost',
  'onLocalServiceFound',
  'onLocalServiceDiscoveryStop',
  'offLocalServiceResolveFail',
  'offLocalServiceLost',
  'offLocalServiceFound',
  'offLocalServiceDiscoveryStop',

  'hideKeyboard',

  // 媒体

  // 图片
  'chooseMessageFile',
  'compressImage',
  'getImageInfo',

  // 视频

  'createVideoContext',

  // 地图

  'createMapContext',

  // 录音
  'stopRecord',
  'startRecord',

  // 背景音乐
  'stopBackgroundAudio',
  'seekBackgroundAudio',
  'playBackgroundAudio',
  'pauseBackgroundAudio',
  'onBackgroundAudioStop',
  'onBackgroundAudioPlay',
  'onBackgroundAudioPause',
  'getBackgroundAudioPlayerState',
  'getBackgroundAudioManager',

  // 音频
  'stopVoice',
  'playVoice',
  'pauseVoice',
  'getAvailableAudioSources',
  'createAudioContext',
  'setInnerAudioOption',

  // 实时音视频
  'createLivePusherContext',
  'createLivePlayerContext',

  // 相机

  'createCameraContext',

  // 文件
  'getFileSystemManager',
  'removeSavedFile',
  'openDocument',
  'getSavedFileList',
  'getSavedFileInfo',
  'getFileInfo',

  // 字体
  'loadFontFace',

  // 自定义组件
  'nextTick',

  // 置顶
  'setTopBarText',
  // 菜单
  'getMenuButtonBoundingClientRect',

  // 窗口
  'onWindowResize',
  'offWindowResize',

  // 陀螺仪
  'onGyroscopeChange',
  'stopGyroscope',
  'startGyroscope',

  // 设备方法
  'onDeviceMotionChange',
  'startDeviceMotionListening',
  'stopDeviceMotionListening',

  // NFC
  'stopHCE',
  'startHCE',
  'sendHCEMessage',
  'onHCEMessage',
  'getHCEState',

  // 电量
  'getBatteryInfoSync',
  'getBatteryInfo',

  // 蓝牙
  'stopBluetoothDevicesDiscovery',
  'startBluetoothDevicesDiscovery',
  'openBluetoothAdapte',
  'onBluetoothDeviceFound',
  'onBluetoothAdapterStateChange',
  'getConnectedBluetoothDevices',
  'getBluetoothDevices',
  'getBluetoothAdapterState',
  'closeBluetoothAdapter',

  // 低功耗蓝牙
  'readBLECharacteristicValue',
  'onBLEConnectionStateChange',
  'onBLECharacteristicValueChange',
  'notifyBLECharacteristicValueChange',
  'getBLEDeviceServices',
  'getBLEDeviceCharacteristics',
  'createBLEConnection',
  'closeBLEConnection',
  'writeBLECharacteristicValue',

  // iBeacon
  'stopBeaconDiscovery',
  'startBeaconDiscovery',
  'onBeaconUpdate',
  'onBeaconServiceChange',
  'getBeacons',

  // wifi
  'stopWifi',
  'startWifi',
  'setWifiList',
  'onWifiConnected',
  'onGetWifiList',
  'getWifiList',
  'connectWifi',

  // 小程序声明周期
  'getLaunchOptionsSync',

  // 应用级事件
  'onPageNotFound',
  'onError',
  'onAudioInterruptionBegin',
  'onAudioInterruptionEnd',
  'onAppShow',
  'onAppHide',
  'offPageNotFound',
  'offError',
  'offAudioInterruptionBegin',
  'offAudioInterruptionEnd',
  'offAppShow',
  'offAppHide',

  // 发票
  'chooseInvoice',
  'chooseInvoiceTitle',


  // 账号信息
  'getAccountInfoSync',

  // 数据上报
  'reportMonitor',

  // 支付
  'requestPayment',

  // 卡券
  'openCard',
  'addCard',

  // 生物认证
  'startSoterAuthentication',
  'checkIsSupportSoterAuthentication',
  'checkIsSoterEnrolledInDevice',

  // 转发
  'updateShareMenu',
  'getShareInfo',

  // worker
  'createWorker',

  // 屏幕亮度

  'setScreenBrightness',
  'onUserCaptureScreen',
  'getScreenBrightness',

  // 联系人
  'addPhoneContact',

  // 性能
  'onMemoryWarning',

  // 画布
  'canvasGetImageData',
  'canvasPutImageData',

  // 背景
  'setBackgroundTextStyle',
  'setBackgroundColor',

  // Tab-Bar
  'showTabBarRedDot',
  'showTabBar',
  'setTabBarStyle',
  'setTabBarItem',
  'setTabBarBadge',
  'removeTabBarBadge',
  'hideTabBarRedDot',
  'hideTabBar',

  // 第三方平台

  'getExtConfig',
  'getExtConfigSyn',

  // 登录
  'login',
  'checkSession',

  // 小程序跳转
  'navigateToMiniProgram',
  'navigateBackMiniProgram',

  // 用户信息
 'getUserInfo',

  // 数据分析
  'reportAnalytics',

  // 授权
  'authorize',

  // 设置

  'openSetting',
  'getSetting',

  // 收货地址
  'chooseAddres',

  // 微信运动
  'getWeRunData',

  // 基础
  'canIUse',

  // 更新
  'getUpdateManager',

  // 调试
  'setEnableDebug',
  'getLogManager'





];