const baiduConverter = require('./platform/baidu/converter');
const alibabaConverter = require('./platform/alibaba/converter');
const toutiaoConverter = require('./platform/toutiao/converter');
const baiduLint = require('./platform/baidu/codeLint');

module.exports = {
  toBaidu: (opt) => {
    baiduConverter(Object.assign({}, opt, { target: opt.baiduTarget }));
    baiduLint(Object.assign({}, opt, { target: opt.baiduTarget }));
  },
  toAlibaba: alibabaConverter,
  toToutiao: toutiaoConverter,

  toAll: (opt) => {
    baiduConverter(Object.assign({}, opt, { target: opt.baiduTarget }));
    alibabaConverter(Object.assign({}, opt, { target: opt.alibabaTarget }));
    toutiaoConverter(Object.assign({}, opt, { target: opt.toutiaoTarget }));
  }
};