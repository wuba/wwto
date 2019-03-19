module.exports = [

  //  view
  //  zfb 缺失属性
  //  aria-role, aria-label

  //  scroll-view
  //  zfb 缺失属性
  //  aria-label
  //  zfb 事件对应
  //  bindscrolltoupper => onScrollToUpper
  //  bindscrolltolower => onScrollToLower
  //  bindscroll => onScroll

  //  swiper
  //  zfb 缺失属性
  //  current-item-id,display-multiple-items,skip-hidden-item-layout
  //  zfb 事件对应
  //  bindchange => onChange
  //  zfb 缺失事件
  //  bindtransition,bindanimationfinish
  //  swiper-item 缺失item-id

  //  movable-view
  //  zfb 缺失属性
  //  inertia,out-of-bounds,damping,friction,scale,scale-min,scale-max,scale-value,animation
  //  zfb 事件对应
  //  bindchange=>onChange
  //  缺失事件
  //  bindscale,htouchmove,vtouchmove

  //  movable-area
  //  缺失属性
  //  scale-area

  //  cover-view
  //  缺失属性
  //  scroll-top,aria-role,aria-label

  //  cover-image
  //  缺失属性
  //  aria-role,aria-label
  //  缺失事件
  //  bindload,binderror

  //  icon
  //  缺失属性
  //  aria-label

  //  text
  //  缺失属性
  //  space,decode

  //  rich-text
  //  缺失属性
  //  space

  //  progress
  //  缺失属性
  //  border-radius,font-size,color,active-mode,aria-label
  //  对应属性
  //  activeColor -> active-color
  //  backgroundColor -> background-color
  //  缺失事件
  //  bindactiveend

  //  button
  //  缺失属性
  //  lang,session-from,send-message-title,send-message-path,send-message-img,show-message-card
  //  app-parameter,aria-label
  //  缺失事件
  //  bindgetuserinfo,bindcontact,bindgetphonenumber,binderror,bindlaunchapp,bindopensetting
  //  open-type 不同
  //  缺失 contact,getUserInfo,getPhoneNumber,openSetting,feedback

  //  checkbox-group
  //  事件对应
  //  bindchange =>onChange

  //  checkbox
  //  缺失属性
  //  aria-label

  //  form
  //  对应事件
  //  bindsubmit =>onSubmit
  //  bindreset =>onReset

  //  input
  //  缺失属性
  //  cursor-spacing,auto-focus,adjust-position,aria-label
  //  对应事件
  //  bindinput => onInput
  //  bindfocus => onFocus
  //  bindblur => onBlur
  //  bindconfirm => onConfirm


  //  label=label

  //  picker
  //  缺失属性 mode 只是普通选择器
  //  对应事件
  //  bindchange=>onChange
  //  缺失事件
  //  bindcancel

  //  picker-view
  //  对应事件
  //  bindchange => onChange
  //  缺失事件
  //  bindpickstart,bindpickend

  //  radio-group
  //  对应事件
  //  bindchange=>onChange

  //  radio
  //  缺失属性
  //  aria-label

  //  slider
  //  缺失属性
  //  color
  //  对应属性
  //  activeColor->active-color
  //  backgroundColor->background-color
  //  block-size->handle-size
  //  block-color->handle-color
  //  对应事件
  //  bindchange=>onChange
  //  bindchanging=>onChanging

  //  switch
  //  缺失属性
  //  type
  //  对应事件
  //  bindchange=>onChange

  //  textarea
  //  缺失属性
  //  auto-focus,fixed,cursor-spacing,cursor,show-confirm-bar
  //  selection-start,selection-end,adjust-position,aria-label
  //  对应事件
  //  bindfocus=>onFocus
  //  bindblur=>onBlur
  //  bindinput=>onInput
  //  bindconfirm=>onConfirm
  //  缺失事件
  //  bindlinechange

  //  navigator
  //  缺失属性
  //  target,delta,app-id,path,extra-data,version,hover-stop-propagation
  //  缺失事件
  //  bindsuccess,bindfail,bindcomplete

  'functional-page-navigator',
  'audio',
  'video',
  'camera',
  'live-player',
  'live-pusher',

  //  image
  //  对应事件
  //  binderror=>onError
  //  bindload=>onLoad

  //  map
  //  缺失属性
  //  covers,subkey,enable-3D,show-compass
  //  enable-overlooking,enable-zoom,enable-scroll,enable-rotate
  //  对应事件
  //  bindmarkertap => onMarkerTap
  //  bindcallouttap => onCalloutTap
  //  bindcontroltap => onControlTap
  //  bindregionchange => onRegionChange
  //  bindtap => onTap
  //  无对应事件
  //  bindupdated,bindpoitap
  //  markers
  //  缺失属性
  //  zIndex
  //  markers 对应事件
  //  anchor -> anchorX,anchorY
  //

  //  canvas
  //  对应属性
  //  canvas-id -> id
  //  对应事件
  //  bindtouchstart => onTouchStart
  //  bindtouchmove => onTouchMove
  //  bindtouchend => onTouchEnd
  //  bindtouchcancel => onTouchCancel
  //  bindlongtap => onLongTap
  //  缺失事件
  //  binderror

  //web-view
  //缺失事件
  //bindload,binderror


  'open-data',
  'ad',
  'official-account'


];