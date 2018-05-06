const resolver = require('..');
const assert = require('assert');

const builtinModules = module.constructor.builtinModules || require('builtin-modules');

describe('resolver-alias/index.js', () => {
  const sourceFile = module.filename;
  const alias = {
    map: [
      ['polyfill', 'polyfill2/polyfill.min.js'],
      ['module3/heihei', 'module2/smile'],
      ['^core$', '../dist/core'],
      ['core', 'module2/styles'],
      ['module3', 'module2']
    ],
    extensions: ['.js', '.ts', '.jsx', '.json']
  };

  const normalModulePathArr = [
    'module1',
    'module1/abc',
    'module1/happy',
    'module1/no_extension_file',
    '../package',
    './test',
    'mocha',
    'fs'
  ];
  const UnsetExtensionPathArr = [
    'module1/unsupported_extension'
  ];
  const aliasModulePathArr = [
    'module3/heihei',
    'module3/styles/red',
    'module3/nav',
    'polyfill',
    'core/red',
    'core',
  ];
  const noneExistModulePathArr = [
    'abc/ggg',
    'module2/bye',
    'module33',
    './test.json'
  ];

  it('resolve Node.js builtin modules', () => {
    builtinModules.forEach((m) => {
      const resolveModule = resolver.resolve(m, sourceFile, alias);
      assert(resolveModule.found, `builtin module '${m}' isn't resolved`);
    });
  });

  it('resolve normal node modules', () => {
    normalModulePathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias);
      assert(resolveModule.found, `normal modulePath ${p} isn't resolved`);
    });
  });

  it('unable to resolve the modules with unset extension', () => {
    UnsetExtensionPathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias);
      assert(!resolveModule.found, `modulePath ${p} with unset file extension is resolved`);
    });
  });

  it('resolve alias modules', () => {
    aliasModulePathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias);
      assert(resolveModule.found, `alias modulePath ${p} isn't resolved`);
    });
  });

  it('unable to resolve the modules that do not exist', () => {
    noneExistModulePathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias);
      assert(!resolveModule.found, `none exist modulePath ${p} is resolved`);
    });
  });

  it('change current working directory into sub directory of project and resolve exists modules', () => {

    process.chdir('test');
    delete require.cache[require.resolve('..')];
    const newResolver = require('..');

    normalModulePathArr.forEach((p) => {
      const resolveModule = newResolver.resolve(p, sourceFile, alias);
      assert(resolveModule.found, `normal modulePath ${p} isn't resolved`);
    });
  });

  it('resolve a module which located in parent node_modules directory', () => {
    const a = require('mod/a');
    assert(a.abc.found && a.abc.path != null, 'exist module is not resolved');
  });

});
