var wx = require('./../../../adaptor.js').default;
module.exports = [
  {
    tag: 'view',
    attrs: [
      'aria-role',
      'aria-label'
    ]
  },
  {
    tag: 'scroll-view',
    attrs: [
      'aria-label',
      'enable-back-to-top'
    ]
  },
  {
    tag: 'swiper',
    attrs: [
      'previous-margin',
      'next-margin',
      'skip-hidden-item-layout'
    ]
  },
  {
    tag: 'rich-text',
    attrs: [
      'space',
    ]
  },
  {
    tag: 'progress',
    attrs: [
      'show-info',
      'border-radius',
      'font-size',
      'aria-label'
    ]
  },
  {
    tag: 'icon',
    attrs: [
      'aria-label'
    ]
  },
  {
    tag: 'button',
    attrs: [
      'plain',
      'lang',
      'session-from',
      'send-message-title',
      'send-message-path',
      'send-message-img',
      'show-message-card',
      'app-parameter',
      'aria-label'
    ]
  },
  {
    tag: 'checkbox',
    attrs: [
      'aria-label'
    ]
  },
  {
    tag: 'form',
    attrs: [
      'report-submit'
    ]
  },
  {
    tag: 'input',
    attrs: [
      'placeholder-class',
      'confirm-type',
      'confirm-hold',
      'adjust-position',
      'aria-label'
    ]
  },
  {
    tag: 'picker-view',
    attrs: [
      'indicator-class',
      'mask-class',
      'aria-label',
    ]
  },
  {
    tag: 'radio',
    attrs: [
      'aria-label',
    ]
  },
  {
    tag: 'slider',
    attrs: [
      'aria-label',
    ]
  },
  {
    tag: 'switch',
    attrs: [
      'aria-label',
      'disabled'
    ]
  },
  {
    tag: 'textarea',
    attrs: [
      'placeholder-class',
      'auto-focus',
      'show-confirm-bar',
      'adjust-position',
      'aria-label'
    ]
  },
  {
    tag: 'navigator',
    attrs: [
      'target',
      'app-id',
      'path',
      'extra-data',
      'version',
      'aria-label'
    ]
  },
  {
    tag: 'image',
    attrs: [
      'aria-label',
    ]
  },
  {
    tag: 'video',
    attrs: [
      'duration',
      'controls',
      'danmu-list',
      'danmu-btn',
      'enable-danmu',
      'loop',
      'muted',
      'initial-time',
      'direction',
      'show-progress',
      'show-fullscreen-btn',
      'show-play-btn',
      'show-center-play-btn',
      'enable-progress-gesture',
      'object-fit',
      'poster',
      'show-mute-btn',
      'title',
      'play-btn-position',
      'enable-play-gesture',
      'auto-pause-if-navigate',
      'auto-pause-if-open-native',
      'vslide-gesture',
      'vslide-gesture-in-fullscreen'
    ]
  },
  {
    tag: 'canvas',
    attrs: [
      'disable-scroll',
    ]
  },
];