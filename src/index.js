const baiduConverter = require('./platform/baidu/converter');
const alibabaConverter = require('./platform/alibaba/converter');
const toutiaoConverter = require('./platform/toutiao/converter');

console.log(webrtc);
module.exports = {
  toBaidu: baiduConverter,
  toAlibaba: alibabaConverter,
  toToutiao: toutiaoConverter,

  toAll: (opt) => {
    baiduConverter(Object.assign({}, opt, { target: opt.baiduTarget }));
    alibabaConverter(Object.assign({}, opt, { target: opt.alibabaTarget }));
    toutiaoConverter(Object.assign({}, opt, { target: opt.toutiaoTarget }));
  }
};