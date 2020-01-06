module.exports = {
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  parser: "babel-eslint",
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },

  extends: "standard",

  rules: {
    // new实例不赋值
    'no-new': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 引号类型，不限制
    'quotes': 'off',
    // 语句强制分号结尾
    'semi': ['error', 'always'],
    // 尾项逗号
    'comma-dangle': 0,
    // 判等符号使用，建议使用===或!==
    'eqeqeq': ['warn', 'smart'],
    // 驼峰命名
    'camelcase': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    'spaced-comment': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': 'off',
    'no-proto': 'off',
    'no-plusplus': 'off',
    'eol-last': 'off',
    'arrow-body-style': 'off'
  }
};