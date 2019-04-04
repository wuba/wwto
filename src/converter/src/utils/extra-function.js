const balancingGroup = require('./balancing-group');

/**
 * 从源码文本中提取函数参数、函数体
 * @param {String} source 源码文本
 * @param {String} name   函数名
 * @returns {{name: String, args: String, body: String}}
 */
function extractFn(source, name) {
  const fnRegex = [
    // attached(arg) {}
    new RegExp(`${name}\\(([^)]*)\\)([\\s\\S]*)`),
    // attached: function(args) {}
    new RegExp(`${name}:\\s*function\\s*\\(([^)]*)\\)([\\s\\S]*)`),
    // attached: (args) => {}
    new RegExp(`${name}:\\s*\\(([^)]*)\\)\\s*=>([\\s\\S]*)`)
  ];

  let args = '';
  let body = '';

  for (let i = 0; i < fnRegex.length; i += 1) {
    const reg = fnRegex[i];
    const matched = source.match(reg);

    if (matched) {
      args = matched[1] || '';
      body = matched[2] || '';
      break;
    }
  }

  if (body) {
    body = balancingGroup(body);
  }

  return {
    name,
    args,
    body
  };
}

module.exports = extractFn;