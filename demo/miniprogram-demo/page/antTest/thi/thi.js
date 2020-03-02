// pages/thi/thi.js
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  navigateBack() {
    wx.navigateBack()
  },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    poster: 'demo/miniprogram-demo/image/poster.jpg',
    name: '此时此刻',
    author: '许巍',
    audiosrc: 'demo/miniprogram-demo/audio/许巍 - 此时此刻.mp3',
    loop: true,
    controls: true,
    duration: 60,
    src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },
  onLoad() {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  saveFile() {
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
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(390)
  },
  audioStart() {
    this.audioCtx.seek(0)
  },
  getSavedFileList() {
    wx.getSavedFileList({
      success(res) {
        console.log(res)
      },
      fail(r) {
        console.log(r)
      }
    })
  },
  audiotimeupdate() {
    console.log('.......')
  },
  audiobindended() {
    console.log('end')
  },
  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
