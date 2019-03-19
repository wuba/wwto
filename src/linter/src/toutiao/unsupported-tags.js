module.exports = [
  'movable-area',
  'movable-view',
  'cover-view',
  'cover-image',
  'map',
  'audio',
  'camera',
  'live-player',
  'live-pusher',
  //// 视图容器

  // view

  // 缺失属性  头条中无aria-role、aria-label属性

  // scroll-view

  // 差异属性
  // 1.属性upper-threshold	、lower-threshold、scroll-top、scroll-left在微信中单位px,2.4.0起支持rpx,类型是Number / String;头条中单位px,类型是Number;
  // 注意事项
  // 1.组件Bug & Tip说明部分在微信中有具体阐述,头条中没有
  // 2.bindscroll事件头条文档中没有对事件返回值进行说明,微信中事件返回值是event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}

  // swiper

  // 缺失事件  头条中无bindtransition、bindanimationfinish事件
  // 注意事项  头条中Bug & Tip说明部分

  //// 基础内容

  // text

  // 注意事项  Bug & Tip说明部分微信和头条不完全一样
  // 1.微信：bug : 基础库版本低于 2.1.0 时， <text> 组件内嵌的 <text> style 设置可能不会生效;
  //   decode可以解析的有 &nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;
  //   各个操作系统的空格标准并不一致。
  // 2.头条：文本中的 \n 会换行;警告：<text/> 是个组件，性能不如文本节点，如无必要，请优先使用纯文本节点;

  // rich-text

  // 差异
  // 1.头条中未对nodes属性进行详细阐述;未说明该组件支持默认事件有哪些;
  // 注意事项  头条文档中无Bug & Tip说明部分

  // progress

  // 缺失事件  头条中无bindactiveend事件
  // 差异属性
  // 1.属性percent微信中类型是Float,默认值是空;头条中类型是Number,默认值是0;
  // 2.属性stroke-width微信中类型是Number / String,单位px（2.4.0起支持rpx）;头条中类型是是Number,单位没有说明
  // 3.属性color默认值不同:微信中是#09BB07,头条中是#F85959
  // 4.属性(已选择的进度条的颜色)在微信中是activeColor,默认值为空;头条是active-color,默认值为#F85959
  // 5.属性(未选择的进度条的颜色)在微信中是backgroundColor,默认值为空;头条是background-color,默认值为#EBEBEB
  // 6.颜色类型的属性在微信中类型是Color,头条中是String

  // icon

  // 差异属性
  // 1.属性size微信中类型是Number / String,单位px（2.4.0起支持rpx）;头条中类型是Number,单位px
  // 2.属性color微信中类型是Color,头条中是String

  //// 表单组件

  // button

  //  差异属性
  // 1.属性type取值范围微信和头条不太一样,微信中是primary(绿色)、default(白色)、warn(红色);头条中是primary(红色)、default(白色)
  // 2.属性open-type有效值头条中目前只支持share
  //  缺失事件  头条中无bindgetuserinfo、bindcontact、bindgetphonenumber、bindlaunchapp、binderror、bindopensetting事件
  // 注意事项
  // 1.Bug & Tip说明部分微信和头条不完全一样
  // 2.头条中温馨提示：<button>组件的边框不是通过border属性来控制的，而是有个:after伪类，所以如果需要修改边框样式，请对改伪类元素设置样式
  // 3.微信tip: 目前，设置了 form-type 的 button 只会对当前组件中的 form 有效。因而，将 button 封装在自定义组件中，而 from 在自定义组件外，将会使这个 button 的 form-type 失效

  // checkbox-group

  // checkbox-group = checkbox-group

  // checkbox

  // 缺失属性 头条中无aria-label属性

  // form

  // 差异事件  事件bindsubmit微信中事件返回值是event.detail = {value : {'name': 'value'} , formId: ''};
  //         头条中是event.detail = {value : {'name': 'value'} , target: ''}

  // input

  // 差异属性
  // 1.属性cursor-spacing微信中类型是Number / String	,单位px（2.4.0起支持rpx）;头条中类型是Number,单位未说明
  // 2.属性cursor微信中无默认值,头条默认值为-1
  // 差异事件  事件bindinput微信中返回值是event.detail = {value, cursor, keyCode}，keyCode 为键值，2.1.0 起支持;
  //         头条中是e.detail={value, cursor}
  // 注意事项
  // 1.Bug & Tip微信和头条不完全一样;
  // 2.头条中警告：避免过于频繁地在bindinput回调里执行setData({value: ...})，
  // 如果想在键盘输入时改变input框的值，可以直接在bindinput回调里return一个字符串

  // label

  // label = label

  // picker

  // 差异事件  mode = region时事件bindchange返回值在微信中是event.detail = {value: value, code: code, postcode: postcode}，其中字段code是统计用区划代码，postcode是邮政编码
  // 头条中是event.detail = {value: value, code: code}, 其中字段code是统计用区划代码

  // picker-view

  // 缺失事件  头条中无bindpickstart、bindpickend事件
  // 注意事项  微信中tip: 滚动时在iOS自带振动反馈，可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭

  // radio

  // 缺失属性  头条中无aria-label属性

  // slider

  // 差异属性
  // 1.属性(背景条的颜色)在微信中是backgroundColor,头条中是background-color;
  // 2.属性(已选择的颜色)在微信中是activeColor,头条中是active-color

  // switch

  // 注意事项  微信：tip: switch类型切换时在iOS自带振动反馈，可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭

  // textarea

  // 差异属性  属性cursor-spacing在微信中类型是Number / String	,单位px（2.4.0起支持rpx）;头条中类型是Number,单位未说明
  // 缺失事件  头条中无bindlinechange事件
  // 差异事件
  // 1.事件bindblur微信中返回值是event.detail = {value, cursor};头条中返回值是event.detail={value};
  // 2.事件bindinput微信中返回值是event.detail = {value, cursor, keyCode}，keyCode 为键值，
  // 目前工具还不支持返回keyCode参数。bindinput 处理函数的返回值并不会反映到 textarea 上;头条中是e.detail={value, cursor}
  // 注意事项
  // 1.Bug & Tip说明部分微信和头条不完全一样,具体可参考文档
  // 2.头条中警告：请勿在 scroll-view、swiper、picker-view 中使用 textarea 组件;css 动画对 textarea 组件无效

  // 导航

  // navigator

  // 差异属性  属性open-type取值范围头条中无reLaunch、exit
  // 缺失事件  头条中无bindsuccess、bindfail	、bindcomplete
  // 注意事项  头条中对该组件使用限制、关于调试部分未作说明

  'functional-page-navigator', // 仅在插件中有效，用于跳转到插件功能页

  //// 媒体组件

  // image

  // 差异属性  属性lazy-load	说明部分在微信和头条中不完全一样,
  // 1.头条中说明部分是图片懒加载。只针对page与scroll-view下的img有效;
  // 2.微信中是图片懒加载，在即将进入当前屏幕可视区域时才开始加载
  // 差异事件  头条中未对事件binderror、bindload返回值做具体说明,
  // 1.微信中这两个事件返回值是event.detail = {errMsg: 'something wrong'}、event.detail = {height:'图片高度px', width:'图片宽度px'}

  // video

  // 差异属性  该组件头条中只有两个属性,分别是src和autoplay
  // 缺失事件  头条中无bindplay、bindpause、bindended、bindtimeupdate、bindfullscreenchange、bindwaiting、binderror、bindprogress事件
  // 注意事项  头条中未对该组件支持的格式和支持的编码格式做具体说明

  //// 画布

  // canvas

  // 缺失事件  头条中无bindtouchstart、bindtouchmove、bindtouchend、bindtouchcancel、bindlongtap、binderror事件
  // 注意事项  微信中
  // 1.说明同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作
  // 2.bug: 避免设置过大的宽高，在安卓下会有crash的问题

  //// 开饭能力

  // web-view

  // 缺失事件  头条中无bindload、binderror事件
  // 差异事件  事件bindmessage返回值头条未做说明
  // 注意事项
  // 1.该组件相关接口 1部分头条中无wx.miniProgram.postMessage
  // (向小程序发送消息，会在特定时机（小程序后退、组件销毁、分享）触发组件的message事件)、wx.miniProgram.getEnv(获取当前环境)
  // 2.头条中该组件无相关接口2、3、4、5
  // 3.头条中没有Bug & Tip说明部分

  'open-data',
  'ad',
  'official-account',
























];