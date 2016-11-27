const path = require('path');

let pkg = require('../package.json');

let distPath = '/home/ericmorand/Projects/nightlycommit/drupal-theme/src';
let assetsDistPath = path.join(distPath, 'assets');
let scriptsDistPath = path.join(distPath, 'js');
let stylesheetsDistPath = path.join(distPath, 'css');
let templatesDistPath = path.join(distPath, 'templates/vendor', pkg.name);

module.exports = {
  plugins: {
    javascript: {
      entry: 'index.js',
      config: {
        plugin: [
          function (bundle, opts) {
            return require('minifyify')(bundle, {map: false});
          }
        ]
      }
    },
    twig: {
      entry: 'index.twig'
    },
    sass: {
      config: {
        sourceMap: false,
        sourceComments: false
      },
      entry: 'index.scss'
    }
  },
  distPath: distPath,
  postcss: {
    plugins: [
      require('cssnano')({
        discardDuplicates: true
      }),
      require('postcss-copy')({
        src: '.',
        dest: distPath,
        template: function (fileMeta) {
          return 'assets/' + fileMeta.hash + '.' + fileMeta.ext;
        },
        relativePath: function (dirname, fileMeta, result, options) {
          return path.relative(fileMeta.src, stylesheetsDistPath);
        },
        hashFunction: function (contents) {
          // sha256
          const createSha = require('sha.js');

          return createSha('sha256').update(contents).digest('hex');
        }
      })
    ]
  },
  paths: {
    tmpPath: 'tmp/build',
    assetsDistPath: assetsDistPath,
    scriptsDistPath: scriptsDistPath,
    stylesheetsDistPath: stylesheetsDistPath,
    templatesDistPath: templatesDistPath
  }
};