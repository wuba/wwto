const postcss = require('postcss');
const scopeId = require('./scope-id');

module.exports = function (id, content) {
  // postcss process 返回结果是 LazyResult
  // lazy 的 catch then 返回的是 Promise
  return postcss([scopeId(id)])
    .process(content)
    .then(function (result) {
      return result.css
    }).catch((e) => {
      return e;
    });
};