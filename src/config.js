module.exports =  {
  getAssets: function(src) {
    return [
      src + "/**/*.*",
      "!" + src + "/**/*.wxml",
      "!" + src + "/**/*.wxss",
      "!" + src + "/**/*.js",
      "!" + src + "/**/*.json"
    ];
  }
};