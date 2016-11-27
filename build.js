'use strict';

const fs = require('fs-extra');
const path = require('path');
const merge = require('merge');
const postcss = require('postcss');
const log = require('log-util');

const Promise = require('promise');
const fsCopy = Promise.denodeify(fs.copy);
const fsEmptyDir = Promise.denodeify(fs.emptyDir);
const fsReadFile = Promise.denodeify(fs.readFile);
const fsOutputFile = Promise.denodeify(fs.outputFile, 2);

const Stromboli = require('stromboli');

let stromboli = new Stromboli();
let config = merge.recursive(true, require('./config/common'), require('./config/build'));

config.componentRoot = 'src';

let builtComponentName = 'drupal-theme';

let tmpPath = config.paths.tmpPath || 'tmp';
let sourcePath = path.join(tmpPath, builtComponentName);

let write = require('./lib/write');

let processStylesheet = function () {
  let distPath = config.paths.stylesheetsDistPath;
  let cssFilePath = path.join(sourcePath, 'index.css');

  return fsReadFile(cssFilePath).then(
    function (css) {
      return postcss(config.postcss.plugins).process(css.toString(), {from: cssFilePath}).then(
        function (result) {
          return fsOutputFile(path.join(distPath, 'index.css'), result.css);
        }
      );
    }
  )
};

let processScript = function () {
  let distPath = config.paths.scriptsDistPath;

  return fsCopy(path.join(sourcePath, 'index.js'), path.join(distPath, 'index.js'));
};

let processTemplates = function () {
  let distPath = config.paths.templatesDistPath;

  let promises = [];

  // twig templates
  promises.push(
    new Promise(function (fulfill, reject) {
      let templatesPath = path.join(sourcePath, 'src');

      fs.walk(path.join(templatesPath))
        .on('data', function (item) {
          let ext = path.extname(item.path);

          if (ext == '.twig') {
            let relativePath = path.relative(path.resolve(templatesPath), item.path);
            let destPath = path.join(distPath, relativePath);

            fs.copySync(item.path, destPath);
          }
        })
        .on('end', function () {
          fulfill();
        });
    })
  );

  return Promise.all(promises);
};

fsEmptyDir(tmpPath).then(function () {
  stromboli.getPlugins(config).then(
    function (plugins) {
      stromboli.getComponents(config.componentRoot, config.componentManifest).then(
        function (components) {
          // create build component from returned components
          plugins.forEach(function (plugin) {
            let pluginData = '';

            components.forEach(function (component) {
              let sourceFile = path.join(component.path, plugin.entry);

              try {
                let sourceFileStat = fs.statSync(sourceFile);

                if (sourceFileStat.isFile()) {
                  sourceFile = path.relative(tmpPath, sourceFile);

                  if (plugin.name == 'twig') {
                    pluginData += '{% include "' + sourceFile + '" %}';
                  }
                  else if (plugin.name == 'sass') {
                    pluginData += '@import "' + sourceFile + '";';
                  }
                  else if (plugin.name == 'javascript') {
                    pluginData += 'require("' + sourceFile + '");';
                  }
                }
              }
              catch (err) {
                console.log('Entry', plugin.entry, 'not found for component', component.name);
              }
            });

            if (pluginData) {
              fs.outputFileSync(path.join(tmpPath, plugin.entry), pluginData);
            }
          });

          fs.outputFileSync(path.join(tmpPath, config.componentManifest), JSON.stringify({
            name: builtComponentName
          }));

          config.componentRoot = tmpPath;

          stromboli.start(config).then(
            function (components) {
              // write components output to 'dist' folder
              return Promise.all(components.map(function (component) {
                let promises = [];

                component.renderResults.forEach(function (renderResult, pluginName) {
                  promises.push(write(renderResult, path.join(tmpPath, component.name)));
                });

                return Promise.all(promises);
              })).then(
                function (files) {
                  let promises = [];

                  promises.push(processScript());
                  promises.push(processStylesheet());
                  promises.push(processTemplates());

                  // clean
                  return Promise.all(promises).then(
                    function () {
                      log.info('BUILD DONE');
                    },
                    function (err) {
                      console.log(err);
                    }
                  )
                }
              );
            },
            function (err) {
              console.log(err);
            }
          );
        }
      );
    }
  );
});