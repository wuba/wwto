function convert(wxmlContent) {
  return wxmlContent
    .replace(/wx:/g, 's-')
    .replace(/s-for-items/, 's-for')
    .replace(/\.wxml/g, '.swan')
    .replace(/><\/input>/g, '/>')
    // 表单属性不能用驼峰
    .replace(/\s+form[A-Z]\w+=/g, (match) => match.replace(/[A-Z]/g, (m) => `-${m}`))
    .replace(/<[\w]+/ig, (match) => {
      // 自定义组件命名不能用驼峰
      return match.replace(/[A-Z]/g, (m) => {
        return ['-', m.toLowerCase()].join('');
      });
    })
    //  data-set 全部转为小写
    .replace(/data-[^=\s]+=/g, (match) => match.toLocaleLowerCase())
    .replace(/<\/[\w]+>/ig, (match) => {
      // 自定义组件命名不能用驼峰
      return match.replace(/[A-Z]/g, (m) => {
        return ['-', m.toLowerCase()].join('');
      });
    })
    .replace(/{{[^}]+(<)[^=\s][^}]+}}/ig, (match, p1) => {
      // 三目运算 "<" 后面不能直接跟非空白字符
      return match.replace(p1, [p1, ' '].join(''));
    })
    .replace(/{{[^}\d\w]*(\.)[\d][^}]+}}/g, (match, p1) => {
      // 浮点数不能忽略小数点前面的0
      return match.replace(p1, ['0', p1].join(''));
    })
    .replace(/scroll-into-view=["']{{([^}]+)}}["']/g, (match, p1) => {
      // scroll-into-view 属性值格式 {{=value=}}
      return match.replace('{{', '').replace('}}', '').replace(p1, `{=${p1}=}`);
    })
    .replace(/scroll-top=["']{{([^}]+)}}["']/g, (match, p1) => {
      // scroll-top 属性值格式 {{=value=}}
      return match.replace('{{', '').replace('}}', '').replace(p1, `{=${p1}=}`);
    })
    .replace(/scroll-left=["']{{([^}]+)}}["']/g, (match, p1) => {
      // scroll-left 属性值格式 {{=value=}}
      return match.replace('{{', '').replace('}}', '').replace(p1, `{=${p1}=}`);
    })
    .replace(/<template.*\s+data=["']({{[^}]+}})/g, (match, p1) => {
      // 模板数据格式 {{{value}}}
      return match.replace(p1, `{${p1}}`);
    })
    .replace(/<image([^>]+)>/g, (match, p1) => {
      // 修复不支持image子元素选择器的问题
      if (match.match(/class=/)) {
        return match;
      }
      return match.replace(p1, [' class="fix-image-cls" ', p1].join(''));
    })
    .replace(/url\(['"]?\/\/[^)]+['"]?\)/ig, (match) => {
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
    // video组件属性对齐
    .replace(/<video[^>]+(object-fit)=/g, (match, p1) => match.replace(p1, 'objectFit'))
    .replace(/<video[^>]+(vslide-gesture|page-gesture)=/g, (match, p1) => match.replace(p1, 'page-gesture'));
}

module.exports = convert;