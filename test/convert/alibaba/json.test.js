const convert = require('../../../src/converter/lib/alibaba/json.js');

function testJson(testName, code1, code2) {
  test(testName || 'testing: ', () => {
    expect(code1).toBe(code2);
  });
}

testJson(
  'alibaba json convert test:',
  convert(`
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "page/component/index",
        "iconPath": "image/icon_component.png",
        "selectedIconPath": "image/icon_component_HL.png",
        "text": "组件"
      },
      {
        "pagePath": "page/API/index",
        "iconPath": "image/icon_API.png",
        "selectedIconPath": "image/icon_API_HL.png",
        "text": "接口"
      }
    ]
  },{
    "navigationBarTitleText": "小程序接口能力展示",
    "usingComponents": {
      "setTabBar": "./components/set-tab-bar/set-tab-bar",
      "path": "/wto/ test/convert alibaba/json.test.js"
    }
  }`),
  `
  \"tabBar\": {
    \"textColor\": \"#7A7E83\",
    \"selectedColor\": \"#3cc51f\",
    \"borderStyle\": \"black\",
    \"backgroundColor\": \"#ffffff\",
    \"items\": [
      {
        \"pagePath\": \"page/component/index\",
        \"icon\": \"image/icon_component.png\",
        \"activeIcon\": \"image/icon_component_HL.png\",
        \"name\": \"组件\"
      },
      {
        \"pagePath\": \"page/API/index\",
        \"icon\": \"image/icon_API.png\",
        \"activeIcon\": \"image/icon_API_HL.png\",
        \"name\": \"接口\"
      }
    ]
  },{
    \"navigationBarTitleText\": \"小程序接口能力展示\",
    \"usingComponents\": {
      "set-tab-bar": "./components/set-tab-bar/set-tab-bar",
      "path": "/wto/ test/convert alibaba/json.test.js"
    }
  }`
)