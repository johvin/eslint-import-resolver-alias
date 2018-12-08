# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.1.2] - 2018-12-08
### Fixed
- fix the bug to not resolve `path/to/file` to `path/from/file` with the config `['to', 'from']`. see [#7][issue7]

### Changed
- update test case
- update changelog
- update usage to readme


## [1.1.1] - 2018-07-30
### Fixed
- fix the bug that the module mapped to a relative path can not be resolved. see [#5][issue5]

### Changed
- update test case
- update changelog
- update usage to readme
- add more package keywords


## [1.1.0] - 2018-05-06
### Added
- support custom file extensions

### Changed
- update test case
- update changelog
- update usage to readme


## [1.0.4] - 2018-04-25
### Added
- add builtin modules resolve test case and relevant dependencies

### Fixed
- fix the bug that inner function `resolveLookupPaths` resolve `/node_modules` as `//node_modules`
- update core modules for Node.js 8/9/...

### Changed
- add peerDependencies, repository, bugs, homepage config items to package.json
- update readme
- update changelog
- update travis config
- add release script to complete preparation before publish


## [1.0.3] - 2017-01-12
### Fixed
- fix the bug that the path like /path/to/node_modules/node_modules is excluded from the lookup paths


## [1.0.2] - 2017-01-05
### Changed
- fix the bug that it's unable to resolve non-relative path modules when current working directory is subdirectory of the project root directory.


## [1.0.1] - 2016-12-29
### Changed
- remove package `resolve` to fix the bug caused by format changing of the internal file core.json of resolve 1.1.7
- add bug description and solution to README.md


## [1.0.0] - 2016-12-23
### Added
- support resolve node modules with alias config
- support resolve normal node modules, including Node.js core modules and other third party modules
- support resolve relative path modules

<!-- references -->
[issue5]: https://github.com/johvin/eslint-import-resolver-alias/issues/5
[issue7]: https://github.com/johvin/eslint-import-resolver-alias/issues/7