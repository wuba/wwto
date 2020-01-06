var wx = require('./../adaptor.js').default;
module.exports = function walkNode (node, moduleId) {
  if (node.childNodes) {
    [].slice.call(node.childNodes || []).forEach((child) => {
      if (child.tagName) {
        // scoped 情况下，可能直接把样式绑定到节点上。
        // 是标签 则增加class
        const cls = child.getAttribute('class');
        child.setAttribute('class', (`${cls} ${moduleId}`).trim());
        walkNode(child, moduleId);
      }
    });
  }
};