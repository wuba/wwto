const emptyFn=()=>{};function ignoreFn(e){e&&(e.success?e.success():e.complete?e.complete():e.fail&&e.fail())}function getInstance(){var e=tt;if(e.has_toutiao_hook_flag)return;e.has_toutiao_hook_flag=!0,e.hideKeyboard=e.hideKeyboard||emptyFn;const n=setTimeout;setTimeout=function(e,o){return n.call(this,e,Math.floor(o||0))};const o=setInterval;setInterval=function(e,n){return o.call(this,e,Math.floor(n||0))};const t=clearTimeout;clearTimeout=function(e){return t.call(this,e)};const i=clearInterval;clearInterval=function(e){return i.call(this,e)};const r=e.request;e.request=(e=>{"POST"===e.method&&"string"==typeof e.data&&(e.header=e.header||{},e.header["content-type"]="application/x-www-form-urlencoded"),e.responseType||(e.responseType="json");const n=r.call(this,e);return["onHeadersReceived","offHeadersReceived","abort"].forEach(e=>{n[e]=n[e]||emptyFn}),n});const{uploadFile:a}=e;e.uploadFile=function(e){const n=a.call(this,e);return["abort","offHeadersReceived","offProgressUpdate","onHeadersReceived","onProgressUpdate"].forEach(e=>{n[e]=n[e]||emptyFn}),n};const{downloadFile:c}=e;e.downloadFile=function(e){const n=c.call(this,e);return["abort","offHeadersReceived","offProgressUpdate","onHeadersReceived","onProgressUpdate"].forEach(e=>{n[e]=n[e]||emptyFn}),n},e.sendSocketMessage=e.sendSocketMessage||ignoreFn,e.onSocketOpen=e.onSocketOpen||emptyFn,e.onSocketMessage=e.onSocketMessage||emptyFn,e.onSocketError=e.onSocketError||emptyFn,e.onSocketClose=e.onSocketClose||emptyFn,e.closeSocket=e.closeSocket||ignoreFn,e.stopLocalServiceDiscovery=e.stopLocalServiceDiscovery||ignoreFn,e.startLocalServiceDiscovery=e.startLocalServiceDiscovery||ignoreFn,e.onLocalServiceResolveFail=e.onLocalServiceResolveFail||emptyFn,e.onLocalServiceLost=e.onLocalServiceLost||emptyFn,e.onLocalServiceFound=e.onLocalServiceFound||emptyFn,e.onLocalServiceDiscoveryStop=e.onLocalServiceDiscoveryStop||emptyFn,e.offLocalServiceResolveFail=e.offLocalServiceResolveFail||emptyFn,e.offLocalServiceLost=e.offLocalServiceLost||emptyFn,e.offLocalServiceFound=e.offLocalServiceFound||emptyFn,e.offLocalServiceDiscoveryStop=e.offLocalServiceDiscoveryStop||emptyFn,e.getImageInfo=e.getImageInfo||ignoreFn,e.compressImage=e.compressImage||ignoreFn,e.chooseMessageFile=e.chooseMessageFile||ignoreFn;const s=e.getRecorderManager;e.getRecorderManager=function(e){const n=s.call(this,e);return["onInterruptionBegin","onInterruptionEnd","onResume"].forEach(e=>{n[e]=n[e]||emptyFn}),n},e.stopRecord=e.stopRecord||emptyFn,e.startRecord=e.startRecord||ignoreFn,e.stopVoice=e.stopVoice||ignoreFn,e.setInnerAudioOption=e.setInnerAudioOption||ignoreFn,e.playVoice=e.playVoice||ignoreFn,e.pauseVoice=e.pauseVoice||ignoreFn,e.getAvailableAudioSources=e.getAvailableAudioSources||ignoreFn,e.createAudioContext=e.createAudioContext||ignoreFn,e.createVideoContext=e.createVideoContext||emptyFn,e.createMapContext=e.createMapContext||emptyFn,e.stopBackgroundAudio=e.stopBackgroundAudio||ignoreFn,e.seekBackgroundAudio=e.seekBackgroundAudio||ignoreFn,e.playBackgroundAudio=e.playBackgroundAudio||ignoreFn,e.pauseBackgroundAudio=e.pauseBackgroundAudio||ignoreFn,e.onBackgroundAudioStop=e.onBackgroundAudioStop||emptyFn,e.onBackgroundAudioPlay=e.onBackgroundAudioPlay||emptyFn,e.onBackgroundAudioPause=e.onBackgroundAudioPause||emptyFn,e.getBackgroundAudioPlayerState=e.getBackgroundAudioPlayerState||ignoreFn,e.getBackgroundAudioManager=e.getBackgroundAudioManager||emptyFn,e.createLivePusherContext=e.createLivePusherContext||emptyFn,e.createLivePlayerContext=e.createLivePlayerContext||emptyFn,e.createCameraContext=e.createCameraContext||emptyFn,e.removeSavedFile=e.removeSavedFile||ignoreFn,e.openDocument=e.openDocument||ignoreFn,e.getSavedFileList=e.getSavedFileList||ignoreFn,e.getSavedFileInfo=e.getSavedFileInfo||ignoreFn,e.getFileSystemManager=e.getFileSystemManager||emptyFn,e.getFileInfo=e.getFileInfo||ignoreFn,e.chooseLocation=e.chooseLocation||ignoreFn,e.stopWifi=e.stopWifi||ignoreFn,e.startWifi=e.startWifi||ignoreFn,e.setWifiList=e.setWifiList||ignoreFn,e.onWifiConnected=e.onWifiConnected||emptyFn,e.onGetWifiList=e.onGetWifiList||emptyFn,e.getWifiList=e.getWifiList||ignoreFn,e.connectWif=e.connectWif||ignoreFn,e.setScreenBrightness=e.setScreenBrightness||ignoreFn,e.onUserCaptureScreen=e.onUserCaptureScreen||emptyFn,e.getScreenBrightness=e.getScreenBrightness||ignoreFn,e.stopBeaconDiscovery=e.stopBeaconDiscovery||ignoreFn,e.startBeaconDiscovery=e.startBeaconDiscovery||ignoreFn,e.onBeaconUpdate=e.onBeaconUpdate||emptyFn,e.onBeaconServiceChange=e.onBeaconServiceChange||emptyFn,e.getBeacons=e.getBeacons||ignoreFn,e.readBLECharacteristicValue=e.readBLECharacteristicValue||ignoreFn,e.onBLEConnectionStateChange=e.onBLEConnectionStateChange||emptyFn,e.onBLECharacteristicValueChange=e.onBLECharacteristicValueChange||emptyFn,e.notifyBLECharacteristicValueChange=e.notifyBLECharacteristicValueChange||ignoreFn,e.getBLEDeviceServices=e.getBLEDeviceServices||ignoreFn,e.getBLEDeviceCharacteristics=e.getBLEDeviceCharacteristics||ignoreFn,e.createBLEConnection=e.createBLEConnection||ignoreFn,e.closeBLEConnection=e.closeBLEConnection||ignoreFn,e.writeBLECharacteristicValue=e.writeBLECharacteristicValue||ignoreFn,e.addPhoneContact=e.addPhoneContact||ignoreFn,e.stopBluetoothDevicesDiscovery=e.stopBluetoothDevicesDiscovery||ignoreFn,e.startBluetoothDevicesDiscovery=e.startBluetoothDevicesDiscovery||ignoreFn,e.openBluetoothAdapter=e.openBluetoothAdapter||ignoreFn,e.onBluetoothDeviceFound=e.onBluetoothDeviceFound||emptyFn,e.onBluetoothAdapterStateChange=e.onBluetoothAdapterStateChange||emptyFn,e.getConnectedBluetoothDevices=e.getConnectedBluetoothDevices||ignoreFn,e.getBluetoothDevices=e.getBluetoothDevices||ignoreFn,e.getBluetoothAdapterState=e.getBluetoothAdapterState||ignoreFn,e.closeBluetoothAdapter=e.closeBluetoothAdapter||ignoreFn,e.getBatteryInfo=e.getBatteryInfo||ignoreFn,e.getBatteryInfoSync=e.getBatteryInfoSync||emptyFn,e.stopHCE=e.stopHCE||ignoreFn,e.startHCE=e.startHCE||ignoreFn,e.sendHCEMessage=e.sendHCEMessage||ignoreFn,e.onHCEMessage=e.onHCEMessage||emptyFn,e.getHCEState=e.getHCEState||ignoreFn,e.stopDeviceMotionListening=e.stopDeviceMotionListening||ignoreFn,e.startDeviceMotionListening=e.startDeviceMotionListening||ignoreFn,e.onDeviceMotionChange=e.onDeviceMotionChange||emptyFn,e.stopGyroscope=e.stopGyroscope||ignoreFn,e.startGyroscope=e.startGyroscope||ignoreFn,e.onGyroscopeChange=e.onGyroscopeChange||ignoreFn,e.onMemoryWarning=e.onMemoryWarning||emptyFn,e.showNavigationBarLoading=e.showNavigationBarLoading||ignoreFn,e.setNavigationBarColor=e.setNavigationBarColor||ignoreFn,e.hideNavigationBarLoading=e.hideNavigationBarLoading||ignoreFn;const g=e.createCanvasContext;return e.createCanvasContext=function(e){const n=g.call(this,e);return n.createCircularGradient=emptyFn,n.setFillStyle=n.fillStyle,n.setFontSize=n.font,n.setGlobalAlpha=n.globalAlpha,n.setLineCap=n.lineCap,n.setLineDash=n.lineDashOffset,n.setLineJoin=n.lineJoin,n.setLineWidth=n.lineWidth,n.setMiterLimit=n.miterLimit,n.setStrokeStyle=n.strokeStyle,n.setTextAlign=n.textAlign,n.setTextBaseline=n.textBaseline,n},e.canvasGetImageData=e.canvasGetImageData||ignoreFn,e.canvasPutImageData=e.canvasPutImageData||ignoreFn,e.setBackgroundTextStyle=e.setBackgroundTextStyle||ignoreFn,e.setBackgroundColor=e.setBackgroundColor||ignoreFn,e.showTabBarRedDot=e.showTabBarRedDot||ignoreFn,e.showTabBar=e.showTabBar||ignoreFn,e.setTabBarStyle=e.setTabBarStyle||ignoreFn,e.setTabBarItem=e.setTabBarItem||ignoreFn,e.setTabBarBadge=e.setTabBarBadge||ignoreFn,e.removeTabBarBadge=e.removeTabBarBadge||ignoreFn,e.hideTabBarRedDot=e.hideTabBarRedDot||ignoreFn,e.hideTabBar=e.hideTabBar||ignoreFn,e.loadFontFace=e.loadFontFace||ignoreFn,e.setTopBarText=e.setTopBarText||ignoreFn,e.nextTick=e.nextTick||emptyFn,e.getMenuButtonBoundingClientRect=e.getMenuButtonBoundingClientRect||emptyFn,e.onWindowResize=e.onWindowResize||emptyFn,e.offWindowResize=e.offWindowResize||emptyFn,e.updateShareMenu=e.updateShareMenu||ignoreFn,e.getShareInfo=e.getShareInfo||ignoreFn,e.getExtConfig=e.getExtConfig||ignoreFn,e.getExtConfigSyn=e.getExtConfigSyn||emptyFn,e.createWorker=e.createWorker||emptyFn,e.login=e.login||ignoreFn,e.checkSession=e.checkSession||ignoreFn,e.navigateToMiniProgram=e.navigateToMiniProgram||ignoreFn,e.navigateBackMiniProgram=e.navigateBackMiniProgram||ignoreFn,e.getAccountInfoSync=e.getAccountInfoSync||emptyFn,e.getUserInfo=e.getUserInfo||ignoreFn,e.reportMonito=e.reportMonito||emptyFn,e.reportAnalytics=e.reportAnalytics||emptyFn,e.requestPayment=e.requestPayment||emptyFn,e.authorize=e.authorize||ignoreFn,e.openSetting=e.openSetting||ignoreFn,e.getSetting=e.getSetting||ignoreFn,e.chooseAddres=e.chooseAddres||ignoreFn,e.openCard=e.openCard||ignoreFn,e.addCard=e.addCard||ignoreFn,e.chooseInvoiceTitle=e.chooseInvoiceTitle||ignoreFn,e.chooseInvoice=e.chooseInvoice||ignoreFn,e.startSoterAuthentication=e.startSoterAuthentication||ignoreFn,e.checkIsSupportSoterAuthentication=e.checkIsSupportSoterAuthentication||ignoreFn,e.checkIsSoterEnrolledInDevice=e.checkIsSoterEnrolledInDevice||ignoreFn,e.getWeRunData=e.getWeRunData||ignoreFn,e.canIUse=e.canIUse||emptyFn,e.getUpdateManager=e.getUpdateManager||emptyFn,e.getLaunchOptionsSync=e.getLaunchOptionsSync||emptyFn,e.onPageNotFound=e.onPageNotFound||emptyFn,e.onError=e.onError||emptyFn,e.onAudioInterruptionEnd=e.onAudioInterruptionEnd||emptyFn,e.onAudioInterruptionBegin=e.onAudioInterruptionBegin||emptyFn,e.onAppShow=e.onAppShow||emptyFn,e.onAppHide=e.onAppHide||emptyFn,e.offPageNotFound=e.offPageNotFound||emptyFn,e.offError=e.offError||emptyFn,e.offAudioInterruptionEnd=e.offAudioInterruptionEnd||emptyFn,e.offAudioInterruptionBegin=e.offAudioInterruptionBegin||emptyFn,e.offAppShow=e.offAppShow||emptyFn,e.offAppHide=e.offAppHide||emptyFn,e.setEnableDebug=e.setEnableDebug||ignoreFn,e.getLogManager=e.getLogManager||emptyFn,e}export default getInstance();