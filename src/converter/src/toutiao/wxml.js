function convert(wxmlText) {
  return wxmlText
    .replace(/wx:/g, 'tt:')
    .replace(/tt:for-items/g, 'tt:for')
    .replace(/\.wxml/g, '.ttml')
    .replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, (match) => {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => `https:${m}`);
    })
    .replace(/url\((\/\/[^'"]+)\)/ig, (match) => {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => `https:${m}`);
    })
    .replace(/url=["']{{([^{}\s?=]+)}}/ig, (match, p1) => {
      // url属性值必须带协议
      return match.replace(p1, `(${p1}[0]=='/' && ${p1}[1]=='/') ? 'https:' + ${p1}:${p1}`);
    })
    .replace(/url\({{([^{}\s?=]+)}}/ig, (match, p1) => {
      // 背景url属性值必须带协议
      return match.replace(p1, `(${p1}[0]=='/' && ${p1}[1]=='/') ? 'https:' + ${p1}:${p1}`);
    })
    // progress属性映射
    .replace(/<progress[^>]+(activeColor|backgroundColor)=/g, (match, p1) => match.replace(p1, p1.replace(/[A-Z]/, (m) => `-${m.toLowerCase()}`)))
    // slider属性映射
    .replace(/<slider[^>]+(activeColor|backgroundColor)=/g, (match, p1) => match.replace(p1, p1.replace(/[A-Z]/, (m) => `-${m.toLowerCase()}`)))
    .replace(/<slider[^>]+(block-size|block-color)=/g, (match, p1) => match.replace(p1, p1.replace('block', 'handle')));
}

module.exports = convert;