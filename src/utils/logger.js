const colors = require('colors/safe');

colors.enabled = true;
colors.setTheme({
  SILLY: 'rainbow',
  INPUT: 'grey',
  VERBOSE: 'cyan',
  PROMPT: 'grey',
  INFO: 'green',
  DATA: 'grey',
  HELP: 'cyan',
  WARN: 'yellow',
  DEBUG: 'blue',
  ERROR: 'red'
});

function warn(str, cmd = '\n[WARN] ') {
  console.warn(colors.yellow(cmd + str));
}

function error(str, cmd = '\n[Error] ') {
  console.warn(colors.red(cmd + str));
}

function success(str, cmd = '[SUCCESS] ') {
  console.warn(colors.green(cmd + str));
}

function info(str, cmd = '[INFO] ') {
  console.warn(colors.cyan(cmd + str));
}

/**
 * 控制台输出告警
 * @param {String} path   文件路径
 * @param {String} line   代码行号
 * @param {String} source 命中源码
 * @param {String} scheme 修复方案
 */
function lintWarning(path, line, source, scheme) {
  warn([
    `检测异常：${path}`,
    `\n> 第 ${line} 行代码有兼容问题`,
    `\n> 建议修改此段代码 ${source}`,
    '\n> 修复提示：',
    `\n> ${scheme}\n`
  ].join(''));
}

module.exports = {
  lintWarning,
  warn,
  error,
  success,
  info
};