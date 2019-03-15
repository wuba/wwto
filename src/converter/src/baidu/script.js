function convert(jsContext) {
  return jsContext
    .replace(/['"](\/\/\w+\.\w+)/g, function(match, p1) {
      return match.replace(p1, ['https:', p1].join(''));
    })
    .replace(/\.option\.transition\.delay/g, '.delay')
    .replace(/\.option\.transition\.duration/g, '.duration')
    .replace(/\.option\.transition\.timingFunction/g, '.duration');
}

module.exports = convert;