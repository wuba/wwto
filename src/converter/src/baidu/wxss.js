function convert(cssText) {
  return cssText
    .replace(/\.wxss(["'])/g, (match, p1) => {
      // 移除后缀
      return p1;
    })
    .replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, (match) => {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => `https:${m}`);
    })
    .replace(/url\((\/\/[^'"]+)\)/ig, (match) => {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => `https:${m}`);
    })
    .replace(/[,}\n]+[\s]*image[,\s{]/ig, (match) => {
      // 修复不支持image子元素选择器的问题
      return match.replace(/image/g, '.fix-image-cls');
    });
}

module.exports = convert;