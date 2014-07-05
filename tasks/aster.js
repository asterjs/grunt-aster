/*
 * grunt-aster
 * https://github.com/asterjs/grunt-aster
 *
 * Copyright (c) 2014 Ingvar Stepanyan
 * Licensed under the MIT license.
 */

'use strict';

var aster = require('aster');
var Rx = require('rx');
var resolvePath = require('path').resolve;

function moduleName(name) {
  return name.replace(/([a-z])([A-Z])/g, function (_, c1, c2) { return c1 + '-' + c2.toLowerCase() });
}

module.exports = function (grunt) {

  grunt.registerMultiTask('aster', 'Grunt plugin for using aster for code building.', function () {
    var done = this.async();

    var options = this.options();

    var tasks = Object.keys(options)
      .filter(function (name) { return !(name in aster) })
      .map(function (name) {
        return require('aster-' + moduleName(name))(options[name]);
      });

    Rx.Observable.fromArray(this.files)
    .flatMap(function (file) {
      var src = aster.src(file.src, {cwd: file.cwd, noglob: true});

      var src = tasks.reduce(function (src, task) {
        return src.map(task);
      }, src);

      var dest = resolvePath(file.cwd || '', file.dest);

      src = src.map(aster.dest(dest, options.dest));

      return src.concatAll().pluck('path').toArray().map(function (paths) {
        return {
          paths: paths,
          dest: dest
        };
      });
    })
    .subscribe(
      function (out) {
        grunt.log.ok('Created %s in %s.', out.paths.join(', '), out.dest);
      },
      grunt.fail.warn,
      done
    );
  });

};
