"use strict";

var _adaptor = _interopRequireDefault(require("./adaptor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  /**
   * 静态文件列表
   * @param {String} srcPath
   * @returns {[String,String,String,String,String]}
   */
  getAssets(srcPath) {
    return [`${srcPath}/**/*.*`, `!${srcPath}/**/*.wxml`, `!${srcPath}/**/*.wxss`, `!${srcPath}/**/*.js`, `!${srcPath}/**/*.json`];
  }

};