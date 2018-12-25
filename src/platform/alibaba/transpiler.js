const babel = require("@babel/core");
const component = require('./plugins/component');

module.exports = function (code, options) {
  options = options || {};

  code =  babel.transform(code, {
    plugins: [
      [component, options]
    ]
  }).code;

  return code.trim()
};