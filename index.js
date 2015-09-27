var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var loaderUtils = require('loader-utils');
var chalk = require('chalk');

function errorFormat(msg) {
  return chalk.bold(chalk.red(msg));
};

function main(callback, loader, sourcePath) {
  fs.unlink('elm.js', function () {
    compileApp(callback, loader, sourcePath);
  });
}

function compileApp(callback, loader, sourcePath) {
  var make = spawn('elm-make', [sourcePath]);
  var weErrored = false;
  var errors = '';

  make.stdout.on('data', function (data) {
  });

  make.stderr.on('data', function (data) {
    weErrored = true;
    errors += data;
  });

  make.on('error', function (err) {
    weErrored = true;
    errors += 'elm-make failed. do you have elm installed?';
  });

  make.on('close', function () {
    if (weErrored === false) {
      handleNormalClose(callback, loader);
    } else {
      console.log(errorFormat('elm-make compilation errors:'));
      console.log(errorFormat(errors));
      callback('elm-make errors in compilation');
    }
  });
}

function handleNormalClose(callback, loader) {
  fs.readFile('elm.js', function (err, data) {
    if (err) throw err;
    var output = '' + data + '\n' + 'module.exports = Elm;';
    callback(null, output);
  });
}

module.exports = function (source) {
  var callback = this.async();
  var sourcePath = loaderUtils.getRemainingRequest(this);

  this.cacheable();
  this.addDependency(sourcePath);

  if (!callback) {
    throw "can't handle non-async compilation. sorry.";
  }

  main(callback, this, sourcePath);
}
