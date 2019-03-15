module.exports = [
  //// 视图容器
  // view

  // 缺失属性  百度中无aria-role,aria-label属性
  // 注意事项  百度小程序从基础库版本1.12.0开始支持事件捕获、冒泡。

  // scroll-view

  // 缺失属性  百度中无enable-back-to-top,aria-label属性
  // 注意事项  微信小程序中属性upper-threshold、lower-threshold单位px，2.4.0起支持rpx,百度小程序中单位是px

  // swiper

  // 缺失属性  百度中无skip-hidden-item-layout属性
  // 缺失事件  百度中无bindtransition事件
  // 注意事项
  // 1.indicator-active-color属性默认值不同,微信中是#000000,百度中是#333
  // 2.previous-margin、next-margin属性在微信中接受px和rpx值,百度中是px

  // movable-area = movable-area
  // movable-view

  // 注意事项
  // 1.该组件bindchange事件返回值source有效值中,百度中无touch-out-of-bounds（超出移动范围）
  // 2.该组件bindchange事件返回值source中,惯性在微信中是friction,百度中是inertia

  // cover-view

  // 缺失属性  百度中无scroll-top、aria-role、aria-label属性
  // 注意事项
  // 1.微信中该组件覆盖在原生组件之上的文本视图，可覆盖的原生组件包括map、video、canvas、camera、live-player、live-pusher，只支持嵌套cover-view、cover-image，
  // 可在cover-view中使用button。
  // 2.百度中该组件覆盖在原生组件之上的文本视图，可覆盖的原生组件包括 video 、 canvas 、 camera，只支持嵌套 cover-view 、 cover-image 。

  // cover-image

  // 缺失属性  百度中无aria-role、aria-label属性
  // 注意事项
  // 1.该组件Bug & Tips部分微信和百度小程序不太一样,具体请参考组件说明部分

  ////基础内容
  // icon

  // 缺失属性  百度中无aria-label属性
  // 差异属性  size属性在微信中类型是Number / String,单位px（2.4.0起支持rpx）,百度中类型是是Number,单位是 px
  // 注意事项
  // 1.该组件属性size类型在百度中是Number类型,在微信中是Number/String
  // 2.该组件属性size的单位在微信小程序中是px（2.4.0起支持rpx）,百度中小程序中是px

  // text

  // 缺失属性  百度中无decode属性
  // 注意事项
  // 1.该组件Tips说明部分百度没有指出decode属性

  // rich-text

  // 缺失属性  百度中无space属性

  // progress
  // 缺失属性  百度中无border-radius、font-size、aria-label属性
  // 缺失事件  百度中无bindactiveend事件
  // 注意事项
  // 1.该组件属性stroke-width的类型在微信小程序中是Number / String,默认值是6,单位是px（2.4.0起支持rpx）,在百度小程序中是Number,默认值是2,单位是px

  // 说明
  // 百度小程序中此模块多了一个animation-view组件(Lottie动画组件),具体组件信息可查看百度组件文档

  //// 表单组件
  // button

  // 缺失属性  百度中无lang、session-from、send-message-title、send-message-path、send-message-img、show-message-card
  // app-parameter、aria-label属性
  // 缺失事件   百度中无bindcontact、binderror、bindlaunchapp事件
  // 注意事项
  // 1.该组件属性open-type 有效值：launchApp (打开APP，可以通过app-parameter属性设定向APP传的参数具体说明)、feedback (打开“意见反馈”页面，用户可提交反馈内容并上传日志，
  // 开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容)在百度小程序中无这两个值
  // 2.该组件百度小程序无说明和注意事项部分

  // checkbox
  // 缺失属性  百度中无aria-label	属性

  // form
  // 注意事项
  // 1.该组件bindsubmit返回值微信和百度不太一样,微信是event.detail = {value : {'name': 'value'} , formId: ''},百度是event.detail = {value : {'name': 'value'}}

  // input
  // 属性缺失  百度中无auto-focus、aria-label属性
  // 属性差异
  // 1.该组件属性cursor-spacing在微信小程序中单位是px（2.4.0起支持rpx）,类型是Number / String;百度小程序中是px,类型是Number
  // 2.该组件属性type有效值百度小程序中无idcard(身份证输入键盘)
  // 事件差异
  // 1.该组件事件bindinput返回值在微信小程序中是event.detail = {value, cursor, keyCode}，keyCode 为键值，2.1.0 起支持;百度小程序中是event.detail = {value, cursor}
  // 2.该组件事件bindfocus返回值在微信小程序中是event.detail = { value, height }，height 为键盘高度，在基础库 1.9.90 起支持;百度中是event.detail = {value: value}
  // 注意事项
  // 1.该组件Bug & Tip说明部分小程序和百度不完全一样,具体可参考文档
  // 2.百度小程序bug:在 iOS 端键盘弹起时会出现组件 bindtap 不生效的问题（部分场景，如：IM 聊天场景中的固定在页面底部的文本框与发送按钮），
  // 建议先使用 bindtouchstart 代替 bindtap。

  // label
  // label = label

  // picker
  // 缺失属性 mode="selector"、mode="multiSelector"和mode = "region"时,百度中多了一个title属性
  // 差异事件 mode = "region"时事件bindchange返回值微信中是event.detail = {value: value, code: code, postcode: postcode},
  // 其中字段code是统计用区划代码，postcode是邮政编码百度中是event.detail = {value: value}

  // picker-view
  // 缺失属性  百度中无aria-label属性
  // 缺失事件  百度中无bindpickstart	、bindpickend事件
  // 注意事项  微信中该组件滚动时在iOS自带振动反馈，可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭

  // radio
  // 缺失属性  百度中无aria-label属性

  // slider
  // 缺失属性  百度中无color、aria-label属性
  // 差异属性
  // 1.属性activeColor默认值在微信中是#1aad19,百度中是#3c76ff
  // 2.属性backgroundColor默认值在微信中是#e9e9e9,百度中是#cccccc
  // 3.属性block-size默认值在微信中是28,百度中是24

  // switch
  // 缺失属性  百度中无aria-label属性
  // 差异事件  bindchange事件返回值在微信中是event.detail={ value:checked},百度中是event.detail={ checked:true}

  // textarea
  // 差异属性  属性cursor-spacing在微信中类型是Number / String,单位px（2.4.0起支持rpx）;百度中类型是Number,单位是px
  // 缺失属性  百度中无aria-label属性
  // 差异事件  事件bindlinechange的返回值在微信中是event.detail = {value, cursor, keyCode}，keyCode 为键值，目前工具还不支持返回keyCode参数,百度
  // 中是event.detail = {value, cursor}


  //// 导航

  // navigator
  // 缺失属性  百度中无aria-label属性

  'functional-page-navigator', // 仅在插件中有效，用于跳转到插件功能页。

  //// 媒体组件

  // audio
  // audio = audio
  // 注意事项  微信中1.6.0 版本开始，该组件不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口

  // image

  // 缺失属性  百度中无aria-label属性
  // 注意事项
  // 1.属性lazy-load微信中说明是在即将进入当前屏幕可视区域时才开始加载,百度中是只针对 scroll-view 下的 image 有效
  // 2.微信中image组件中二维码/小程序码图片不支持长按识别。仅在wx.previewImage中支持长按识别,百度中文档未说明

  // video

  // 缺失属性  百度中无direction、show-mute-btn、title、play-btn-position、enable-play-gesture、auto-pause-if-navigate、auto-pause-if-open-native
  // vslide-gesture-in-fullscreen属性
  // 差异属性  属性（当视频大小与 video 容器大小不一致时，视频的表现形式）微信中命名是object-fit,百度中命名是objectFit
  // 缺失事件  百度中无bindplay、bindprogress事件
  // 注意事项
  // 1.微信中属性(在非全屏模式下，是否开启亮度与音量调节手势)有两种：page-gesture(废弃)和vslide-gesture,百度中是page-gesture
  // 2.该组件支持的视频格式和支持的视频编码格式在百度和微信中不一样

  //camera

  // 缺失属性  百度中无mode属性
  // 缺失事件  百度中无bindscancode事件
  // 注意事项  组件Bug & Tip说明部分微信和百度中不完全一样

  // live-player

  // 缺失属性  百度中无mode、sound-mode、auto-pause-if-navigate	、auto-pause-if-open-native属性
  // 差异属性
  // 1.属性src在微信中仅支持 flv, rtmp 格式,百度中仅支持m3u8 格式
  // 2.属性background-mute在微信中已废弃
  // 3.百度中有id属性(live-player 属性的唯一标志符),微信没有
  // 4.微信说明部分和百度不完全一样,微信中该组件在开发者工具上暂不支持;百度中从基础库版本1.12.0开始支持事件捕获、冒泡。
  // 5.该组件在微信和百度中应用场景不完全一样,具体可看文档
  'live-pusher', // 实时音视频录制

  // 说明：百度小程序此模块多了一个组件ar-camera

  //// 地图

  // map
  // 缺失属性  百度中无subkey属性
  // 差异属性
  // 1.属性show-compass、polygons、enable-overlooking	、enable-zoom、enable-scroll、enable-rotate百度中工具暂不支持

  // 2.属性markers中百度无zIndex,aria-label

  // 3.属性marker上的气泡callout百度无borderColor、borderWidth;属性marker上的气泡callout中的fontSize、borderRadius、borderWidth、padding
  // 微信中类型是Number / String,百度中是Number

  // 4.属性marker上的气泡label中fontSize、borderWidth、borderRadius、padding在微信中是Number / String,百度中是Number;属性marker上的气泡label中百度无anchorX、anchorY

  // 5.属性polygons百度中无具体说明

  // 缺失事件  百度中无bindpoitap	事件

  // 差异事件  事件bindcallouttap、bindcontroltap事件返回值在微信中会返回marker的id,bindcontroltap会返回control的id

  // 注意事项

  // 1.属性marker上的气泡label中的x,y在微信中已经废弃
  // 2.事件bindregionchange百度中没有具体说明事件的返回值

  //// 画布

  // canvas


  //// 开放能力

  // open-data

  // web-view

  'ad', // 广告。目前暂时以邀请制开放申请，请留意后续模板消息的通知
  'official-account' // 用户扫码打开小程序时，开发者可在小程序内配置公众号关注组件，方便用户快捷关注公众号，可嵌套在原生组件内。

];