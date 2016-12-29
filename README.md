# eslint-import-resolver-alias

[![Version npm][version]](http://browsenpm.org/package/eslint-import-resolver-alias)[![Build Status][build]](https://travis-ci.org/johvin/eslint-import-resolver-alias)[![Dependencies][david]](https://david-dm.org/johvin/eslint-import-resolver-alias)[![Coverage Status][cover]](https://coveralls.io/github/johvin/eslint-import-resolver-alias?branch=master)

[version]: http://img.shields.io/npm/v/eslint-import-resolver-alias.svg?style=flat-square
[build]: http://img.shields.io/travis/johvin/eslint-import-resolver-alias/master.svg?style=flat-square
[david]: https://img.shields.io/david/johvin/eslint-import-resolver-alias.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/johvin/eslint-import-resolver-alias/master.svg?style=flat-square


This is a simple Node module import resolution plugin for [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), which supports module alias.

## Example

```js
module.exports = {
  settings: {
    'import/resolver': {
      'alias': [
        ['babel-polyfill', 'babel-polyfill/dist/polyfill.min.js'],
        ['material-ui/DatePicker', '../custom/DatePicker'],
        ['material-ui', 'material-ui-ie10']
      ]
    }
  }
};
```


Note:

- The items of alias config array is also array which contains 2 string
    + The first string represents the mapped module
    + The second string represents the module alias
- The order of 'material-ui/DatePicker' and 'material-ui' cannot be reversed, otherwise the alias rule 'material-ui/DatePicker' does not work.

## Note

`eslint-import-resolver-alias` 1.0.0 depends on part of `resolve` 1.1.7 which changes its format from 1.2.0 and the resolve dependency is resolved as ^1.1.7 in package.json dependencies settings. So update `eslint-import-resolver-alias` to 1.0.1 is the correct way.

## CHANGELOG

[`CHANGELOG`](./CHANGELOG.md)

## References:

- eslint-plugin-import/no-extraneous-dependencies
- eslint-plugin-import/no-unresolved
- eslint-module-utils/resolve
- resolve
- eslint-import-resolver-node
