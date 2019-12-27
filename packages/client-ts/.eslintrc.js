module.exports = {
  extends: 'eslint-config-react-app',
  plugins: ['import'],
  rules: {
    'eqeqeq': 'error',

    'import/exports-last': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
  }
}
