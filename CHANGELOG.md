# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.2] - 2016-01-05
### Changed
- fix the bug that it's unable to resolve non-relative path modules when current working directory is subdirectory of the project root directory.

## [1.0.1] - 2016-12-23
### Changed
- remove package `resolve` to fix the bug caused by format changing of the internal file core.json of resolve 1.1.7
- add bug description and solution to README.md

## [1.0.0] - 2016-12-23
### Added
- support resolve node modules with alias config
- support resolve normal node modules, including Node.js core modules and other third party modules
- support resolve relative path modules
