var wx = require('./../../../adaptor.js').default;
function convert(jsText) {
  return jsText
    .replace(/['"](\/\/\w+\.\w+)/g, (match, p1) => {
      return match.replace(p1, ['https:', p1].join(''));
    })
    .replace(/\.option\.transition\.delay/g, '.delay')
    .replace(/\.option\.transition\.duration/g, '.duration')
    .replace(/\.option\.transition\.timingFunction/g, '.duration');
}

module.exports = convert;