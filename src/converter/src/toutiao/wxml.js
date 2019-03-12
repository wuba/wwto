function convert(wxmlText) {
  return wxmlText
    .replace(/wx:/g, 'tt:')
    .replace(/tt:for-items/g, 'tt:for')
    .replace(/\.wxml/g, '.ttml')
    .replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    })
    .replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    })
    .replace(/url=["']{{([^{}\s\?=]+)}}/ig, function(match, p1) {
      // url属性值必须带协议
      return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
    })
    .replace(/url\({{([^{}\s\?=]+)}}/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
    });
}

module.exports = convert;