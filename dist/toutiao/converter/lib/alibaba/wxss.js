var wx = require('./../../../adaptor.js').default;
function convert(e){return e.replace(/\.wxss(["'])/g,(e,r)=>r)}module.exports=convert;