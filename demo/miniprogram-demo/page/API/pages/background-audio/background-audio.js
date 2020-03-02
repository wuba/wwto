const app = getApp()
const util = require('../../../../util/util.js')

const dataUrl = 'demo/miniprogram-demo/audio/许巍 - 此时此刻.mp3'
Page({
  onShareAppMessage() {
    return {
      title: '背景音乐',
      path: 'page/API/pages/background-audio/background-audio'
    }
  },

  onLoad() {
    this._enableInterval()

    if (app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: true
      })
    }
  },
  data: {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
  },
  play() {
    const that = this
    wx.playBackgroundAudio({
      dataUrl,
      title: '此时此刻',
      coverImgUrl: 'demo/miniprogram-demo/image/poster.jpg',
      complete() {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
    app.globalData.backgroundAudioPlaying = true
  },
  seek(e) {
    clearInterval(this.updateInterval)
    const that = this
    wx.seekBackgroundAudio({
      position: e.detail.value,
      complete() {
        // 实际会延迟两秒左右才跳过去
        setTimeout(function () {
          that._enableInterval()
        }, 2000)
      }
    })
  },
  pause() {
    const that = this
    wx.pauseBackgroundAudio({
      dataUrl,
      success() {
        that.setData({
          playing: false
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  stop() {
    const that = this
    wx.stopBackgroundAudio({
      dataUrl,
      success() {
        that.setData({
          playing: false,
          playTime: 0,
          formatedPlayTime: util.formatTime(0)
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  _enableInterval() {
    const that = this
    function update() {
      wx.getBackgroundAudioPlayerState({
        success(res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          })
        }
      })
    }

    update()
    this.updateInterval = setInterval(update, 500)
  },
  onUnload() {
    clearInterval(this.updateInterval)
  }
})
