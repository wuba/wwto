/* eslint-disable no-global-assign */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
const emptyFn = () => {};

function ignoreFn(opt) {
  if (opt) {
    if (opt.success) {
      opt.success();
    } else if (opt.complete) {
      opt.complete();
    } else if (opt.fail) {
      opt.fail();
    }
  }
}

function getInstance() {
  var wx = tt;

  if (wx.has_toutiao_hook_flag) return;

  wx.has_toutiao_hook_flag = true;

  wx.hideKeyboard = wx.hideKeyboard || emptyFn;

  const bakSetTimeout = setTimeout;
  setTimeout = function(fn, timeout) {
    return bakSetTimeout.call(this, fn, Math.floor(timeout || 0));
  };

  const bakSetInterval = setInterval;
  setInterval = function(fn, timeout) {
    return bakSetInterval.call(this, fn, Math.floor(timeout || 0));
  };

  const bakSetClearTimeout = clearTimeout;
  clearTimeout = function(opt){
    return bakSetClearTimeout.call(this, opt);
  };

  const bakSetClearInterval = clearInterval;
  clearInterval = function(opt){
    return bakSetClearInterval.call(this, opt);
  };

  //// 网络
  // request(请求)
  // 注意事项
  // 1.头条文档中该api没有指明success、fail、complete,但是示例中有这三个参数
  // 2.头条文档中未对参数object.method 的合法值、object.dataType 的合法值、object.responseType 的合法值、以及data 参数做具体说明

  const request = wx.request;
  wx.request = (opt) => {
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

    // 处理requestTask对象字段(onHeadersReceived、offHeadersReceived、abort)缺失
    const requestTask = request.call(this, opt);
    const methods = ['onHeadersReceived', 'offHeadersReceived', 'abort'];
    methods.forEach((method) => {
      requestTask[method] = requestTask[method] || emptyFn;
    });
    return requestTask;
  };

  // uploadFile(上传)
  // 注意事项
  // 1.头条文档中该api没有指明success、fail、complete,但是示例中有这三个参数

  const {uploadFile} = wx;
  wx.uploadFile = function (opt) {
    const uploadTask = uploadFile.call(this, opt);
    // 处理uploadTask对象字段(offHeadersReceived、offProgressUpdate、onHeadersReceived)缺失问题
    const methods = ['abort', 'offHeadersReceived', 'offProgressUpdate', 'onHeadersReceived', 'onProgressUpdate'];
    methods.forEach((method) => {
      uploadTask[method] = uploadTask[method] || emptyFn;
    });

    return uploadTask;
  };

  // downloadFile
  // 注意事项
  // 1.头条文档中该api没有指明filePath、success、fail、complete(但是示例中有后面这三个参数)

  const {downloadFile} = wx;
  wx.downloadFile = function (opt) {
    const uploadTask = downloadFile.call(this, opt);
    // 处理downloadTask对象字段(offHeadersReceived、offProgressUpdate、onHeadersReceived)缺失问题
    const methods = ['abort', 'offHeadersReceived', 'offProgressUpdate', 'onHeadersReceived', 'onProgressUpdate'];
    methods.forEach((method) => {
      uploadTask[method] = uploadTask[method] || emptyFn;
    });
    return uploadTask;
  };

  // WebSocket
  // connectSocket(创建一个WebSocket连接实例)
  // 注意事项
  // 1.头条文档中该api没有指明参数tcpNoDelay、success、fail、complete
  // 2.头条中SocketTask.send、SocketTask.close方法参数未指明success、fail、complete
  // 3.头条中SocketTask.onOpen、SocketTask.onError未指明该方法的返回值内容,微信中分别是res.header(连接成功的 HTTP 响应 Header)、res.errMsg(错误信息)

  // wx.connectSocket = wx.connectSocket

  wx.sendSocketMessage = wx.sendSocketMessage || ignoreFn;
  wx.onSocketOpen = wx.onSocketOpen || emptyFn;
  wx.onSocketMessage = wx.onSocketMessage || emptyFn;
  wx.onSocketError = wx.onSocketError || emptyFn;
  wx.onSocketClose = wx.onSocketClose || emptyFn;
  wx.closeSocket = wx.closeSocket || ignoreFn;

  // mDNS
  wx.stopLocalServiceDiscovery = wx.stopLocalServiceDiscovery || ignoreFn;
  wx.startLocalServiceDiscovery = wx.startLocalServiceDiscovery || ignoreFn;
  wx.onLocalServiceResolveFail = wx.onLocalServiceResolveFail || emptyFn;
  wx.onLocalServiceLost = wx.onLocalServiceLost || emptyFn;
  wx.onLocalServiceFound = wx.onLocalServiceFound || emptyFn;
  wx.onLocalServiceDiscoveryStop = wx.onLocalServiceDiscoveryStop || emptyFn;
  wx.offLocalServiceResolveFail = wx.offLocalServiceResolveFail || emptyFn;
  wx.offLocalServiceLost = wx.offLocalServiceLost || emptyFn;
  wx.offLocalServiceFound = wx.offLocalServiceFound || emptyFn;
  wx.offLocalServiceDiscoveryStop = wx.offLocalServiceDiscoveryStop || emptyFn;

  //// 媒体

  // 图片
  // chooseImage(从本地相册选择图片或使用相机拍照)
  // 注意事项
  // 1.头条文档中该api没有指明参数sizeType、success、fail、complete(示例中有后面三个参数)
  // 2.头条文档中未对success回调返回值res.tempFiles的结构做具体说明(demo中校验res.tempFiles的结构包括path和size)
  // 3.头条中iOS 暂不支持同时从album和camera中选择，只能二者其一，当都传时使用album;暂不支持sizeType参数

  // wx.chooseImage = wx.chooseImage

  // saveImageToPhotosAlbum(保存图片到系统相册)
  // 注意事项
  // 1.头条文档中该api没有指明参数success、fail、complete(但是示例中有后面三个参数)

  // wx.saveImageToPhotosAlbum = wx.saveImageToPhotosAlbum

  // previewImage(预览图片)
  // 注意事项
  // 1.头条文档中该api没有指明参数success、fail、complete(但是示例中有后面三个参数)

  // wx.previewImage = wx.previewImage

  wx.getImageInfo = wx.getImageInfo || ignoreFn;
  wx.compressImage = wx.compressImage || ignoreFn;
  wx.chooseMessageFile = wx.chooseMessageFile || ignoreFn;

  // 录音
  // getRecorderManager
  // 注意事项
  // 1.wx.getRecorderManager的返回值recorderManager对象中的start方法没有指明参数audioSource,且参数sampleRate的默认值在头条中是44100,
  // 微信中是8000;参数numberOfChannels的默认值在头条中是1,微信中是2;参数encodeBitRate在头条中是``,微信中是48000;参数format的默认值在头条中是
  // mp3,微信中是aac;参数frameSize在头条中是``,微信中没有指明
  // 2.start方法暂不支持audioSource参数

  const recorderManager = wx.getRecorderManager;
  wx.getRecorderManager = function(opt){
    const recorderManagers = recorderManager.call(this, opt);
    // 处理recorderManager对象字段(onResume、onInterruptionBegin、onInterruptionEnd)缺失问题
    const methods = ['onInterruptionBegin', 'onInterruptionEnd', 'onResume'];
    methods.forEach((method) => {
      recorderManagers[method] = recorderManagers[method] || emptyFn;
    });

    return recorderManagers;
  };

  wx.stopRecord = wx.stopRecord || emptyFn;
  wx.startRecord = wx.startRecord || ignoreFn;

  // 音频
  // createInnerAudioContext
  // 注意事项  wx.createInnerAudioContext的返回值innerAudioContext对象中的onError方法中头条未指明该方法返回值
  // wx.createInnerAudioContext = wx.createInnerAudioContext

  wx.stopVoice = wx.stopVoice || ignoreFn;
  wx.setInnerAudioOption = wx.setInnerAudioOption || ignoreFn;
  wx.playVoice = wx.playVoice || ignoreFn;
  wx.pauseVoice = wx.pauseVoice || ignoreFn;
  wx.getAvailableAudioSources = wx.getAvailableAudioSources || ignoreFn;
  wx.createAudioContext = wx.createAudioContext || ignoreFn;

  // 视频
  // chooseVideo(拍摄视频或从手机相册中选视频)
  // 注意事项
  // 1.头条文档中该api无参数maxDuration、camera、success、fail、complete(其中后三个参数在示例中有)
  // 2.iOS 暂不支持同时从album和camera中选择，只能二者其一，当都传时使用album;暂不支持maxDuration参数

  // wx.chooseVideo = wx.chooseVideo

  // saveVideoToPhotosAlbum(保存视频到系统相册)
  // 注意事项
  // 1.头条文档中该api无参数success、fail、complete(但是示例中有这三个参数)

  wx.createVideoContext = wx.createVideoContext || emptyFn;

  // 地图
  wx.createMapContext = wx.createMapContext || emptyFn;

  // 背景音频

  wx.stopBackgroundAudio = wx.stopBackgroundAudio || ignoreFn;
  wx.seekBackgroundAudio = wx.seekBackgroundAudio || ignoreFn;
  wx.playBackgroundAudio = wx.playBackgroundAudio || ignoreFn;
  wx.pauseBackgroundAudio = wx.pauseBackgroundAudio || ignoreFn;
  wx.onBackgroundAudioStop = wx.onBackgroundAudioStop || emptyFn;
  wx.onBackgroundAudioPlay = wx.onBackgroundAudioPlay || emptyFn;
  wx.onBackgroundAudioPause = wx.onBackgroundAudioPause || emptyFn;
  wx.getBackgroundAudioPlayerState = wx.getBackgroundAudioPlayerState || ignoreFn;
  wx.getBackgroundAudioManager = wx.getBackgroundAudioManager || emptyFn;

  // 实时音视频

  wx.createLivePusherContext = wx.createLivePusherContext || emptyFn;
  wx.createLivePlayerContext = wx.createLivePlayerContext || emptyFn;

  // 相机
  wx.createCameraContext = wx.createCameraContext || emptyFn;

  //// 文件

  // saveFile(保存文件到本地)
  // 注意事项  头条中该api参数中没有指明success、fail、complete(但是示例中有这三个参数)

  // wx.saveFile = wx.saveFile

  wx.removeSavedFile = wx.removeSavedFile || ignoreFn;
  wx.openDocument = wx.openDocument || ignoreFn;
  wx.getSavedFileList = wx.getSavedFileList || ignoreFn;
  wx.getSavedFileInfo = wx.getSavedFileInfo || ignoreFn;
  wx.getFileSystemManager = wx.getFileSystemManager || emptyFn;
  wx.getFileInfo = wx.getFileInfo || ignoreFn;

  //// 数据缓存

  // getStorage
  // 注意事项  头条文档中该api参数没有指明success、fail、complete(但是示例中有这三个参数)

  // wx.getStorage = wx.getStorage
  // wx.getStorageSync = wx.getStorageSync

  // setStorage
  // 注意事项  头条文档中该api参数没有指明success、fail、complete(但是示例中有这三个参数)
  // wx.setStorage = wx.setStorage

  // wx.setStorageSync = wx.setStorageSync

  // removeStorage
  // 注意事项  头条文档中该api参数没有指明success、fail、complete(但是示例中有这三个参数)
  // wx.removeStorage = wx.removeStorage

  // wx.removeStorageSync = wx.removeStorageSync

  // clearStorage
  // 注意事项  头条文档中该api参数没有指明success、fail、complete(但是示例中有这三个参数)
  // wx.clearStorage = wx.clearStorage

  // wx.clearStorageSync = wx.clearStorageSync()

  // getStorageInfo
  // 注意事项  头条文档中该api参数没有指明success、fail、complete(但是示例中有这三个参数)
  // wx.getStorageInfo = wx.getStorageInfo

  // wx.getStorageInfoSync = wx.getStorageInfoSync

  //// 位置
  // getLocation(获取设备当前的地理位置)
  // 注意事项
  // 1.头条文档中该api没有指明参数altitude、success、fail、complete(后三个参数示例中有)
  // 2.该api参数success返回值中头条没有speed、accuracy、altitude、verticalAccuracy、horizontalAccuracy
  // 3.头条中暂不支持altitude参数
  // 4.头条中指出该 API 有一定性能消耗，请注意不要频繁调用以防设备过热和耗电过快。小程序框架也会做相应的节流处理。
  // 5.头条中如果要将返回值使用在openLocation中，必须指定坐标系为gcj0
  // 6.微信工具中定位模拟使用IP定位，可能会有一定误差。且工具目前仅支持 gcj02 坐标;使用第三方服务进行逆地址解析时，请确认第三方服务默认的坐标系，正确进行坐标转换

  // wx.getLocation = wx.getLocation

  // openLocation(使用微信内置地图查看位置)
  // 注意事项
  // 1.头条文档中该api没有指明参数altitude、success、fail、complete(后三个参数示例中有)
  // 2.头条中提示输入的坐标坐标系应当为gcj02
  // wx.openLocation = wx.openLocation
  wx.chooseLocation = wx.chooseLocation || ignoreFn;

  //// 设备

  // 系统信息

  // getSystemInfo(获取系统信息)
  // 注意事项
  // 1.头条文档中该api没有指明参数altitude、success、fail、complete(后三个参数示例中有)
  // 2.参数success返回值头条无statusBarHeight、language、fontSizeSetting、benchmarkLevel、albumAuthorized、cameraAuthorized、locationAuthorized
  // microphoneAuthorized、notificationAuthorized、notificationAlertAuthorized、notificationBadgeAuthorized、notificationSoundAuthorized、
  // bluetoothEnabled、locationEnabled、wifiEnabled
  // 3.头条中有少量iOS设备的model字段返回如iPod7,1等值;SDKVersion 当前由 JSSDK 写死 1.0.0

  // wx.getSystemInfo = wx.getSystemInfo

  // getSystemInfoSync
  // 注意事项
  // 1.参数success返回值头条无statusBarHeight、language、fontSizeSetting、benchmarkLevel、albumAuthorized、cameraAuthorized、locationAuthorized
  // microphoneAuthorized、notificationAuthorized、notificationAlertAuthorized、notificationBadgeAuthorized、notificationSoundAuthorized、
  // bluetoothEnabled、locationEnabled、wifiEnabled

  // wx.getSystemInfoSync = wx.getSystemInfoSync

  // 网络状态
  // getNetworkType(获取网络类型)
  // 注意事项
  // 1.头条文档中该api没有指明参数altitude、success、fail、complete(后三个参数示例中有)
  // 2.头条中提示unknown在设备某些无法确定网络类型为前者之一的情况下会返回
  // wx.getNetworkType = wx.getNetworkType

  // onNetworkStatusChange(监听网络状态变化事件)
  // 注意事项
  // 1.该api返回值中头条没有isConnected(当前是否有网络连接)

  // wx.onNetworkStatusChange = wx.onNetworkStatusChange

  // WI_FI
  // getConnectedWifi(获取已连接中的 Wi-Fi 信息)
  // 注意事项
  // 1.头条文档中该api没有指明参数altitude、success、fail、complete(后三个参数示例中有)
  // 2.头条没有具体说明错误信息
  // wx.getConnectedWifi = wx.getConnectedWifi

  wx.stopWifi = wx.stopWifi || ignoreFn;
  wx.startWifi = wx.startWifi || ignoreFn;
  wx.setWifiList = wx.setWifiList || ignoreFn;
  wx.onWifiConnected = wx.onWifiConnected || emptyFn;
  wx.onGetWifiList = wx.onGetWifiList || emptyFn;
  wx.getWifiList = wx.getWifiList || ignoreFn;
  wx.connectWif = wx.connectWif || ignoreFn;

  // startAccelerometer(开始监听加速度数据)
  // 注意事项
  // 1.头条文档中该api没有指明参数interval、success、fail、complete(但是示例中有)
  // 2.头条中暂不支持interval属性
  // 3.微信中根据机型性能、当前 CPU 与内存的占用情况，interval 的设置与实际 wx.onAccelerometerChange 回调函数的执行频率会有一些出入

  // wx.startAccelerometer = wx.startAccelerometer

  // stopAccelerometer(停止监听加速度数据)
  // 注意事项
  // 1.头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.stopAccelerometer = wx.stopAccelerometer

  // onAccelerometerChange(监听加速度计数据)
  // wx.onAccelerometerChange = wx.onAccelerometerChange

  // 罗盘
  // startCompass(开始监听罗盘数据)
  // 注意事项
  // 1.头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.startCompass = wx.startCompass

  // stopCompass(停止监听罗盘数据)
  // 注意事项
  // 1.头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.stopCompass = wx.stopCompass

  // onCompassChange(监听罗盘数据变化事件)
  // 注意事项  头条中该api返回值无accuracy(精度)
  // wx.onCompassChange = wx.onCompassChange

  // 电话
  // makePhoneCall(拨打电话)
  // 注意事项  头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.makePhoneCall = wx.makePhoneCall

  // 扫码
  // scanCode(扫描二维码并返回扫描结果)
  // 注意事项
  // 1.头条文档中该api没有参数,微信中参数是onlyFromCamera、scanType、success、fail、complete(但是示例中有后三个参数)
  // 2.该api参数success返回值中头条无scanType、charSet、path、rawData
  // 3.头条暂不支持onlyFromCamera和scanType;返回值不支持scanType, charSet, path, rawData;对于包含GBK编码内容的二维码扫描时会有乱码

  // wx.scanCode = wx.scanCode

  // 剪贴板
  // getClipboardData(获取系统剪贴板的内容)
  // 注意事项  头条文档中该api没有指明参数success、fail、complete(但是示例中有)

  // wx.getClipboardData = wx.getClipboardData

  // setClipboardData(设置系统剪贴板的内容)
  // 注意事项  头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.setClipboardData = wx.setClipboardData

  // 屏幕亮度
  // setKeepScreenOn(设置是否保持常亮状态)
  // 注意事项  头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.setKeepScreenOn = wx.setKeepScreenOn

  wx.setScreenBrightness = wx.setScreenBrightness || ignoreFn;
  wx.onUserCaptureScreen = wx.onUserCaptureScreen || emptyFn;
  wx.getScreenBrightness = wx.getScreenBrightness || ignoreFn;

  // 振动
  // vibrateShort
  // 注意事项
  // 1.头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // 2.头条中某些机型在不支持短振动时会fallback到vibrateLong，某些机型不支持时会进入fail回调;微信中该api仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效

  // wx.vibrateShort = wx.vibrateShort

  // vibrateLong(使手机发生较长时间的振动（400 ms))
  // 注意事项  头条文档中该api没有指明参数success、fail、complete(但是示例中有)
  // wx.vibrateLong = wx.vibrateLong

  // iBeacon
  wx.stopBeaconDiscovery = wx.stopBeaconDiscovery || ignoreFn;
  wx.startBeaconDiscovery = wx.startBeaconDiscovery || ignoreFn;
  wx.onBeaconUpdate = wx.onBeaconUpdate || emptyFn;
  wx.onBeaconServiceChange = wx.onBeaconServiceChange || emptyFn;
  wx.getBeacons = wx.getBeacons || ignoreFn;

  // 低功耗蓝牙
  wx.readBLECharacteristicValue = wx.readBLECharacteristicValue || ignoreFn;
  wx.onBLEConnectionStateChange = wx.onBLEConnectionStateChange || emptyFn;
  wx.onBLECharacteristicValueChange = wx.onBLECharacteristicValueChange || emptyFn;
  wx.notifyBLECharacteristicValueChange = wx.notifyBLECharacteristicValueChange || ignoreFn;
  wx.getBLEDeviceServices = wx.getBLEDeviceServices || ignoreFn;
  wx.getBLEDeviceCharacteristics = wx.getBLEDeviceCharacteristics || ignoreFn;
  wx.createBLEConnection = wx.createBLEConnection || ignoreFn;
  wx.closeBLEConnection = wx.closeBLEConnection || ignoreFn;
  wx.writeBLECharacteristicValue = wx.writeBLECharacteristicValue || ignoreFn;

  // 联系人
  wx.addPhoneContact = wx.addPhoneContact || ignoreFn;

  // 蓝牙
  wx.stopBluetoothDevicesDiscovery = wx.stopBluetoothDevicesDiscovery || ignoreFn;
  wx.startBluetoothDevicesDiscovery = wx.startBluetoothDevicesDiscovery || ignoreFn;
  wx.openBluetoothAdapter = wx.openBluetoothAdapter || ignoreFn;
  wx.onBluetoothDeviceFound = wx.onBluetoothDeviceFound || emptyFn;
  wx.onBluetoothAdapterStateChange = wx.onBluetoothAdapterStateChange || emptyFn;
  wx.getConnectedBluetoothDevices = wx.getConnectedBluetoothDevices || ignoreFn;
  wx.getBluetoothDevices = wx.getBluetoothDevices || ignoreFn;
  wx.getBluetoothAdapterState = wx.getBluetoothAdapterState || ignoreFn;
  wx.closeBluetoothAdapter = wx.closeBluetoothAdapter || ignoreFn;

  // 电量
  wx.getBatteryInfo = wx.getBatteryInfo || ignoreFn;
  wx.getBatteryInfoSync = wx.getBatteryInfoSync || emptyFn;

  // NFC
  wx.stopHCE = wx.stopHCE || ignoreFn;
  wx.startHCE = wx.startHCE || ignoreFn;
  wx.sendHCEMessage = wx.sendHCEMessage || ignoreFn;
  wx.onHCEMessage = wx.onHCEMessage || emptyFn;
  wx.getHCEState = wx.getHCEState || ignoreFn;

  // 设备方向

  wx.stopDeviceMotionListening = wx.stopDeviceMotionListening || ignoreFn;
  wx.startDeviceMotionListening = wx.startDeviceMotionListening || ignoreFn;
  wx.onDeviceMotionChange = wx.onDeviceMotionChange || emptyFn;

  // 陀螺仪
  wx.stopGyroscope = wx.stopGyroscope || ignoreFn;
  wx.startGyroscope = wx.startGyroscope || ignoreFn;
  wx.onGyroscopeChange = wx.onGyroscopeChange || ignoreFn;

  // 性能
  wx.onMemoryWarning = wx.onMemoryWarning || emptyFn;

  // 界面

  // 交互
  // showToast
  // 注意事项
  // 1.头条中该api无参数image、mask、success、fail、complete(后三个参数示例中有)
  // 2.头条中多次弹出 toast/loading 时，后一个会立刻覆盖前一个;当显示图标时，最多能够展示7个汉字长度。不限时图标时，文本可最多展示2行;尚未支持image和mask参数
  // 3.微信中wx.showLoading 和 wx.showToast 同时只能显示一个;wx.showToast 应与 wx.hideToast 配对使用

  // wx.showToast = wx.showToast

  // showModal
  // 注意事项
  // 1.头条中该api无参数cancelColor、confirmColor、success、fail、complete
  // 2.参数title、content默认值在微信中没有说明,头条中是``
  // 3.头条中参数title和content不可同时为空;暂不支持confirmColor和cancelColor参数;
  // 4.头条中title的长度限制：
  // android 端限制为 1 行，每行约13个汉字;iOS 端限制为 3 行，每行约17个汉字
  // 5.content的长度限制
  // android 端没有限制，Modal最高为屏幕高度，内容滚动;iOS 端限制为 3 行，每行约17个汉字
  // 6.微信中Android 6.7.2 以下版本，点击取消或蒙层时，回调 fail, errMsg 为 "fail cancel";Android 6.7.2 及以上版本 和 iOS 点击蒙层不会关闭模态弹窗，所以尽量避免使用「取消」分支中实现业务逻辑

  // wx.showModal = wx.showModal

  // showLoading
  // 注意事项
  // 1.头条文档中该api无参数mask、success、fail、complete(后三个参数示例中有)
  // 2.头条中loading 的实现基于 toast，等同于icon为loading，duration为24小时的 toast;多次弹出 toast/loading 时，后一个会立刻覆盖前一个
  // 3.头条中参数title内容，最多显示7个汉字长度的文本
  // 4.头条中尚未支持mask参数

  // wx.showLoading = wx.showLoading

  // hideLoading
  // 注意事项
  // 1.头条文档中该api无参数success,fail、complete(但是示例中有)
  // 2.loading 的实现基于 toast，所以hideLoading也会将 toast 隐藏

  // wx.hideLoading = wx.hideLoading

  // hideToast
  // 注意事项
  // 1.头条文档中该api无参数success,fail、complete(但是示例中有)
  // 2.头条中loading 的实现基于 toast，所以hideToast也会将 loading 隐藏

  // wx.hideToast = wx.hideToast

  // showActionSheet
  // 注意事项
  // 1.头条文档中该api无参数itemColor、success、fail、complete(后三个参数示例中有)
  // 2.头条中暂不支持itemColor属性;
  // 3.每个选项文案长度限制:android 没有限制，超长内容滚动、iOS 每个选项最多 1 行，每行约 18 个汉字
  // 4.头条中iOS 实现时会自动加入「取消」选项，android 不会

  // wx.showActionSheet = wx.showActionSheet

  // 导航栏

  // setNavigationBarTitle
  // 注意事项
  // 1.头条文档中该api无参数success、fail、complete(示例中有)
  // 2.头条中如果当前页面不存在导航栏，不会返回fail

  // wx.setNavigationBarTitle = wx.setNavigationBarTitle
  wx.showNavigationBarLoading = wx.showNavigationBarLoading || ignoreFn;
  wx.setNavigationBarColor = wx.setNavigationBarColor || ignoreFn;
  wx.hideNavigationBarLoading = wx.hideNavigationBarLoading || ignoreFn;

  // 动画
  // createAnimation
  // 注意事项
  // 1.头条中提示实现的是一个CSS动画，具体效果依赖浏览器的实现
  // 2.头条中注意每次export只会导出「尚未被导出」的动画组，若某动画组已经被导出过，则会被清除。
  // 如果在调用export时存在尚未完成的「动画组」，则未进入「动画组」的视觉变换不会生效（但也不会被删除，下次调用step方法后会继续生效）
  // 3.头条文档中step方法未说明参数

  // wx.createAnimation = wx.createAnimation

  // 滚动

  // pageScrollTo
  // 注意事项
  // 1.头条文档中该api无参数success、fail、complete(示例中有)
  // 2.参数duration默认值在微信中是300,头条中是200

  // wx.pageScrollTo = wx.pageScrollTo

  // Canvas绘图

  // createCanvasContext
  const createCanvasContext = wx.createCanvasContext;
  wx.createCanvasContext = function(opt){
    const canvasContext = createCanvasContext.call(this, opt);
    // 处理canvasContext对象字段缺失
    canvasContext.createCircularGradient = emptyFn;
    // 处理canvasContext对象某些字段更新
    canvasContext.setFillStyle = canvasContext.fillStyle;
    canvasContext.setFontSize = canvasContext.font;
    canvasContext.setGlobalAlpha = canvasContext.globalAlpha;
    canvasContext.setLineCap = canvasContext.lineCap;
    canvasContext.setLineDash = canvasContext.lineDashOffset;
    canvasContext.setLineJoin = canvasContext.lineJoin;
    canvasContext.setLineWidth = canvasContext.lineWidth;
    canvasContext.setMiterLimit = canvasContext.miterLimit;
    // 微信中canvasContext.setShadow从从基础库 1.9.90 开始，停止维护，请使用
    // canvasContext.shadowOffsetX
    // |canvasContext.shadowOffsetY
    // |canvasContext.shadowColor
    // |canvasContext.shadowBlur 代替
    // 头条中是canvasContext.shadowOffsetX
    // |canvasContext.shadowOffsetY
    // |canvasContext.shadowColor
    // |canvasContext.shadowBlur
    canvasContext.setStrokeStyle = canvasContext.strokeStyle;
    canvasContext.setTextAlign = canvasContext.textAlign;
    canvasContext.setTextBaseline = canvasContext.textBaseline;

    return canvasContext;
  };

  // 下拉刷新

  // stopPullDownRefresh
  // 头条文档中该api未指明参数success、fail、complete
  // wx.stopPullDownRefresh = wx.stopPullDownRefresh

  // startPullDownRefresh
  // 头条文档中没有指明参数success、fail、complete(示例中有)
  // wx.stopPullDownRefresh = wx.stopPullDownRefresh

  // canvasToTempFilePath
  // 注意事项
  // 1.头条文档中该api无参数success、fail、complete(但是有)
  // canvasToTempFilePath = canvasToTempFilePath

  // canvasGetImageData
  // 注意事项
  // 1.头条中该api无参数success、fail、complete(但是有)
  // 2.头条中有该api,但是暂时无法使用
  wx.canvasGetImageData = wx.canvasGetImageData || ignoreFn;

  // canvasPutImageData
  // 注意事项
  // 1.头条文档中该api无参数success、fail、complete(但是有)
  // 2.头条中有该api,但是暂时无法使用
  wx.canvasPutImageData = wx.canvasPutImageData || ignoreFn;

  // 背景
  wx.setBackgroundTextStyle = wx.setBackgroundTextStyle || ignoreFn;
  wx.setBackgroundColor = wx.setBackgroundColor || ignoreFn;

  // Tab-Bar
  wx.showTabBarRedDot = wx.showTabBarRedDot || ignoreFn;
  wx.showTabBar = wx.showTabBar || ignoreFn;
  wx.setTabBarStyle = wx.setTabBarStyle || ignoreFn;
  wx.setTabBarItem = wx.setTabBarItem || ignoreFn;
  wx.setTabBarBadge = wx.setTabBarBadge || ignoreFn;
  wx.removeTabBarBadge = wx.removeTabBarBadge || ignoreFn;
  wx.hideTabBarRedDot = wx.hideTabBarRedDot || ignoreFn;
  wx.hideTabBar = wx.hideTabBar || ignoreFn;

  // 字体
  wx.loadFontFace = wx.loadFontFace || ignoreFn;

  // 置顶
  wx.setTopBarText = wx.setTopBarText || ignoreFn;

  // 自定义组件

  wx.nextTick = wx.nextTick || emptyFn;

  // 菜单
  wx.getMenuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect || emptyFn;

  // 窗口

  wx.onWindowResize = wx.onWindowResize || emptyFn;
  wx.offWindowResize = wx.offWindowResize || emptyFn;

  // 路由
  // navigateTo
  // 注意事项  头条文档中该api没有参数success、fail、complete(示例中有)
  // wx.navigateTo = wx.navigateTo
  // redirectTo
  // 注意事项  头条文档中该api没有参数success、fail、complete(示例中有)
  // wx.redirectTo = wx.redirectTo
  // switchTab
  // 注意事项  头条文档中该api没有参数success、fail、complete(示例中有)
  // wx.switchTab = wx.switchTab
  // navigateBack
  // 注意事项  头条文档中该api没有参数success、fail、complete(示例中有)
  // wx.navigateBack = wx.navigateBack
  // reLaunch
  // 注意事项  头条文档中该api没有参数success、fail、complete(示例中有)
  // wx.reLaunch = wx.reLaunch

  // 转发
  // showShareMenu
  // 注意事项  头条文档中该api没有参数withShareTicket、success、fail、complete(后三个示例中有)
  // wx.showShareMenu = wx.showShareMenu

  // hideShareMenu
  // 注意事项  头条文档中该api没有参数success、fail、complete(示例中有)
  // wx.hideShareMenu = wx.hideShareMenu;

  wx.updateShareMenu = wx.updateShareMenu || ignoreFn;
  wx.getShareInfo = wx.getShareInfo || ignoreFn;

  // WXML
  // wx.createSelectorQuery = wx.createSelectorQuery
  // 注意事项  selectorQuery调用方法的返回对象nodesRef.fields方法参数中，微信中有context、scrollOffset、properties、computedStyle字段，头条中无这些字段
  // nodesRef对象头条中无content方法,使用时需注意

  // createIntersectionObserver
  // 注意事项
  // 1.头条中该api无参数Object options(thresholds、initialRatio、observeAll)
  // wx.createIntersectionObserver = wx.createIntersectionObserver

  // 第三方平台
  wx.getExtConfig = wx.getExtConfig || ignoreFn;
  wx.getExtConfigSyn = wx.getExtConfigSyn || emptyFn;

  // Worker
  wx.createWorker = wx.createWorker || emptyFn;

  // 开放接口

  // 登录
  wx.login = wx.login || ignoreFn;
  wx.checkSession = wx.checkSession || ignoreFn;

  // 小程序跳转

  wx.navigateToMiniProgram = wx.navigateToMiniProgram || ignoreFn;
  wx.navigateBackMiniProgram = wx.navigateBackMiniProgram || ignoreFn;

  // 账户信息
  wx.getAccountInfoSync = wx.getAccountInfoSync || emptyFn;

  // 用户信息
  wx.getUserInfo = wx.getUserInfo || ignoreFn;

  // 数据上报
  wx.reportMonito = wx.reportMonito || emptyFn;

  // 数据分析
  wx.reportAnalytics = wx.reportAnalytics || emptyFn;

  // 支付
  wx.requestPayment = wx.requestPayment || emptyFn;

  // 授权
  wx.authorize = wx.authorize || ignoreFn;

  // 设置
  wx.openSetting = wx.openSetting || ignoreFn;
  wx.getSetting = wx.getSetting || ignoreFn;

  // 收货地址
  wx.chooseAddres = wx.chooseAddres || ignoreFn;

  // 卡劵
  wx.openCard = wx.openCard || ignoreFn;
  wx.addCard = wx.addCard || ignoreFn;

  // 发票
  wx.chooseInvoiceTitle = wx.chooseInvoiceTitle || ignoreFn;
  wx.chooseInvoice = wx.chooseInvoice || ignoreFn;

  // 生物认证
  wx.startSoterAuthentication = wx.startSoterAuthentication || ignoreFn;
  wx.checkIsSupportSoterAuthentication = wx.checkIsSupportSoterAuthentication || ignoreFn;
  wx.checkIsSoterEnrolledInDevice = wx.checkIsSoterEnrolledInDevice || ignoreFn;

  // 微信运动
  wx.getWeRunData = wx.getWeRunData || ignoreFn;

  // 基础
  wx.canIUse = wx.canIUse || emptyFn;

  // 更新
  wx.getUpdateManager = wx.getUpdateManager || emptyFn;

  // 小程序生命周期
  wx.getLaunchOptionsSync = wx.getLaunchOptionsSync || emptyFn;

  // 应用级事件

  wx.onPageNotFound = wx.onPageNotFound || emptyFn;
  wx.onError = wx.onError || emptyFn;
  wx.onAudioInterruptionEnd = wx.onAudioInterruptionEnd || emptyFn;
  wx.onAudioInterruptionBegin = wx.onAudioInterruptionBegin || emptyFn;
  wx.onAppShow = wx.onAppShow || emptyFn;
  wx.onAppHide = wx.onAppHide || emptyFn;
  wx.offPageNotFound = wx.offPageNotFound || emptyFn;
  wx.offError = wx.offError || emptyFn;
  wx.offAudioInterruptionEnd = wx.offAudioInterruptionEnd || emptyFn;
  wx.offAudioInterruptionBegin = wx.offAudioInterruptionBegin || emptyFn;
  wx.offAppShow = wx.offAppShow || emptyFn;
  wx.offAppHide = wx.offAppHide || emptyFn;

  // 调试
  wx.setEnableDebug = wx.setEnableDebug || ignoreFn;
  wx.getLogManager = wx.getLogManager || emptyFn;

  return wx;
}

export default getInstance();