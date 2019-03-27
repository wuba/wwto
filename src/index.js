const baiduLinter = require('./platform/baidu/linter');
const alibabaLinter = require('./platform/alibaba/linter');
const toutiaoLinter = require('./platform/toutiao/linter');
const baiduConverter = require('./platform/baidu/converter');
const alibabaConverter = require('./platform/alibaba/converter');
const toutiaoConverter = require('./platform/toutiao/converter');
const pluginConverter = require('mp-plugin');

module.exports = {
  lintBaidu: baiduLinter,
  lintAlibaba: alibabaLinter,
  lintToutiao: toutiaoLinter,
  lintAll: (opt) => {
    baiduLinter(opt);
    alibabaLinter(opt);
    toutiaoLinter(opt);
  },

  toBaidu: (opt) => {
    baiduConverter(opt);
    baiduLinter(opt.source);
  },
  toAlibaba: (opt) => {
    alibabaConverter(opt);
    alibabaLinter(opt.source);
  },
  toToutiao: (opt) => {
    toutiaoConverter(opt);
    toutiaoLinter(opt.source);
  },

  toAll: (opt) => {
    baiduConverter(Object.assign({}, opt, { target: opt.baiduTarget }));
    alibabaConverter(Object.assign({}, opt, { target: opt.alibabaTarget }));
    toutiaoConverter(Object.assign({}, opt, { target: opt.toutiaoTarget }));

    baiduLinter(opt.source);
    alibabaLinter(opt.source);
    toutiaoLinter(opt.source);
  },
  convertPlugin: (opt) => {
    pluginConverter.convert(opt);
  }
};