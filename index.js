var fs = require('fs');
var spawn = require('child_process').spawn;
var loaderUtils = require('loader-utils');

function main(callback, loader) {
  fs.unlink('elm.js', function () {
    compileApp(callback, loader);
  });
}

function compileApp(callback, loader) {
  var make = spawn('elm-make', [loaderUtils.getRemainingRequest(loader)]);
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
      loader.emitError(errors);
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
  this.cacheable();

  var callback = this.async();
  var loader = this;

  if (!callback) {
    throw "can't handle non-async compilation. sorry.";
  }

  main(callback, loader);
}
