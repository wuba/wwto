function convert(wxmlText) {
  return wxmlText
    .replace(/wx:/g, 'a:')
    .replace(/a:for-items/g, 'a:for')
    .replace(/\.wxml/g, '.axml')
    .replace(/\s+formType=['"]\w+['"]/g, function(match) {
      return match.replace('formType', 'form-type');
    })
    .replace(/<canvas[^>]+(canvas-id)=['"]/g, function(match, p1) {
      // canvas-id to id
      return match.replace(p1, 'id');
    })
    .replace(/a:for-index=['"]({{\w+}})['"]/ig, function(match, p1) {
      // s:for-index="{{idx}}" -> s:for-index="idx"
      return match.replace('{{', '').replace('}}', '');
    })
    .replace(/<import\s+src="([\w]+)/ig, function(match, p1) {
      // 模板相对路径必须以./开头
      return match.replace(p1, ['./', p1].join(''))
    })
    .replace(/<[\w]+/ig, function(match, p1) {
      // 自定义组件命名不能用驼峰
      return match.replace(/[A-Z]/g, (m) => {
        return ['-', m.toLowerCase()].join('')
      })
    })
    .replace(/<\/[\w]+>/ig, function(match, p1) {
      // 自定义组件命名不能用驼峰
      return match.replace(/[A-Z]/g, (m) => {
        return ['-', m.toLowerCase()].join('')
      })
    })
    .replace(/{{[^}]+(<)[^=\s][^}]+}}/ig, function(match, p1) {
      // 三目运算 "<" 后面不能直接跟非空白字符
      return match.replace(p1, [p1, ' '].join(''));
    })
    .replace(/\s+bind[\w]+=['"]/ig, function(match, p1) {
      // 事件绑定名称对齐
      return match
        .replace(/bindscrolltolower/gi, 'bindScrollToLower')
        .replace(/bindscrolltoupper/gi, 'bindScrollToUpper')
        .replace(/bind(\w)/g, (m, p1) => {
          return ['on', p1.toUpperCase()].join('')
        })
    })
    .replace(/\s+onTouch(start|end|move|cancel)=/g, (match, p1) => {
      // touch事件名称对齐
      return match.replace(p1, p1.substring(0, 1).toUpperCase() + p1.substring(1));
    })
    .replace(/\s+catch[\w]+=['"]/ig, function(match, p1) {
      // 事件绑定名称对齐
      return match.replace(/catchsubmit/ig, 'onSubmit')
        .replace(/catch(\w)/g, (m, p1) => {
          return ['catch', p1.toUpperCase()].join('')
        })
    });
}

module.exports = convert;