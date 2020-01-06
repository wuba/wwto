var wx = require('./../../../adaptor.js').default;
/* eslint-disable no-eval */
const sysPath = require('path');
const gulp = require('gulp');
const through2 = require('through2');
const ab2str = require('arraybuffer-to-string');
const str2ab = require('to-buffer');

module.exports = function(pluginDir, callback) {
  const map = {
    main: {},
    coms: {}
  };

  gulp.src(`${pluginDir}/**/plugin.json`)
    .pipe(through2.obj(function(file, enc, cb) {
      const path = file.history[0].replace(file.base, '');
      const spec = path.split(sysPath.sep);
      const name = spec[spec.length - 2];
      const str = ab2str(file.contents);
      const json = JSON.parse(str);

      map.main[name] = json.main;
      map.coms[name] = json.publicComponents;

      file.contents = str2ab(str);

      this.push(file);
      cb();
    }))
    .pipe(gulp.dest(pluginDir))
    .on('end', () => {
      callback(map);
    });
};