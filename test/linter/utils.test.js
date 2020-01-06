/* eslint-disable no-undef */
const Plug = require('../../src/linter/src/utils/utils.js');

function testCode(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toBe(code02);
  });
}

testCode(
  'linter utils test:',
  Plug.calcLine(`
  "page/API/pages/custom-message/custom-message",
  "page/API/pages/template-message/template-message",
  "page/API/pages/subscribe-message/subscribe-message",
  "page/API/pages/set-navigation-bar-title/set-navigation-bar-title",
  "page/API/pages/navigation-bar-loading/navigation-bar-loading",
  "page/API/pages/navigator/navigator",
  "page/API/pages/pull-down-refresh/pull-down-refresh",
  "page/API/pages/animation/animation"`, 'loading'),
  6
);

function testUtils(testName, code01, code02) {
  test(testName || 'testing: ', () => {
    expect(code01).toStrictEqual(code02);
  });
}

testUtils(
  'linter utils test:',
  Plug.unsupportedAttrOrEvents(`
  Page({
    data: {
      nodes: [{
        name: 'div',
        attrs: {
          class: 'div_class',
          style: 'line-height: 60px; color: red;'
        },
        children: [{
          type: 'text',
          text: 'You never know what you're gonna get.'
        }]
      }]
    }
  })`, '../test', [{ attrs: ['class', 'style'] }], 'test', 'test'),
  []
);