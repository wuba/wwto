const fs = require('fs');
const gulp = require('gulp');
const readLine = require('readline');
const through2 = require('through2');
const ab2str = require('arraybuffer-to-string');
const logger = require('../utils/logger');

function lintLine(source, lineRules) {
  return lineRules.map(fn => fn(source)).filter(scheme => scheme);
}

function lintFile(file, fileRules) {
  const contents = ab2str(file.contents);
  const path = file.path;
  let schemes = [];

  fileRules.forEach(fn => {
    schemes = schemes.concat(fn(contents, path));
  });

  return schemes.filter(scheme => scheme);
}

function lint(sourcePath = './src//**/*.wxml', fileRules, lineRules) {
  gulp.src(sourcePath)
    .pipe(through2.obj(function(file, encode, callback) {
      const stream = fs.createReadStream(file.path);
      const reader = readLine.createInterface({input: stream});
      const schemes = lintFile(file, fileRules);
      const path = file.path;
      let line = 0;

      reader.on('line', (source) => {
        line++;
        lintLine(source, lineRules).forEach((scheme) => {
          schemes.push({path, line, source: scheme.source, rule: scheme.rule});
        });
      });

      reader.on('close', () => {
        if (schemes.length === 0) {
          logger.success('检测通过：' + file.path);
        }
        schemes.sort((a, b) => a.line > b.line ? 1 : -1);
        schemes.forEach(scheme => {
          logger.lintWarning(scheme.path, scheme.line, scheme.source, scheme.rule);
        });
      });

      this.push(file);
      callback();
    }));
}

module.exports = lint;