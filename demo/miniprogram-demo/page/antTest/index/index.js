let ctx = null
Page({
  createCanvasContext() {
    ctx = wx.createCanvasContext('aaa')
    console.log(ctx)
  },
  canvasToTempFilePath() {
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'aaa',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  canvasPutImageData() {
    let data = new Uint8ClampedArray([255, 0, 0, 1])
    wx.canvasPutImageData({
      canvasId: 'aaa',
      x: 0,
      y: 0,
      width: 1,
      data,
      success(res) {
        console.log(res)
      }
    })
  },
  canvasGetImageData() {
    wx.canvasGetImageData({
      canvasId: 'aaa',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success(res) {
        console.log(res)
      }
    })
  },
  arc() {
    ctx.beginPath()
    ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    ctx.setFillStyle('#EEEEEE')
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(40, 75)
    ctx.lineTo(160, 75)
    ctx.moveTo(100, 15)
    ctx.lineTo(100, 135)
    ctx.setStrokeStyle('#AAAAAA')
    ctx.stroke()

    ctx.setFontSize(12)
    ctx.setFillStyle('black')
    ctx.fillText('0', 165, 78)
    ctx.fillText('0.5*PI', 83, 145)
    ctx.fillText('1*PI', 15, 78)
    ctx.fillText('1.5*PI', 83, 10)

    // Draw points
    ctx.beginPath()
    ctx.arc(100, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(100, 25, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(150, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    // Draw arc
    ctx.beginPath()
    ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
    ctx.setStrokeStyle('#333333')
    ctx.stroke()

    ctx.draw()
  },
  beginPath() {
    ctx.beginPath()
    ctx.rect(10, 10, 100, 30)
    ctx.setFillStyle('yellow')
    ctx.fill()

    // begin another path
    ctx.beginPath()
    ctx.rect(10, 40, 100, 30)

    // only fill this rect, not in current path
    ctx.setFillStyle('blue')
    ctx.fillRect(10, 70, 100, 30)

    ctx.rect(10, 100, 100, 30)

    // it will fill current path
    ctx.setFillStyle('red')
    ctx.fill()
    ctx.draw()
  },
  bezierCurveTo() {
    ctx.beginPath()
    ctx.arc(20, 20, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(200, 20, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(20, 100, 2, 0, 2 * Math.PI)
    ctx.arc(200, 100, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.setFillStyle('black')
    ctx.setFontSize(12)

    // Draw guides
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(20, 100)
    ctx.lineTo(150, 75)

    ctx.moveTo(200, 20)
    ctx.lineTo(200, 100)
    ctx.lineTo(70, 75)
    ctx.setStrokeStyle('#AAAAAA')
    ctx.stroke()

    // Draw quadratic curve
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
    ctx.setStrokeStyle('black')
    ctx.stroke()

    ctx.draw()
  },
  clearRect() {
    ctx.beginPath()
    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, 150, 200)
    ctx.setFillStyle('blue')
    ctx.fillRect(150, 0, 150, 200)
    ctx.clearRect(10, 10, 150, 75)
    ctx.draw()
  },
  clip() {
    wx.downloadFile({
      url: 'demo/miniprogram-demo/image/weixin.jpg',
      success(res) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(50, 50, 25, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(res.tempFilePath, 25, 25)
        ctx.restore()
        ctx.draw()
      }
    })
  },
  closePath() {
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 10)
    ctx.lineTo(100, 100)
    ctx.closePath()
    ctx.stroke()
    ctx.draw()
  },
  createCircularGradient() {
    const grd = ctx.createCircularGradient(75, 50, 50)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },
  createLinearGradient() {
    const grd = ctx.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },
  quadraticCurveTo() {
    ctx.beginPath()
    ctx.arc(20, 20, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(200, 20, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(20, 100, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.setFillStyle('black')
    ctx.setFontSize(12)

    // Draw guides
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(20, 100)
    ctx.lineTo(200, 20)
    ctx.setStrokeStyle('#AAAAAA')
    ctx.stroke()

    // Draw quadratic curve
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.quadraticCurveTo(20, 100, 200, 20)
    ctx.setStrokeStyle('black')
    ctx.stroke()

    ctx.draw()
  },
  rotate() {
    ctx.strokeRect(100, 10, 150, 100)
    ctx.rotate(20 * Math.PI / 180)
    ctx.strokeRect(100, 10, 150, 100)
    ctx.rotate(20 * Math.PI / 180)
    ctx.strokeRect(100, 10, 150, 100)

    ctx.draw()
  },
  scale() {
    ctx.strokeRect(10, 10, 25, 15)
    ctx.scale(2, 2)
    ctx.strokeRect(10, 10, 25, 15)
    ctx.scale(2, 2)
    ctx.strokeRect(10, 10, 25, 15)

    ctx.draw()
  },
  setGlobalAlpha() {
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 100)
    ctx.setGlobalAlpha(0.2)
    ctx.setFillStyle('blue')
    ctx.fillRect(50, 50, 150, 100)
    ctx.setFillStyle('yellow')
    ctx.fillRect(100, 100, 150, 100)

    ctx.draw()
  },
  setLineCap() {
    ctx.beginPath()
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(150, 10)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineCap('butt')
    ctx.setLineWidth(10)
    ctx.moveTo(10, 30)
    ctx.lineTo(150, 30)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineCap('round')
    ctx.setLineWidth(10)
    ctx.moveTo(10, 50)
    ctx.lineTo(150, 50)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineCap('square')
    ctx.setLineWidth(10)
    ctx.moveTo(10, 70)
    ctx.lineTo(150, 70)
    ctx.stroke()

    ctx.draw()
  },
  setLineDash() {
    ctx.beginPath()
    ctx.setLineDash([10, 20], 5)

    ctx.beginPath()
    ctx.moveTo(0, 100)
    ctx.lineTo(400, 100)
    ctx.stroke()

    ctx.draw()
  },
  setLineJoin() {
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 50)
    ctx.lineTo(10, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineJoin('bevel')
    ctx.setLineWidth(10)
    ctx.moveTo(50, 10)
    ctx.lineTo(140, 50)
    ctx.lineTo(50, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineJoin('round')
    ctx.setLineWidth(10)
    ctx.moveTo(90, 10)
    ctx.lineTo(180, 50)
    ctx.lineTo(90, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineJoin('miter')
    ctx.setLineWidth(10)
    ctx.moveTo(130, 10)
    ctx.lineTo(220, 50)
    ctx.lineTo(130, 90)
    ctx.stroke()

    ctx.draw()
  },
  setMiterLimit() {
    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(1)
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 50)
    ctx.lineTo(10, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(2)
    ctx.moveTo(50, 10)
    ctx.lineTo(140, 50)
    ctx.lineTo(50, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(3)
    ctx.moveTo(90, 10)
    ctx.lineTo(180, 50)
    ctx.lineTo(90, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(4)
    ctx.moveTo(130, 10)
    ctx.lineTo(220, 50)
    ctx.lineTo(130, 90)
    ctx.stroke()

    ctx.draw()
  },
  setTextAlign() {
    ctx.setStrokeStyle('red')
    ctx.moveTo(150, 20)
    ctx.lineTo(150, 170)
    ctx.stroke()

    ctx.setFontSize(15)
    ctx.setTextAlign('left')
    ctx.fillText('textAlign=left', 150, 60)

    ctx.setTextAlign('center')
    ctx.fillText('textAlign=center', 150, 80)

    ctx.setTextAlign('right')
    ctx.fillText('textAlign=right', 150, 100)

    ctx.draw()
  },
  setTextBaseline() {
    ctx.beginPath()
    ctx.setStrokeStyle('red')
    ctx.moveTo(5, 75)
    ctx.lineTo(295, 75)
    ctx.stroke()

    ctx.setFontSize(20)

    ctx.setTextBaseline('top')
    ctx.fillText('top', 5, 75)

    ctx.setTextBaseline('middle')
    ctx.fillText('middle', 50, 75)

    ctx.setTextBaseline('bottom')
    ctx.fillText('bottom', 120, 75)

    ctx.setTextBaseline('normal')
    ctx.fillText('normal', 200, 75)

    ctx.draw()
    ctx.beginPath()
  },
  translate() {
    ctx.beginPath()
    ctx.strokeRect(10, 10, 150, 100)
    ctx.translate(20, 20)
    ctx.strokeRect(10, 10, 150, 100)
    ctx.translate(20, 20)
    ctx.strokeRect(10, 10, 150, 100)

    ctx.draw()
    ctx.beginPath()
  }
});