Page({
  onShareAppMessage() {
    return {
      title: 'audio',
      path: 'page/component/pages/audio/audio'
    }
  },

  data: {
    current: {
      poster: 'demo/miniprogram-demo/image/poster.jpg',
      name: '此时此刻',
      author: '许巍',
      src: 'demo/miniprogram-demo/audio/许巍 - 此时此刻.mp3',
    },
    audioAction: {
      method: 'pause'
    }
  }
})
