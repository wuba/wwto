module.exports = [
  // 界面
  'showTabBarRedDot',
  'setTabBarStyle',
  'setTabBarItem',
  'setTabBarBadge',
  'removeTabBarBadge',
  'hideTabBarRedDot',

  // 界面字体
  'loadFontFace',

  // 下拉刷新
  'startPullDownRefresh',

  // 置顶
  'setTopBarText',

  // 自定义组价
  'nextTick',

  // 菜单
  'getMenuButtonBoundingClientRect',

  // 窗口
  'onWindowResize',
  'offWindowResize',

  // dns
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

  // 视频
  'saveVideoToPhotosAlbum',

  // 选择
  'chooseVideo',
  'chooseMessageFile',

  // 音频
  'stopVoice',
  'setInnerAudioOption',
  'playVoice',
  'pauseVoice',
  'getAvailableAudioSources',
  'createInnerAudioContext',
  'createAudioContext',
  'stopBackgroundAudio',
  'seekBackgroundAudio',
  'playBackgroundAudio',
  'pauseBackgroundAudio',
  'onBackgroundAudioStop',
  'onBackgroundAudioPlay',
  'onBackgroundAudioPause',
  'getBackgroundAudioPlayerState',
  'getBackgroundAudioManager',

  // 实时音视频
  'createLivePusherContext',
  'createLivePlayerContext',

  // 录音
  'stopRecord',
  'startRecord',
  'getRecorderManager',

  // 相机
  'createCameraContext',

  // 分享
  'updateShareMenu',
  'getShareInfo',
  'showShareMenu',

  'getFileSystemManager',

  // wifi
  'stopWifi',
  'startWifi',
  'setWifiList',
  'onWifiConnected',
  'onGetWifiList',
  'getWifiList',
  'getConnectedWifi',
  'connectWifi',

  // 电量
  'getBatteryInfoSync',
  'getBatteryInfo',


  // nfc
  'stopHCE',
  'startHCE',
  'sendHCEMessage',
  'onHCEMessage',
  'getHCEState',

  // 加速器
  'startAccelerometer',
  'startCompass',

  // 设备方向
  'stopDeviceMotionListening',
  'startDeviceMotionListening',
  'onDeviceMotionChange',
  'startGyroscope',

  // 性能
  'onMemoryWarning',

  // worker
  'createWorker',


  // 第三方平台
  'getExtConfigSync',
  'getExtConfig',

  'createIntersectionObserver',

  'checkSession',

  'getAccountInfoSync',
  'reportMonitor',
  'reportAnalytics',
  'getWeRunData',
  'authorize',
  'startSoterAuthentication',
  'checkIsSupportSoterAuthentication',
  'checkIsSoterEnrolledInDevice',
  'chooseInvoiceTitle',
  'chooseInvoice',
  'addCard',
  'openCard',
  'chooseAddress'
];