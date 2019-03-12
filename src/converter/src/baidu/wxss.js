function convert(cssText) {
  return cssText
    .replace(/\.wxss(["'])/g, function(match, p1) {
      // 移除后缀
      return p1;
    })
    .replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    })
    .replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    })
    .replace(/[,}\n]+[\s]*image[,\s{]/ig, function(match, p1) {
      // 修复不支持image子元素选择器的问题
      return match.replace(/image/g, '.fix-image-cls');
    });
}

module.exports = convert;