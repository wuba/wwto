// pages/mine/mine.js
Page({
  canIUse(){
    wx.chenyu()
  },
  getSystemInfoSync(){
    console.log(wx.getSystemInfoSync())
  },
  getSystemInfo(){
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
      }
    })
  },
  getUpdateManager(){
    console.log(wx.getUpdateManager())
  },
  switchTap(){
    wx.switchTab({
      url:"/pages/index/index"
    })
  },
  reLaunch(){
    wx.reLaunch({
      url:"/pages/mine/mine"
    })
  },
  redirectTo(){
    wx.redirectTo({
      url:'/pages/thi/thi'
    })
  },
  navigateTo(){
    wx.navigateTo({
      url:'/pages/thi/thi'
    })
  },
  showToast(){
    wx.showToast({
      icon:'success',
      title:'pdc'
    })
  },
  showModal(){
    wx.showModal({
      title:'aaaaa'
    })
  },
  showLoading(){
    wx.showLoading()
  },
  hideLoading(){
    wx.hideLoading()
  },
  showActionSheet(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  showNavigationBarLoading(){
    wx.showNavigationBarLoading()
  },
  setNavigationBarTitle(){
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
  },
  setNavigationBarColor(){
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  showTabBar(){
    wx.showTabBar()
  },
  hideTabBar(){
    wx.hideTabBar()
  },
  pageScrollTo(){
    wx.pageScrollTo({
      scrollTop:200,
      success(res){
        console.log(res)
      }
    })
  },
  downloadFile(){
    wx.downloadFile({
      url: 'http://t8.baidu.com/it/u=3660968530,985748925&fm=191&app=48&wm=1,17,90,45,20,7&wmo=0,0&n=0&g=0n&f=JPEG?sec=1853310920&t=9b4f100f0eedfe853fad24a58a4e1ad7', // 仅为示例，并非真实的资源
      success(res) {
        console.log(res)
      }
    })
  },
  setStorageSync(){
    wx.setStorageSync('key', 'value')
  },
  setStorage(){
    wx.setStorage({
      key: 'key',
      data: 'value'
    })
  },
  removeStorageSync(){
    wx.removeStorageSync('key')
  },
  removeStorage(){
    wx.removeStorage({
      key: 'key',
      success(res) {
        console.log(res)
      }
    })
  },
  getStorageSync(){
    let value = wx.getStorageSync('key')
    console.log(value)
  },
  getStorageInfoSync(){
    let res=wx.getStorageInfoSync()
    console.log(res)
  },
  getStorageInfo(){
    wx.getStorageInfo({
      success(res) {
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      }
    })
  },
  getStorage(){
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res.data)
      }
    })
  },
  clearStorageSync(){
    wx.clearStorageSync()
  },
  clearStorage(){
    wx.clearStorage()
  },
  mapobj:null,
  createMapContext(){
    this.mapobj=wx.createMapContext("map")
    console.log(this.mapobj)
  },
  getCenterLocation(){
    this.mapobj.getCenterLocation({
      success(res){
        console.log(res)
      }
    })
  },
  moveToLocation(){
    this.mapobj.moveToLocation()
  },
  previewImage(){
    wx.previewImage({
      urls:["https://img.58cdn.com.cn/git/teg-app-fe/hash-ganghood/indexBg.png?a=111"]
    })
  },
  getImageInfo(){
    wx.getImageInfo({
      src:'https://img.58cdn.com.cn/git/teg-app-fe/hash-ganghood/indexBg.png?a=111',
      success(res){
        console.log(res)
      }
    })
  },
  chooseImage(){
    wx.chooseImage({
      success(res){
        wx.saveImageToPhotosAlbum({
          filePath:res.tempFilePaths[0],
          success(pdRes){
            console.log('存储',pdRes)
          },
          fail(e){
            console.log(e)
          }
        })
      }
    })
  },
  getLocation(){
    wx.getLocation({
      success(res) {
        console.log(res)
        let latitude=res.latitude
        let longitude=res.longitude
        wx.openLocation({
          latitude,
          longitude
        })
      }
    })
  },
  chooseLocation(){
    wx.chooseLocation({
      success(res){
        console.log(res)
      }
    })
  }
})