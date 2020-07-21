module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {},
};
