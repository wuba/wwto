module.exports =  {
  /**
   * 静态文件列表
   * @param {String} srcPath
   * @returns {[String,String,String,String,String]}
   */
  getAssets: function(srcPath) {
    return [
      srcPath + "/**/*.*",
      "!" + srcPath + "/**/*.wxml",
      "!" + srcPath + "/**/*.wxss",
      "!" + srcPath + "/**/*.js",
      "!" + srcPath + "/**/*.json"
    ];
  }
};