var wx = require('./../adaptor.js').default;
function calcLine(source, sub) {
  const index = source.indexOf(sub);
  const pre = source.substring(0, index);
  return pre.split('\n').length;
}

module.exports = {
  calcLine
};