const baiduConverter = require('./platform/baidu/converter');
const alibabaConverter = require('./platform/alibaba/converter');
const toutiaoConverter = require('./platform/toutiao/converter');

module.exports = {
  toBaidu: baiduConverter,
  toAlibaba: alibabaConverter,
  toToutiao: toutiaoConverter,

  toAll: (opt) => {
    baiduConverter(Object.assign({}, opt, { dest: opt.baiduDest }));
    alibabaConverter(Object.assign({}, opt, { dest: opt.alibabaDest }));
    toutiaoConverter(Object.assign({}, opt, { dest: opt.toutiaoDest }));
  }
};