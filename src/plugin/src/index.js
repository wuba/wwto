const fs = require('fs');
const sysPath = require('path');
const gulp = require('gulp');
const str2ab = require('to-buffer');
const through2 = require('through2');
const ab2str = require('arraybuffer-to-string');
const extraPluginCom = require('./utils/extra-plugin-com');

let pluginInfo;
function getPluginInfo(src, cb) {
  if (pluginInfo) {
    return cb();
  }

  return extraPluginCom(`${src}/plugins`, (map) => {
    pluginInfo = map;
    cb(pluginInfo);
  });
}

function convertPlugin(opt) {
  const src = opt.source || './src';
  getPluginInfo(src, (map) => {
    // 处理json
    const jsonSrc = [`${src}/**/*.json`];
    gulp.src(jsonSrc)
      .pipe(through2.obj(function(file, enc, cb) {
        const path = file.history[0].replace(file.base, '');
        const spec = path.split(sysPath.sep);
        const seps = new Array(spec.length).fill('..').join('/').replace(/^\.\./, '.');
        let str = ab2str(file.contents);

        str = str.replace(/plugin:\/\/(\w+)\/(\w+)/, (match, p1, p2) => {
          const coms = map.coms[p1] || {};
          return `${seps}/plugins/${p1}/${coms[p2]}`;
        });

        file.contents = str2ab(str);

        this.push(file);
        cb();
      }))
      .pipe(gulp.dest(src));
  });
}

function convertCaller(opt) {
  const src = opt.source || './src';
  getPluginInfo(src, (map) => {
    // 处理js
    gulp.src(`${src}/**/*.js`)
      .pipe(through2.obj(function(file, enc, cb) {
        const path = file.history[0].replace(file.base, '');
        const spec = path.split(sysPath.sep);
        const seps = new Array(spec.length).fill('..').join('/').replace(/^\.\./, '.');
        let str = ab2str(file.contents);

        str = str.replace(/requirePlugin\(['"](\w+)['"]\)/, (match, p1) => {
          return match.replace('requirePlugin', 'require').replace(p1, `${seps}/plugins/${p1}/${map.main[p1]}`);
        });

        file.contents = str2ab(str);

        this.push(file);
        cb();
      }))
      .pipe(gulp.dest(src));
  });
}

function convert(opt = {}) {
  convertPlugin(opt);
  convertCaller(opt);
}

module.exports = {
  convert,
  convertPlugin,
  convertCaller
};