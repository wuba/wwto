module.exports = [
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

  // 媒体
  'chooseMessageFile',
  'compressImage',

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

  // 音频
  'stopVoice',
  'playVoice',
  'pauseVoice',
  'getAvailableAudioSources',
  'createAudioContext',

  // 实时音视频
  'createLivePusherContext',

  // 文件
  'getFileSystemManager',

  // 字体
  'loadFontFace',

  'setTopBarText',
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
  'getConnectedWifi',
  'connectWifi',

  // 小程序声明周期
  'getLaunchOptionsSync',

  // 应用级事件
  'onPageNotFound',
  'onError',
  'onAudioInterruptionBegin',
  'onAppShow',
  'onAppHide',
  'offPageNotFound',
  'offError',
  'offAudioInterruptionBegin',
  'offAppShow',
  'offAppHide',
  'offAudioInterruptionEnd',
  'onAudioInterruptionEnd',

  // 发票
  'chooseInvoice',

  // 账号信息
  'getAccountInfoSync',

  // 数据上报
  'reportMonitor',

  // 支付
  'requestPayment',

  // 卡券
  'openCard',
  'addCard',
  'startSoterAuthentication',
  'checkIsSupportSoterAuthentication',
  'checkIsSoterEnrolledInDevice',

  // 转发
  'updateShareMenu',
  'showShareMenu',
  'hideShareMenu',
  'getShareInfo',

  // worker
  'createWorker'
];