const fs = require('fs');
const gulp = require('gulp');
const fse = require('fs-extra');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const config = require('../../config');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './alibaba';
  const assets = opt.assets || config.getAssets(src);

  fse.remove(dest).then(() => {
    gulp.src(assets)
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxss")
      .pipe(replace('.wxss"', '"'))
      .pipe(rename(function(path) {
        path.extname = ".acss";
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxml")
      .pipe(replace('wx:', 'a:'))
      .pipe(replace('a:for-items', 'a:for'))
      .pipe(replace('.wxml', '.axml'))
      .pipe(replace(/<import\s+src="([\w]+)/ig, function(match, p1) {
        // 模板绝对路径必须以/开头
        return match.replace(p1, ['/', p1].join(''))
      }))
      .pipe(replace(/<[\w]+/ig, function(match, p1) {
        // 自定义组件命名不能用驼峰
        return match.replace(/[A-Z]/g, (m) => {return ['-', m.toLowerCase()].join('')})
      }))
      .pipe(replace(/<\/[\w]+>/ig, function(match, p1) {
        // 自定义组件命名不能用驼峰
        return match.replace(/[A-Z]/g, (m) => {return ['-', m.toLowerCase()].join('')})
      }))
      .pipe(replace(/\s+bind[\w]+=['"]/ig, function(match, p1) {
        // 事件绑定名称对齐
        return match.replace(/bind(\w)/g, (m, p1) => {return ['on', p1.toUpperCase()].join('')})
      }))
      .pipe(rename(function(path) {
        path.extname = ".axml";
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.json")
      .pipe(replace(/usingComponents([^}]+)/g, function(match, p1) {
        return match.replace(/"([\w]+)":/ig, (m, p1) => {
          // 自定义组件命名不能用驼峰
          return m.replace(p1, p1.replace(/[A-Z]/g, (m) => {
            return ['-', m.toLowerCase()].join('')
          }));
        });
      }))
      .pipe(replace(/usingComponents([^}]+)/g, function(match, p1) {
        return match.replace(/":\s*"([\w])/ig, (m, p1) => {
          // 绝对路径必须加/
          return m.replace(p1, ['/', p1].join(''));
        });
      }))
      .pipe(gulp.dest(dest));

    const patch = fs.readFileSync(__dirname + '/patch.js', 'utf8');
    gulp.src(src + "/**/*.js")
      .pipe(replace(/(require\(['"])(\w+)/g, '$1./$2'))
      .pipe(replace(/(from\s+['"])(\w+)/g, function(match, p1) {
        return match.replace(p1, [p1, './'].join(''))
      }))
      .pipe(replace(/(let|var|const)\s+fetch\s*=/g, '$1 renameFetch = '))
      .pipe(replace(/(\s+)fetch([;\s]*)$/, '$1renameFetch$2'))
      .pipe(replace(/[^\w.'"]fetch[.(]/g, function(match) {
        // fetch是全局只读对象，不允许赋值
        return match.replace(/fetch/g, 'renameFetch');
      }))
      .pipe(replace(/([\s\S]*)/, patch + '$1'))
      .pipe(gulp.dest(dest));
  });
}

module.exports = convert;