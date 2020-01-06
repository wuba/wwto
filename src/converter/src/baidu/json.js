function convert(jsonText) {
  return jsonText
    .replace(/usingComponents([^}]+)/g, function(match, p1) {
      return match.replace(/"([\w]+)":/ig, (m, p1) => {
        // 自定义组件命名不能用驼峰
        return m.replace(p1, p1.replace(/[A-Z]/g, (m) => {
          return ['-', m.toLowerCase()].join('');
        }));
      });
    });
}

module.exports = convert;