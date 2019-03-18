/**
 * 计算特定字符在文件中的行号
 * @param {String} source
 * @param {String} substr
 * @returns {Number}
 */
function calcLine(source, substr) {
  const index = source.indexOf(substr);
  const pre = source.substring(0, index);
  return pre.split('\n').length;
}

/**
 * 检测组件不支持的属性、事件
 * @param {String} contents             文件内容
 * @param {String} path                 文件路径
 * @param {Array.<tag, attrs>} coms     组件配置列表
 * @param {String} platform             平台类型
 * @param {String} type                 属性|事件
 * @returns {Array}
 */
function unsupportedAttrOrEvents(contents, path, coms, platform, type) {
  const schemes = [];

  coms.forEach((com) => {
    com.attrs.forEach((attr) => {
      const reg = new RegExp(`<${com}[^>]+${attr}=`);
      const match = contents.match(reg);

      if (match) {
        const line = calcLine(contents, match);
        const rule = `${platform}小程序 ${com.tag} 组件不支持 ${attr} ${type}`;
        schemes.push({
          path, line, source: match, rule
        });
      }
    });
  });

  return schemes;
}

module.exports = {
  calcLine,
  unsupportedAttrOrEvents
};