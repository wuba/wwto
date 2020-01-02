const convert = require('../../../src/converter/lib/alibaba/script.js');

function testScript(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testScript(
  'alibaba script convert test:',
  convert(`
  const reg = /triggerEvent\(([^)]+)\)/
  const fs = require('fs')
  import wx from '././test'
  const fetch = this
  fetch.abs
  App({
    onLaunch( opts ) {
      console.log('App Launch', opts)
    },
    onShow: (opts) {
      console.log('App Show', opts)
    }
  })
  if (item.properties.read){}
  this.triggerEvent('unmount')
  methods: {}`, false),
  `
  const reg = /triggerEvent(([^)]+))/
  const fs = require('./fs')
  import wx from '././test'
  const renameFetch =  this
  renameFetch.abs
  App({
    onLaunch( opts ) {opts = opts || {}; opts.query = opts.query || {};
      console.log('App Launch', opts)
    },
    onShow: (opts) {
      console.log('App Show', opts)
    }
  })
  if (item.props.read){}
  this.triggerEvent('unmount')
  methods: {}`
)
