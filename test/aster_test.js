'use strict';

var grunt = require('grunt');
var Rx = require('rx');
var aster = require('aster');

function createTest(name) {
  return function (test) {
    test.expect(1);

    Rx.Observable.fromArray(['tmp', 'test/expected'])
    .flatMap(function (root) {
      return aster.src('*', {cwd: root + '/' + name, parse: false})
        .concatAll()
        .reduce(function (obj, file) {
          obj[file.path] = file.contents;
          return obj;
        }, {});
    })
    .toArray()
    .subscribe(function (hashes) {
      test.deepEqual(hashes[0], hashes[1]);
      test.done();
    });
  };
}

exports.aster = ['default_options', 'custom_options'].reduce(function (tests, name) {
  tests[name] = createTest(name);
}, {});
