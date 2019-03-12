function convert(wxssText) {
  return wxssText
    .replace(/\.wxss(["'])/g, function(match, p1) {
      return p1;
    })
    .replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    })
    .replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    });
}

module.exports = convert;