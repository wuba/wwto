/* eslint-disable no-eval */
const uneval = require('uneval');
const balancingGroup = require('../utils/balancing-group');
const extractFn = require('../utils/extra-function');

function defQuery(match, opt) {
  return [match, `${opt} = ${opt} || {}; ${opt}.query = ${opt}.query || {};`].join('');
}

function convert(jsText, isWpy) {
  return jsText
    .replace(/(require\(['"])(\w+)/g, '$1./$2')
    .replace(/(from\s+['"])(\w+)/g, (match, p1) => {
      // 相对路径以./开头
      return match.replace(p1, [p1, isWpy ? '' : './'].join(''));
    })
    .replace(/(let|var|const)\s+fetch\s*=/g, '$1 renameFetch = ')
    .replace(/(\s+)fetch([;\s]*)$/, '$1renameFetch$2')
    .replace(/[^\w.'"]fetch[.(]/g, (match) => {
      // fetch是全局只读对象，不允许赋值
      return match.replace(/fetch/g, 'renameFetch');
    })
    .replace(/App\({[\s\S]+(onLaunch|onShow):\s*function\s*\(\s*(\w+)\s*\)[^{]*{/g, (match, p1, p2) => {
      // query默认值{}
      return defQuery(match, p2);
    })
    .replace(/App\({[\s\S]+(onLaunch|onShow)\s*\(\s*(\w+)\s*\)[^{]*{/g, (match, p1, p2) => {
      // query默认值{}
      return defQuery(match, p2);
    })
    .replace(/App\({[\s\S]+(onLaunch|onShow):\s*\(\s*(\w+)\s*\)\s*=>\s*[^{]*{/g, (match, p1, p2) => {
      // query默认值{}
      return defQuery(match, p2);
    })
    .replace(/Component\([\s\S]+properties:[^{]*{/, (match) => {
      return match.replace('properties', 'props');
    })
    .replace(/\.properties/g, (match) => {
      return match.replace('.properties', '.props');
    })
    .replace(/Component\([\s\S]+methods:[^{]*{/, (match) => {
      return [
        match,
        `,\r\ntriggerEvent: function(name, opt) {
            this.props['on' + name[0].toUpperCase() + name.substring(1)]({detail:opt});
          },\r\n`
      ].join('');
    })
    .replace(/[\s\S]+/, (match) => {
      // 只处理组件
      if (!match.match(/Component\(/)) return match;

      const lifeCircleNames = ['created', 'attached', 'ready', 'detached'];
      const lifeCircleFns = lifeCircleNames.map((name) => {
        const {
          args,
          body
        } = extractFn(match, name);

        return `${name}(${args})${body || '{}'}`;
      }).join(',\n');

      const methods = (match.match(/methods:[\s\n]*{/) || {})[0];
      if (methods) {
        match = match.replace(methods, [methods, lifeCircleFns].join('\r\n'));
      } else {
        match = match.replace('Component({', [
          'Component({',
          'methods: {',
          lifeCircleFns,
          '}'
        ].join('\r\n'));
      }

      const props = (match.match(/props:[\s\S]+/) || {})[0] || '';
      if (!props) {
        return match;
      }

      const str = balancingGroup(props);
      const obj = eval(`(${str})`);
      const has = Object.prototype.hasOwnProperty;
      const propMap = {};
      let observerMap = null;
      const events = match.match(/\.triggerEvent\(['"]\w+['"]/g) || [];

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        let name = event.match(/\(['"](\w+)['"]/)[1];
        name = `on${name[0].toUpperCase()}${name.substring(1)}`;
        propMap[name] = () => {};
      }

      Object.keys(obj).forEach((key) => {
        if (has.call(obj, key)) {
          const item = obj[key];
          propMap[key] = item.value;

          if (item.observer) {
            observerMap = observerMap || {};

            if (typeof item.observer === 'function') {
              observerMap[key] = item.observer;
            } else {
              observerMap[key] = eval(`() => {
                  this["${item.observer}"].apply(this, arguments);
                }`);
            }
          }
        }
      });

      const didMount = `
        didMount() {
          this.data = Object.assign({}, this.data, this.props);
          
          this.created && this.created.apply(this, arguments);
          this.attached && this.attached.apply(this, arguments);
          this.ready && this.ready.apply(this, arguments);
        }`;

      const didUnmount = `,
        didUnmount() {
          this.detached && this.detached.apply(this, arguments);
        }`;

      const didUpdate = `,
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

      const lifeCircle = [didMount, didUnmount, didUpdate].join('');
      const observers = (uneval(observerMap)).replace(/^\(|\)$/g, '').replace(/observer\(/g, 'function(').replace(/\(\) => {/g, 'function() {');
      const newProps = props.replace(str, uneval(propMap).replace(/^\(|\)$/g, ''));

      return match.replace('Component({', `let _observers = ${observers};\r\nComponent({\r\n${lifeCircle}`).replace(props, newProps);
    })
    .replace(/methods:[\s\n]*{[\s\S]*/g, (match) => {
      // e.target.targetDataset -> e.target.dataset;
      return match.replace(/on\w+\((\w+)\)\s*{/g, (m, p1) => {
        return [
          m,
          `if (${p1} && ${p1}.target && ${p1}.target.targetDataset) {
              ${p1}.target.dataset = ${p1}.target.targetDataset;
            }`
        ].join('\r\n');
      });
    });
}

module.exports = convert;