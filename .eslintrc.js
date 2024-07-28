module.exports = {
  env: {
    commonjs: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  globals: {
    HTTP: 'readonly',
    OvmsConfig: 'readonly',
    OvmsMetrics: 'readonly',
    OvmsNotify: 'readonly',
    PubSub: 'readonly',
    performance: 'readonly',
    print: 'readonly',
    globalThis: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2015,
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.test.js'],
      extends: ['plugin:jest/all'],
      plugins: ['jest'],
    },
  ],
}
