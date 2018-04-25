# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
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
