import wx from './../../../adaptor.js';
function convert(jsonText) {
  return jsonText
    .replace(/tabBar([^\]]+)/, (match) => {
      // 处理tabBar命名规范不一致
      return match.replace(/"list":/i, '"items":')
        .replace(/"color":/ig, '"textColor":')
        .replace(/"text":/ig, '"name":')
        .replace(/"iconPath":/g, '"icon":')
        .replace(/"selectedIconPath":/g, '"activeIcon":');
    })
    .replace(/usingComponents([^}]+)/g, (match) => {
      return match.replace(/"([\w]+)":/ig, (name, p1) => {
        // 自定义组件命名不能用驼峰
        return name.replace(p1, p1.replace(/[A-Z]/g, (m) => {
          return ['-', m.toLowerCase()].join('');
        }));
      });
    })
    .replace(/usingComponents([^}]+)/g, (match) => {
      return match.replace(/":\s*"([\w])/ig, (m, p1) => {
        // 绝对路径必须加/
        return m.replace(p1, ['/', p1].join(''));
      });
    });
}

module.exports = convert;