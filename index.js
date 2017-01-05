'use strict';
/**
 * this resolver is used as a plugin of eslint-plugin-import
 * to solve npm package mapping problem
 *
 */
const path = require('path');
const coreModules = {};

require('./core.json').forEach(function (m) {
  this[m] = true
}, coreModules);

exports.interfaceVersion = 2;

const Module = module.constructor;

exports.resolve = (modulePath, sourceFile, config) => {
  const isRelativePath = modulePath[0] === '.';
  if (!isRelativePath && coreModules[modulePath]) {
    return { found: true, path: null };
  }

  const sourceDir = path.dirname(sourceFile);
  let findPath;

  if (isRelativePath) {
    findPath = path.resolve(sourceDir, modulePath);
    return findModulePath(findPath, []);
  }

  /* istanbul ignore else */
  if (typeof config === 'object') {
    for (let i = 0, len = config.length; i < len; i++) {
      const re = new RegExp(`(^|/)${config[i][0]}($|/)`);
      const match = modulePath.match(re);
      if (match) {
        findPath = modulePath.replace(match[0], `${match[1]}${config[i][1]}${match[2]}`);
        break;
      }
    }
  }

  if (!findPath) {
    findPath = modulePath;
  }

  const paths = resolveLookupPaths(findPath, sourceDir);
  console.log('paths', paths);
  return findModulePath(findPath, paths);
};

function findModulePath(request, paths) {
  const filename = Module._findPath(request, paths);
  return {
    found: !!filename,
    path: filename || null
  };
}

function resolveLookupPaths(modulePath, absoluteSourceDir) {
  const paths = [];
  let curDir;
  let nextDir = absoluteSourceDir;
  do {
    curDir = nextDir;
    let p = curDir + path.sep + 'node_modules';
    paths.push(p);
    nextDir = path.resolve(curDir, '..');
  } while(nextDir !== curDir);

  paths.push.apply(paths, Module.globalPaths);
  return paths;
}
