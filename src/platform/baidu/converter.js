const fs = require('fs');
const sysPath = require('path');
const gulp = require('gulp');
const fse = require('fs-extra');
const ab2str = require('arraybuffer-to-string');
const str2ab = require('to-buffer');
const through2 = require('through2');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const config = require('../../config');

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './baidu';
  const assets = opt.assets || config.getAssets(src);

  // fse.remove(dest).then(() => {
  gulp.src(assets)
    .pipe(gulp.dest(dest));

  gulp.src(src + "/**/*.wxss")
    .pipe(replace(/\.wxss(["'])/g, function(match, p1) {
      return p1;
    }))
    .pipe(replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    }))
    .pipe(replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    }))
    .pipe(replace(/[,}\n]+[\s]*image[,\s{]/ig, function(match, p1) {
      // 修复不支持image子元素选择器的问题
      return match.replace(/image/g, '.fix-image-cls');
    }))
    .pipe(rename(function(path) {
      path.extname = ".css";
    }))
    .pipe(gulp.dest(dest));

  gulp.src(src + "/**/*.wxml")
    .pipe(replace('wx:', 's-'))
    .pipe(replace('s-for-items', 's-for'))
    .pipe(replace('.wxml', '.swan'))
    .pipe(replace('></input>', '/>'))
    .pipe(replace(/<[\w]+/ig, function(match, p1) {
      // 自定义组件命名不能用驼峰
      return match.replace(/[A-Z]/g, (m) => {return ['-', m.toLowerCase()].join('')})
    }))
    .pipe(replace(/<\/[\w]+>/ig, function(match, p1) {
      // 自定义组件命名不能用驼峰
      return match.replace(/[A-Z]/g, (m) => {return ['-', m.toLowerCase()].join('')})
    }))
    .pipe(replace(/{{[^}]+(<)[^=\s][^}]+}}/ig, function(match, p1) {
      // 三目运算 "<" 后面不能直接跟非空白字符
      return match.replace(p1, [p1, ' '].join(''));
    }))
    .pipe(replace(/{{[^}\d\w]*(\.)[\d][^}]+}}/g, function(match, p1) {
      // 浮点数不能忽略小数点前面的0
      return match.replace(p1, ['0', p1].join(''));
    }))
    .pipe(replace(/scroll-into-view=["']{{([^}]+)}}["']/g, function(match, p1) {
      // scroll-into-view 属性值格式 {{=value=}}
      return match.replace('{{', '').replace('}}', '').replace(p1, '{=' + p1 + '=}');
    }))
    .pipe(replace(/scroll-top=["']{{([^}]+)}}["']/g, function(match, p1) {
      // scroll-top 属性值格式 {{=value=}}
      return match.replace('{{', '').replace('}}', '').replace(p1, '{=' + p1 + '=}');
    }))
    .pipe(replace(/scroll-left=["']{{([^}]+)}}["']/g, function(match, p1) {
      // scroll-left 属性值格式 {{=value=}}
      return match.replace('{{', '').replace('}}', '').replace(p1, '{=' + p1 + '=}');
    }))
    .pipe(replace(/<template.*\s+data=["']({{[^}]+}})/g, function(match, p1) {
      // 模板数据格式 {{{value}}}
      return match.replace(p1, '{' + p1 + '}');
    }))
    .pipe(replace(/<image([^>]+)>/g, function(match, p1) {
      // 修复不支持image子元素选择器的问题
      if (match.match(/class=/)) {
        return match;
      }
      return match.replace(p1, [' class="fix-image-cls" ', p1].join(''));
    }))
    .pipe(replace(/url\(['"](\/\/[^'"]+)['"]\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    }))
    .pipe(replace(/url\((\/\/[^'"]+)\)/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(/\/\//g, m => 'https:' + m);
    }))
    .pipe(replace(/url=["']{{([^{}\s\?=]+)}}/ig, function(match, p1) {
      // url属性值必须带协议
      return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
    }))
    .pipe(replace(/url\({{([^{}\s\?=]+)}}/ig, function(match, p1) {
      // 背景url属性值必须带协议
      return match.replace(p1, '(' + p1 +'[0]==\'/\' && ' + p1 + '[1]==\'/\') ? \'https:\' + ' + p1 + ':' + p1);
    }))
    .pipe(rename(function(path) {
      path.extname = ".swan";
    }))
    .pipe(gulp.dest(dest));

  const destConfigFile = dest + '/project.config.json';
  const jsonSrc = [src + "/**/*.json"];
  fs.exists(destConfigFile, (exist) => {
    if(exist) {
      jsonSrc.push('!' + src + '/project.config.json');
    }

    gulp.src(jsonSrc)
      .pipe(replace(/usingComponents([^}]+)/g, function(match, p1) {
        return match.replace(/"([\w]+)":/ig, (m, p1) => {
          // 自定义组件命名不能用驼峰
          return m.replace(p1, p1.replace(/[A-Z]/g, (m) => {
            return ['-', m.toLowerCase()].join('')
          }));
        });
      }))
      .pipe(gulp.dest(dest));
  });

  // 注入适配器代码
  //fs.readFileSync(__dirname + '/patch.js', 'utf8');
  gulp.src(__dirname + '/adaptor.js').pipe(gulp.dest(dest)).on('end', () => {
    console.log('复制：adaptor.js');
  });

  return gulp.src(src + "/**/*.js")
    .pipe(replace(/['"](\/\/\w+\.\w+)/g, function(match, p1) {
      return match.replace(p1, ['https:', p1].join(''));
    }))
    .pipe(replace(/\.option\.transition\.delay/g, '.delay'))
    .pipe(replace(/\.option\.transition\.duration/g, '.duration'))
    .pipe(replace(/\.option\.transition\.timingFunction/g, '.duration'))
    .pipe(through2.obj(function(file, enc, cb) {
      let path = file.history[0].replace(file.base, '');
      let spec = path.split(sysPath.sep);
      let adaptor = new Array(spec.length).fill('..').concat('adaptor.js').join('/');
      let str = [
        'import wx from \'' + adaptor.replace(/^\.\./, '.') + '\';',
        ab2str(file.contents)
      ].join('\r\n');
      file.contents = str2ab(str);

      this.push(file);
      cb();
    }))
    .pipe(gulp.dest(dest));
  // });
}

module.exports = convert;