// pages/thi/thi.js
Page({
  navigateBack(){
    wx.navigateBack()
  },
  saveFile(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },
  getSavedFileList(){
    wx.getSavedFileList({
      success(res) {
        console.log(res)
      },
      fail: function(r) {
        console.log(r)
      }
    })
  }
})