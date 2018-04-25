const fs = require('fs');
const adjustMD = require('adjust-md-for-publish');

function copyFile(filename) {
  fs.writeFileSync(`dist/${filename}`, fs.readFileSync(filename));
}

adjustMD({
  filename: 'README.md',
  destname: 'dist/README.md',
  filterSection: [
    'CHANGELOG',
    'References'
  ]
});

[
  'core.js',
  'index.js',
  'package.json'
].forEach(copyFile);

console.log('\n release is ready !!!');
