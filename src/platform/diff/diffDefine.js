//<wwto-wx></wwto-wx> <wwto-baidu></wwto-baidu> <wwto-alipay><wwto-alipay>
const babel = require("@babel/core");

const traverse = require("@babel/traverse").default;

const generate = require("@babel/generator").default;

const platformMap = {
  wx: {
    tagName: 'WWTO_WX'
  },
  baidu: {
    tagName: 'WWTO_BAIDU'
  },
  alipay: {
    tagName: 'WWTO_ALIPAY'
  },
  tt: {
    tagName: 'WWTO_TT'
  }
};

module.exports = function(platform) {
  const saveName = platformMap[platform].tagName;
  const saveTagReg = [];
  saveTagReg.push(saveName);
  const deleteTag = [];
  Object.keys(platformMap).forEach(item => {
    if (item !== platform) {
      const delTagName = platformMap[item].tagName;
      deleteTag.push(delTagName);
    }
  });
  return function(text) {
    let matchTag = saveTagReg.concat(deleteTag);
    matchTag = new RegExp(matchTag.join('|'), 'g');
    if (!matchTag.test(text)) {
      return text;
    }
    try {
      const parsedAst = babel.parse(text);
      traverse(parsedAst, {
        enter(path) {
          //   console.log(path);
          if (path.node.type === 'IfStatement' && path.node.test && path.node.test.type === 'Identifier' && path.node.test.name && deleteTag.indexOf(path.node.test.name) >= 0) {
            if (path.node.consequent && path.node.consequent.body) {
              path.node.consequent.body = [];
              path.node.test.name = 'false';
            }
          }
          if (path.node.type === 'IfStatement' && path.node.test && path.node.test.type === 'Identifier' && path.node.test.name && saveTagReg.indexOf(path.node.test.name) >= 0) {
            path.node.test.name = 'true';
          }
        }
      });
      const output = generate(parsedAst, { minified: false }, {});
      return output.code;
    } catch (e) {
      console.log(e);
    }
    return text;
  };
};

/*

if (WWTO_WX) {

} else if (WWTO_BAIDU) {

} else if (WWTO_ALIPAY) {

}

*/