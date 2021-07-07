function convert(wxmlText, isWpy) {
  return wxmlText
    .replace(/wx:/g, 'a:')
    .replace(/a:for-items/g, 'a:for')
    .replace(/a:for-key/g, 'a:key')
    .replace(/\.wxml/g, '.axml')
    .replace(/\s+formType=['"]\w+['"]/g, (match) => match.replace('formType', 'form-type'))
    // canvas-id to id
    .replace(/<canvas[^>]+(canvas-id)=['"]/g, (match, p1) => match.replace(p1, 'id'))
    //  data-set 全部转为小写
    .replace(/data-[^=\s]=/g, (match) => match.toLocaleLowerCase())
    // // s:for-index="{{idx}}" -> s:for-index="idx"
    .replace(/a:for-index=['"]({{\w+}})['"]/ig, (match) => match.replace('{{', '').replace('}}', ''))
    // 模板相对路径必须以./开头
    .replace(/<import\s+src="([\w]+)/ig, (match, p1) => match.replace(p1, ['./', p1].join('')))
    // 自定义组件命名不能用驼峰
    .replace(/<[\w]+/ig, (match) => {
      return isWpy ? match : match.replace(/[A-Z]/g, (m) => ['-', m.toLowerCase()].join(''));
    })
    // 三目运算 "<" 后面不能直接跟非空白字符
    .replace(/{{[^}]+(<)[^=\s][^}]+}}/ig, (match, p1) => match.replace(p1, [p1, ' '].join('')))
    // 事件绑定名称对齐
    // bind事件绑定
    .replace(/bind:\w+/g, (m) => m.replace(':', ''))
    .replace(/\s+bind[\w]+=['"]/ig, (match) => match
      .replace(/bindscrolltolower/gi, 'bindScrollToLower')
      .replace(/bindscrolltoupper/gi, 'bindScrollToUpper')
      .replace(/bindlongpress/gi, 'bindLongTap')
      .replace(/bind(\w)/g, (m, p1) => ['on', p1.toUpperCase()].join('')))
    // touch事件名称对齐
    .replace(/\s+onTouch(start|end|move|cancel)=/g, (match, p1) => match.replace(p1, p1.substring(0, 1).toUpperCase() + p1.substring(1)))
    // 事件绑定名称对齐
    .replace(/\s+catch[\w]+=['"]/ig, (match) => match.replace(/catchsubmit/ig, 'onSubmit')
      .replace(/catchlongpress/gi, 'catchLongTap')
      .replace(/catch(\w)/g, (m, p1) => ['catch', p1.toUpperCase()].join('')))
    // progress属性映射
    .replace(/<progress[^>]+(activeColor|backgroundColor)=/g, (match, p1) => match.replace(p1, p1.replace(/[A-Z]/, (m) => `-${m.toLowerCase()}`)))
    // slider属性映射
    .replace(/<slider[^>]+(activeColor|backgroundColor)=/g, (match, p1) => match.replace(p1, p1.replace(/[A-Z]/, (m) => `-${m.toLowerCase()}`)))
    .replace(/<slider[^>]+(block-size|block-color)=/g, (match, p1) => match.replace(p1, p1.replace('block', 'handle')));
}

module.exports = convert;