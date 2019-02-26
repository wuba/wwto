const fs = require('fs');
const sysPath = require('path');
const gulp = require('gulp');
const fse = require('fs-extra');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uneval = require('uneval');
const md5Hex = require('md5-hex');
const config = require('../../config');
const balancingGroup = require('../../utils/balancing-group');
const ab2str = require('arraybuffer-to-string');
const str2ab = require('to-buffer');
const through2 = require('through2');
const DOMParser = require('xmldom').DOMParser;
const extractFn = require('../../utils/extra-function');
const logger = require('../../utils/logger');
const scopeStyle = require('../../scope/scope-style');
const scopeTemplate = require('../../scope/scope-template');

function defQuery(match, opt) {
  return [match, `${opt} = ${opt} || {}; ${opt}.query = ${opt}.query || {};`].join('');
}

function convert(opt = {}) {
  const src = opt.source || './src';
  const dest = opt.target || './alibaba';
  const assets = opt.assets || config.getAssets(src);

  // fse.remove(dest).then(() => {
    gulp.src(assets)
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxss")
      .pipe(replace(/\.wxss(["'])/g, function(match, p1) {
        return p1;
      }))
      .pipe(through2.obj(function(file, enc, cb) {
        let path = file.history[0].replace(file.base, '').replace('.wxss', '');
        let jsonPath = file.history[0].replace('.wxss', '.json');

        fs.exists(jsonPath, (exist) => {
          if (exist) {
            let json = fs.readFileSync(jsonPath);
            let isCom = /"component":\s*true/.test(json);

            if (isCom) {
              let md5 = '_' + md5Hex(path);
              let str = ab2str(file.contents);
              scopeStyle(md5, str).then((css) => {
                file.contents = str2ab(css);
                this.push(file);
                cb();
              });
            } else {
              this.push(file);
              cb();
            }
          } else {
            this.push(file);
            cb();
          }
        });
      }))
      .pipe(rename(function(file) {
        file.extname = ".acss";
      }))
      .pipe(gulp.dest(dest));

    gulp.src(src + "/**/*.wxml")
      .pipe(replace('wx:', 'a:'))
      .pipe(replace('a:for-items', 'a:for'))
      .pipe(replace('.wxml', '.axml'))
      .pipe(replace(/\s+formType=['"]\w+['"]/g, function(match) {
        return match.replace('formType', 'form-type');
      }))
      .pipe(replace(/<canvas[^>]+(canvas-id)=['"]/g, function(match, p1) {
        // canvas-id to id
        return match.replace(p1, 'id');
      }))
      .pipe(replace(/a:for-index=['"]({{\w+}})['"]/ig, function(match, p1) {
        // s:for-index="{{idx}}" -> s:for-index="idx"
        return match.replace('{{', '').replace('}}', '');
      }))
      .pipe(replace(/<import\s+src="([\w]+)/ig, function(match, p1) {
        // 模板相对路径必须以./开头
        return match.replace(p1, ['./', p1].join(''))
      }))
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
      .pipe(replace(/\s+bind[\w]+=['"]/ig, function(match, p1) {
        // 事件绑定名称对齐
        return match.replace(/bindscrolltolower/gi, 'bindScrollToLower')
          .replace(/bindscrolltoupper/gi, 'bindScrollToUpper')
          .replace(/bind(\w)/g, (m, p1) => {return ['on', p1.toUpperCase()].join('')})
      }))
      .pipe(replace(/\s+catch[\w]+=['"]/ig, function(match, p1) {
        // 事件绑定名称对齐
        return match.replace(/catchsubmit/ig, 'onSubmit')
          .replace(/catch(\w)/g, (m, p1) => {return ['catch', p1.toUpperCase()].join('')})
      }))
      .pipe(through2.obj(function(file, enc, cb) {
        let path = file.history[0].replace(file.base, '').replace('.wxml', '');
        let jsonPath = file.history[0].replace('.wxml', '.json');

        fs.exists(jsonPath, (exist) => {
          if (exist) {
            let json = fs.readFileSync(jsonPath);
            let isCom = /"component":\s*true/.test(json);

            if (isCom) {
              let md5 = '_' + md5Hex(path);
              let str = ab2str(file.contents);
              let node = new DOMParser().parseFromString(str);
              scopeTemplate(node, md5);
              let nodeStr = node.toString()
                .replace(/xmlns:a=""/g, '')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');

              file.contents = str2ab(nodeStr);
              this.push(file);
              cb();
            } else {
              this.push(file);
              cb();
            }
          } else {
            this.push(file);
            cb();
          }
        });
      }))
      .pipe(rename(function(path) {
        path.extname = ".axml";
      }))
      .pipe(gulp.dest(dest));

    const destConfigFile = dest + '/project.config.json';
    const jsonSrc = [src + "/**/*.json"];
    fs.exists(destConfigFile, (exist) => {
      if(exist) {
        jsonSrc.push('!' + src + '/project.config.json');
      }

      gulp.src(jsonSrc)
        .pipe(replace(/tabBar([^\]]+)/, function(match, p1) {
          // 处理tabBar命名规范不一致
          return match.replace(/"list":/i, '"items":')
            .replace(/"color":/ig, '"textColor":')
            .replace(/"text":/ig, '"name":')
            .replace(/"iconPath":/g, '"icon":')
            .replace(/"selectedIconPath":/g, '"activeIcon":');
        }))
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
    });

    // 注入适配器代码
    //fs.readFileSync(__dirname + '/patch.js', 'utf8');
    gulp.src(__dirname + '/adaptor.js').pipe(gulp.dest(dest)).on('end', () => {
      logger.info('复制 adaptor.js');
    });

    gulp.src(src + "/**/*.js")
      .pipe(replace(/(require\(['"])(\w+)/g, '$1./$2'))
      .pipe(replace(/(from\s+['"])(\w+)/g, function(match, p1) {
        // 相对路径以./开头
        return match.replace(p1, [p1, './'].join(''))
      }))
      .pipe(replace(/(let|var|const)\s+fetch\s*=/g, '$1 renameFetch = '))
      .pipe(replace(/(\s+)fetch([;\s]*)$/, '$1renameFetch$2'))
      .pipe(replace(/[^\w.'"]fetch[.(]/g, function(match) {
        // fetch是全局只读对象，不允许赋值
        return match.replace(/fetch/g, 'renameFetch');
      }))
      .pipe(replace(/App\({[\s\S]+(onLaunch|onShow):\s*function\s*\(\s*(\w+)\s*\)[^{]*{/g, function(match, p1, p2) {
        // query默认值{}
        return defQuery(match, p2);
      }))
      .pipe(replace(/App\({[\s\S]+(onLaunch|onShow)\s*\(\s*(\w+)\s*\)[^{]*{/g, function(match, p1, p2) {
        // query默认值{}
        return defQuery(match, p2);
      }))
      .pipe(replace(/App\({[\s\S]+(onLaunch|onShow):\s*\(\s*(\w+)\s*\)\s*=>\s*[^{]*{/g, function(match, p1, p2) {
        // query默认值{}
        return defQuery(match, p2);
      }))
      .pipe(replace(/Component\([\s\S]+properties:[^{]*{/, function(match) {
        return match.replace('properties', 'props');
      }))
      .pipe(replace(/\.properties/g, function(match) {
        return match.replace('.properties', '.props');
      }))
      .pipe(replace(/Component\([\s\S]+methods:[^{]*{/, function(match) {
        return [
          match,
          `triggerEvent: function(name, opt) {
            this.props[\'on\' + name[0].toUpperCase() + name.substring(1)]({detail:opt});
          },\r\n`
        ].join('');
      }))
      .pipe(replace(/[\s\S]+/, function(match) {
        // 只处理组件
        if (!match.match(/Component\(/)) return match;

        const lifeCircleNames = ['created', 'attached', 'ready', 'detached'];
        let lifeCircleFns = '';
        lifeCircleNames.map((name) => {
          let {args, body} = extractFn(match, name);
          lifeCircleFns += name + '(' + args + ')' + (body || '{}') + ',\r\n';
        });

        let methods = (match.match(/methods:[\s\n]*{/) || {})[0];
        if (methods) {
          match = match.replace(methods, [methods, lifeCircleFns].join('\r\n'));
        } else {
          match = match.replace('Component({', [
            'Component({',
            'methods: {',
            lifeCircleFns,
            '}'
          ].join('\r\n'))
        }

        let props = (match.match(/props:[\s\S]+/)||{})[0] || '';
        if (!props) {
          return match;
        }

        let str = balancingGroup(props);
        let obj = eval('(' + str + ')');
        let has = Object.prototype.hasOwnProperty;
        let propMap = {};
        let observerMap = null;
        let events = match.match(/\.triggerEvent\(['"]\w+['"]/g) || [];

        for (let i = 0; i < events.length; i++) {
          let event = events[i];
          let name = event.match(/\(['"](\w+)['"]/)[1];
          name = 'on' + name[0].toUpperCase() + name.substring(1);
          propMap[name] = () => {};
        }

        for (let key in obj) {
          if (has.call(obj, key)) {
            let item = obj[key];
            propMap[key] = item.value;

            if (item.observer) {
              observerMap = observerMap || {};

              if (typeof item.observer === 'function') {
                observerMap[key] = item.observer;
              } else {
                observerMap[key] = eval(`() => {
                  this["`+item.observer+`"].apply(this, arguments);
                }`);
              }
            }
          }
        }

        let didMount = `
        didMount() {
          this.data = Object.assign({}, this.data, this.props);
          
          this.created && this.created.apply(this, arguments);
          this.attached && this.attached.apply(this, arguments);
          this.ready && this.ready.apply(this, arguments);
        }`;

        let didUnmount = `,
        didUnmount() {
          this.detached && this.detached.apply(this, arguments);
        }`;

        let didUpdate = `,
          didUpdate: function(prevProps, preData) {
            for (let key in this.props) {
              if (_observers && typeof(_observers[key]) === 'function') {
                if (JSON.stringify(prevProps[key]) !== JSON.stringify(this.props[key]) && 
                JSON.stringify(preData[key]) !== JSON.stringify(this.props[key])) {
                  this.setData(Object.assign({}, this.data, {[key]: this.props[key]}));
                  _observers[key].apply(this, [this.props[key], prevProps[key]]);
                }
              } else if (this.props[key] !== prevProps[key]) {
                this.data[key] = this.props[key];
                this.setData(this.data);
              }
            }
          },`;

        let lifeCircle = [didMount, didUnmount, didUpdate].join('');
        let observers = (uneval(observerMap)).replace(/^\(|\)$/g, '').replace(/observer\(/g, 'function(').replace(/\(\) => {/g, 'function() {');
        let newProps = props.replace(str, uneval(propMap).replace(/^\(|\)$/g, ''));

        return match.replace('Component({', 'let _observers = ' + observers + ';\r\nComponent({\r\n' + lifeCircle).replace(props, newProps);
      }))
      .pipe(replace(/methods:[\s\n]*{[\s\S]*/g, function(match) {
        // e.target.targetDataset -> e.target.dataset;
        return match.replace(/on\w+\((\w+)\)\s*{/g, function(m, p1) {
          return [
            m,
            `if (${p1} && ${p1}.target && ${p1}.target.targetDataset) {
              ${p1}.target.dataset = ${p1}.target.targetDataset;
            }`
          ].join('\r\n');
        });
      }))
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