const resolver = require('..');
const assert = require('assert');

const builtinModules = module.constructor.builtinModules || require('builtin-modules');

describe('resolver-alias/index.js', () => {
  const sourceFile = module.filename;
  const alias = {
    map: [
      ['polyfill', 'polyfill2/polyfill.min.js'],
      ['module3/heihei', 'module2/smile'],
      ['^core$', './dist/core'],
      ['core', 'module2/styles'],
      ['red', './nothing'], // should not impact the paths which contain red and not starts with red
      ['module3', 'module2'],
      ['srcCore', './core'],
      ['relativeSetup', './test/setup'],
      ['arrayPaths', ['has_abc', 'has_none', 'has_def']],
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
    'mocha'
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
  const aliasModulePathArrRelativeToProjectRootDir = [
    'srcCore',
    'relativeSetup'
  ];
  const aliasModuleArrayPathArr = [
    'module3/heihei',
    'module3/styles/red',
    'module3/nav',
    'polyfill',
    'core/red',
    'core',
    'arrayPaths/abc',
    'arrayPaths/def',
  ];
  const noneExistModulePathArr = [
    'abc/ggg',
    'module2/bye',
    'module33',
    './test.json'
  ];

  beforeEach(() => {
    // empty Module path cache
    const pathCache = module.constructor._pathCache;
    Object.keys(pathCache).forEach(function (key) {
      delete this[key];
    }, pathCache);
  });

  it('resolve Node.js builtin modules', () => {
    builtinModules.forEach((m) => {
      const resolveModule = resolver.resolve(m, sourceFile, alias);
      assert(resolveModule.found, `builtin module '${m}' isn't resolved`);
    });
  });

  it('resolve modules with custom file extensions', () => {
    normalModulePathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias);
      assert(resolveModule.found, `modulePath ${p} isn't resolved`);
    });
  });

  it('resolve normal modules which end with native support file extensions without custom file extensions', () => {
    const alias2 = Object.assign({}, alias, {
      extensions: []
    });
    normalModulePathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias.map);
      // happy.ts
      if (p.indexOf('happy') !== -1) {
        assert(!resolveModule.found, `modulePath ${p} with custom file extension is resolved`);
      } else {
        assert(resolveModule.found, `normal modulePath ${p} isn't resolved`);
      }

      const resolveModule2 = resolver.resolve(p, sourceFile, alias2);
      // happy.ts
      if (p.indexOf('happy') !== -1) {
        assert(!resolveModule2.found, `modulePath ${p} with custom file extension is resolved`);
      } else {
        assert(resolveModule2.found, `normal modulePath ${p} isn't resolved`);
      }

    });
  });

  it('unable to resolve the modules which end with native support file extensions with custom file extensions which do not contains the native support file extensions', () => {
    const alias2 = Object.assign({}, alias, {
      extensions: ['.ts']
    });

    normalModulePathArr.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias2);
      if (/(happy|no_extension_file)$/.test(p)) {
        assert(resolveModule.found, `modulePath ${p} with custom file extension isn't resolved`);
      } else {
        assert(!resolveModule.found, `normal modulePath ${p} with custom file extensions which do not contains the native support file extensions is resolved`);
      }
    });
  });

  it('unable to resolve the modules with unset file extension', () => {
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

  it('resolve alias modules which are relative to the project root directory', () => {
    aliasModulePathArrRelativeToProjectRootDir.forEach((p) => {
      const resolveModule = resolver.resolve(p, sourceFile, alias);
      assert(resolveModule.found, `alias modulePath ${p} isn't resolved`);
    });
  });

  it('resolve alias modules that have an array of actual modules or paths', () => {
    aliasModuleArrayPathArr.forEach((p) => {
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
