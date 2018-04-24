const fs = require('fs');

// traverse tree with dfs
function treeDFS(tree, callback) {
  for (let it of tree.slice()) {
    callback(it, tree);
    if (typeof it === 'object') {
      treeDFS(it.children, callback);
    }
  }
}

function makeReadme(filterSection = []) {
  const readme = 'README.md';
  const data = fs.readFileSync(readme, 'utf-8');

  const lines = data.split('\n');
  let line, m;
  // save the parsed data
  const tree = [];

  let parentSection = null;
  let section = null;

  // little trick，如果第一行不是 #，则增加一个 #
  if (!/^#(?!#)/.test(lines[0])) {
    lines.unshift('# README');
  }

  while((line = lines.shift()) !== undefined) {
    m = line && line.match(/^(#+)(?!#)(.*)$/);

    if ( m && m.length == 3 ) {
      section = {
        title: m[2].trim(),
        level: m[1].length,
        parent: null,
        children: []
      };

      while (parentSection && parentSection.level >= section.level) {
        parentSection = parentSection.parent;
      }

      if (parentSection) {
        section.parent = parentSection;
        parentSection.children.push(section);
        parentSection = section;
      } else {
        tree.push(section);
        parentSection = section;
      }
    } else if (section) {
      section.children.push(line);
    } else {
      console.error('\nnot valid line: ', line, '\n');
    }
  }

  if (filterSection.length > 0) {
    treeDFS(tree, function (item, parent) {
      if (typeof item === 'object') {
        if (filterSection.includes(item.title)) {
          const index = parent.findIndex(x => x === item);
          parent.splice(index, 1);
        }
      }
    });
  }

  const treeToDoc = tree => tree.length > 0 ? tree.map((it) => {
    if (typeof it === 'object') {
      return `${'#'.repeat(it.level)} ${it.title}\n${treeToDoc(it.children)}`;
    }
    return it;
  }).join('\n') : '';

  const newDoc = treeToDoc(tree);

  fs.writeFileSync(`dist/${readme}`, newDoc);
}

function copyFile(filename) {
  fs.writeFileSync(`dist/${filename}`, fs.readFileSync(filename));
}

makeReadme([
  'Note',
  'CHANGELOG',
  'References'
]);
[
  'core.js',
  'index.js',
  'package.json'
].forEach(copyFile);

console.log('\n release is ready !!!');
