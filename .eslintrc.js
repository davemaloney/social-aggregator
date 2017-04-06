module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'react/no-multi-comp': 0,
    'react/prefer-es6-class': 0,
    'react/prefer-stateless-function': 0,
  },
  globals: {
    __DEV__: false,
    google: true,
    document: true,
    window: true
  }
};
