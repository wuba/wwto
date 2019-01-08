const postcss = require('postcss');
const selectorParser =  require('postcss-selector-parser');

module.exports = postcss.plugin('add-id', function (id) {
  return function (root) {
    root.each(function rewriteSelector (node) {
      if (!node.selector) {
        // handle media queries
        if (node.type === 'atrule' && node.name === 'media') {
          node.each(rewriteSelector);
        }
        return;
      }

      node.selector = selectorParser(function (selectors) {
        selectors.each(function (selector) {
          let node = null;

          selector.each(function (n) {
            if (n.type !== 'pseudo') node = n;
          });

          selector.insertAfter(node, selectorParser.className({
            value: id
          }));
        });
      }).process(node.selector).result;
    });
  };
});