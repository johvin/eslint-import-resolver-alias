'use strict';

const fs = require('fs');
const path = require('path');

const moduleDir = 'test/node_modules';
const files = [
  `${moduleDir}/module1/abc.js`,
  `${moduleDir}/module2/styles/red.js`,
  `${moduleDir}/module2/smile.js`,
  `${moduleDir}/polyfill2/polyfill.min.js`,
  `${moduleDir}/mod/a.js`
];

if (!fs.existsSync(moduleDir)) {
  files.forEach(file => {
    createEmptyFile(file);
  });
  // 测试带有 node_modules 的路径的 resolver
  fs.writeFileSync(
    files[files.length - 1],
    `
    var resolver = require('../../..');
    exports.abc = resolver.resolve('module1/abc', __filename);
    `
  );
}

function createEmptyFile (file) {
  if (fs.existsSync(file)) {
    return fs.writeFileSync(file, '');
  }

  const pathArr = file.split('/');
  // 去掉文件名，只保留文件夹名
  pathArr.pop();

  let p = '';

  while(pathArr.length > 0) {
    p = path.join(p, pathArr.shift());
    if (fs.existsSync(p)) {
      continue;
    }
    fs.mkdirSync(p);
  }

  fs.writeFileSync(file, '');
}