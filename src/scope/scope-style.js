const postcss = require('postcss');
const scopeId = require('./scope-id');

/**
 * 样式文本scope处理
 * @param {String} id       模块ID
 * @param {String} content  样式文本
 * @returns {Promise.<String>|Promise|Function|String}
 */
module.exports = function (id, content) {
  // postcss process 返回结果是 LazyResult
  // lazy 的 catch then 返回的是 Promise
  return postcss([scopeId(id)])
    .process(content)
    .then((result) => {
      return result.css;
    }).catch((e) => {
      return e;
    });
};