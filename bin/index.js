#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const logger = require('../lib/utils/logger');
const wto = require('../lib/index.js');

function readFile(p) {
  let rst = '';
  p = (typeof (p) === 'object') ? path.join(p.dir, p.base) : p;
  try {
    rst = fs.readFileSync(p, 'utf-8');
  } catch (e) {
    rst = null;
  }
  return rst;
}

function getVersion() {
  let version;
  const file = path.resolve(__dirname, '../package.json');
  try {
    version = JSON.parse(readFile(file)).version;
  } catch (e) {
    version = '';
  }
  return version;
}

function displayVersion() {
  const version = getVersion();
  const chars = [
    '   _   _____   __  ',
    ' ( \/\/ )  |   ( - )',
    ' )   (   |  (     ) ',
    '(__/\__)  |   ( _ ) ',
    '                                         '
  ].join('\n');

  logger.info(version, '\n v');
  logger.info(chars, '\n');
}

commander.usage('[command] <options ...>');
commander.option('-v, --version', '显示版本号', () => {
  displayVersion();
});

commander.command('lint')
  .description('检测源码兼容性')
  .option('-p, --platform <platform>', '目标平台')
  .option('-s, --source <source>', '源码目录')
  .action(cmd => {
    if (cmd.platform === 'baidu') {
      wto.lintBaidu(cmd);
    } else if (cmd.platform === 'alibaba') {
      wto.lintAlibaba(cmd);
    } else if (cmd.platform === 'toutiao') {
      wto.lintToutiao(cmd);
    } else {
      wto.lintBaidu(cmd);
      wto.lintAlibaba(cmd);
      wto.lintToutiao(cmd);
    }
  });

commander.command('build')
  .description('编译项目')
  .option('-p, --platform <platform>', '目标平台')
  .option('-s, --source <source>', '源码目录')
  .option('-t, --target <target>', '生成代码目录')
  .action(cmd => {
    if (cmd.platform === 'baidu') {
      wto.toBaidu(cmd);
    } else if (cmd.platform === 'alibaba') {
      wto.toAlibaba(cmd);
    } else if (cmd.platform === 'toutiao') {
      wto.toToutiao(cmd);
    } else {
      wto.toAll(Object.assign(true, cmd, {
        baiduTarget: [cmd.target, '/baidu'].join('/'),
        alibabaTarget: [cmd.target, '/alibaba'].join('/'),
        toutiaoTarget: [cmd.target, '/toutiao'].join('/')
      }));
    }
  });

commander.command('plugin')
  .description('编译插件')
  .option('-s, --source <source>', '源码目录')
  .action(cmd => {
    wto.convertPlugin(cmd);
  });

commander.parse(process.argv);