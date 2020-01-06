"use strict";

var _adaptor = _interopRequireDefault(require("./../adaptor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postcss = require('postcss');

const selectorParser = require('postcss-selector-parser');

module.exports = postcss.plugin('add-id', id => {
  return function (root) {
    root.each(function rewriteSelector(node) {
      if (!node.selector) {
        // handle media queries
        if (node.type === 'atrule' && node.name === 'media') {
          node.each(rewriteSelector);
        }

        return;
      }

      node.selector = selectorParser(selectors => {
        selectors.each(selector => {
          let target = null;
          selector.each(n => {
            if (n.type !== 'pseudo') {
              target = n;
            }
          });
          selector.insertAfter(target, selectorParser.className({
            value: id
          }));
        });
      }).process(node.selector).result;
    });
  };
});