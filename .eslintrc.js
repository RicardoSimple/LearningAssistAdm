module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'dot-notation': 'off',
    camelcase: 'off',
    'no-useless-escape': 'off',
    'no-useless-return': 'off',
    'no-unreachable': 'off',
    'node/handle-callback-err': 'off',
    'array-callback-return': 'off',
    'vue/no-dupe-keys': 'off'
  }
}
