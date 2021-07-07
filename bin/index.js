#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const logger = require('../lib/utils/logger');
const wto = require('../src/index.js');
const watch = require('glob-watcher');
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

function isFile(filePath) {
  if (fs.existsSync(filePath)) {
    var fileStat = fs.statSync(filePath);
    return fileStat.isFile();
  } else {
    return false;
  }
}
function displayVersion() {
  const version = getVersion();
  const chars = [
    '   _   _____   __  ',
    ' ( // )  |   ( - )',
    ' )   (   |  (     ) ',
    '(__/__)  |   ( _ ) ',
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
    let config = {};
    const configFile = path.join(process.cwd(), "./wwto.config.js");

    if (isFile(configFile)) {
      config = require(configFile);
    }
    cmd.config = config;
    if (cmd.platform === 'baidu') {
      wto.toBaidu(cmd);
    } else if (cmd.platform === 'alibaba') {
      wto.toAlibaba(cmd);
    } else if (cmd.platform === 'toutiao') {
      wto.toToutiao(cmd);
    } else if (cmd.platform === 'wx') {
      wto.toWx(cmd);
    } else {
      wto.toAll(Object.assign(true, cmd, {
        wxTarget: [cmd.target, '/wx'].join('/'),
        baiduTarget: [cmd.target, '/baidu'].join('/'),
        alibabaTarget: [cmd.target, '/alibaba'].join('/'),
        toutiaoTarget: [cmd.target, '/toutiao'].join('/')
      }));
    }
  });

let compileIndex = 0;
function watchFile(opt, callback) {
  const src = opt.source || './src';
  const watcher = watch([src + '/**/**.**']);
  logger.info('编译中.......，编译索引：' + ++compileIndex);
  callback();
  watcher.on('change', function(path, stat) {
    logger.info('编译中.......，编译索引：' + ++compileIndex);
    callback();
  });
}
commander.command('watch')
  .description('dev模式编译项目')
  .option('-p, --platform <platform>', '目标平台')
  .option('-s, --source <source>', '源码目录')
  .option('-t, --target <target>', '生成代码目录')
  .action(cmd => {
    let config = {};
    const configFile = path.join(process.cwd(), "./wwto.config.js");

    if (isFile(configFile)) {
      config = require(configFile);
    }
    cmd.config = config;
    if (cmd.platform === 'baidu') {
      watchFile(cmd, function() {
        wto.toBaidu(cmd);
      });
    } else if (cmd.platform === 'alibaba') {
      watchFile(cmd, function() {
        wto.toAlibaba(cmd);
      });
    } else if (cmd.platform === 'toutiao') {
      watchFile(cmd, function() {
        wto.toToutiao(cmd);
      });
    } else if (cmd.platform === 'wx') {
      watchFile(cmd, function() {
        wto.toWx(cmd);
      });
    } else {
      watchFile(cmd, function() {
        wto.toAll(Object.assign(true, cmd, {
          baiduTarget: [cmd.target, '/baidu'].join('/'),
          alibabaTarget: [cmd.target, '/alibaba'].join('/'),
          toutiaoTarget: [cmd.target, '/toutiao'].join('/')
        }));
      });
    }
  });

commander.command('plugin')
  .description('编译插件')
  .option('-s, --source <source>', '源码目录')
  .action(cmd => {
    wto.convertPlugin(cmd);
  });

commander.parse(process.argv);