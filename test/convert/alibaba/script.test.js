/* eslint-disable no-undef */
const convert = require('../../../src/converter/src/alibaba/script.js');

function testScript(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testScript(
  'alibaba script convert test:',
  convert(`
  const fs = require('fs')
  import wx from "test"
  const fetch = this
  fetch.abs
  App({
    onLaunch( opts ) {
      console.log('App Launch', opts)
    },
    onShow: function ( opts ) {
      console.log('App Show', opts)
    },
    onShow: ( opts ) => {}
  })
  if (item.properties.read){}
  Component(
    properties:{}
  )`, true),
  `
  const fs = require('./fs')
  import wx from "test"
  const renameFetch =  this
  renameFetch.abs
  App({
    onLaunch( opts ) {opts = opts || {}; opts.query = opts.query || {};
      console.log('App Launch', opts)
    },
    onShow: function ( opts ) {opts = opts || {}; opts.query = opts.query || {};
      console.log('App Show', opts)
    },
    onShow: ( opts ) => {opts = opts || {}; opts.query = opts.query || {};}
  })
  if (item.props.read){}
  Component(
    props:{}
  )`
);
