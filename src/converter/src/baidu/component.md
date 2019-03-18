#视图容器
##view
###组件属性缺失
|属性名|类型|默认值|说明|
|-----|----|----|----|
|aria-role| String ||无障碍访问，（角色）标识元素的作用|
|aria-label|String||无障碍访问，（属性）元素的额外描述|
#### 注意事项:
- <font color="#E6A23C">百度小程序从基础库版本1.12.0开始支持事件捕获、冒泡。</font>

##scroll-view

###组件属性缺失
|属性名|类型|默认值|说明|
|-----|----|----|----|
|enable-back-to-top| Boolean |false|iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向|
|aria-label|String||无障碍访问，（属性）元素的额外描述|
#### 注意事项:
- <font color="#E6A23C">微信小程序中upper-threshold、lower-threshold单位px，2.4.0起支持rpx,百度小程序中单位是px</font>

##swiper
###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|skip-hidden-item-layout|Boolean|false|是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息|

###组件方法缺失

|事件名|类型|用法|说明|
|-----|----|----|----|
|bindtransition|EventHandle| bindtransition ="事件名"|swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}|

#### 注意事项:
- <font color="#E6A23C">indicator-active-color属性默认值不同,微信中是#000000,百度中是#333</font>
- <font color="#E6A23C">previous-margin、next-margin属性在微信中接受px和rpx值,百度中是px</font>

##movable-view

#### 注意事项:
- <font color="#E6A23C">该组件bindchange事件返回值source中,百度中无touch-out-of-bounds（超出移动范围）</font>
- <font color="#E6A23C">该组件bindchange事件返回值source中,惯性在微信中是friction,百度中是inertia</font>

##cover-view

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|scroll-top|Number / String||设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效（单位px，2.4.0起支持rpx）|
|aria-role|String||无障碍访问，（角色）标识元素的作用|
|aria-label|String||无障碍访问，（属性）元素的额外描述|

#### 注意事项:
- <font color="#E6A23C">微信中该组件覆盖在原生组件之上的文本视图，可覆盖的原生组件包括map、video、canvas、camera、live-player、live-pusher，只支持嵌套cover-view、cover-image，可在cover-view中使用button。</font>
- <font color="#E6A23C">百度中该组件覆盖在原生组件之上的文本视图，可覆盖的原生组件包括 video 、 canvas 、 camera，只支持嵌套 cover-view 、 cover-image 。</font>

##cover-image

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|aria-role|String||无障碍访问，（角色）标识元素的作用|
|aria-label|String||无障碍访问，（属性）元素的额外描述|

#### 注意事项:
- <font color="#E6A23C">该组件Bug & Tips部分微信和百度小程序不太一样,具体请参考组件说明部分</font>

#基础内容

##icon

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|aria-label|String||无障碍访问，（属性）元素的额外描述 2.5.0|

###组件属性不同部分

|小程序平台|属性名|类型|默认值|说明|
|-----|----|----|----|----|
|百度小程序|size|Number|23|icon 的大小，单位是 px|
|微信小程序|size|Number / String|23|icon的大小，单位px（2.4.0起支持rpx）|

#### 注意事项:
- <font color="#E6A23C">该组件属性size类型在百度中是Number类型,在微信中是Number/String</font>
- <font color="#E6A23C">该组件属性size的单位在微信小程序中是px（2.4.0起支持rpx）,百度中小程序中是px</font>

##text

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|decode|Boolean|false|是否解码|

#### 注意事项:
- <font color="#E6A23C">该组件Tips说明部分百度没有指出decode属性</font>

##rich-text

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|space|String||显示连续空格|

##progress

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|border-radius|Number / String|0|圆角大小，单位px（2.4.0起支持rpx）|
|font-size|Number / String|16|右侧百分比字体大小，单位px（2.4.0起支持rpx）|
|aria-label|String||无障碍访问，（属性）元素的额外描述|

###组件方法缺失

|事件名|类型|用法|说明|
|-----|----|----|----|
|bindactiveend|EventHandle| bindactiveend ="事件名"|动画完成事件|

#### 注意事项:
- <font color="#E6A23C">该组件属性stroke-width的类型在微信小程序中是Number / String,默认值是6,单位是px（2.4.0起支持rpx）,在百度小程序中是Number,默认值是2,单位是px</font>

###### 说明

- <font color="#E6A23C">百度小程序中此模块多了一个animation-view组件(Lottie动画组件),具体组件信息可查看百度组件文档</font>

##button

###组件属性缺失

|属性名|类型|默认值|说明|生效时机|
|-----|----|----|----|----|
|lang|String|en|指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。|open-type="getUserInfo"|
|session-from|String||会话来源|open-type="contact"|
|send-message-title|String|当前标题|会话内消息卡片标题|open-type="contact"|
|send-message-path|String|当前分享路径|会话内消息卡片点击跳转小程序路径|open-type="contact"|
|send-message-img|String|截图|会话内消息卡片图片|open-type="contact"|
|show-message-card|Boolean|false|是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息|open-type="contact"|
|app-parameter|String||打开 APP 时，向 APP 传递的参数|open-type="launchApp"|
|aria-label|String||无障碍访问，（属性）元素的额外描述|

###组件方法缺失

|事件名|类型|用法|说明|生效时机|
|-----|----|----|----|-----|
|bindcontact|Handler| bindcontact ="事件名"|客服消息回调|open-type="contact"|
|binderror|Handler| binderror ="事件名"|当使用开放能力时，发生错误的回调|open-type="launchApp"|
|bindlaunchapp|Handler| bindlaunchapp ="事件名"|打开 APP 成功的回调|open-type="launchApp"|

#### 注意事项:
- <font color="#E6A23C">该组件属性open-type 有效值：launchApp (打开APP，可以通过app-parameter属性设定向APP传的参数具体说明)、feedback (打开“意见反馈”页面，用户可提交反馈内容并上传日志，开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容)在百度小程序中无这两个值</font>

- <font color="#E6A23C">该组件百度小程序无说明和注意事项部分</font>

##checkbox

###组件属性缺失

|属性名|类型|默认值|说明|
|-----|----|----|----|
|aria-label|String||无障碍访问，（属性）元素的额外描述|

##form

#### 注意事项:
- <font color="#E6A23C">该组件bindsubmit返回值百度小程序未指明</font>















































