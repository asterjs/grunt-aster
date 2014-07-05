/*
 * grunt-aster
 * https://github.com/asterjs/grunt-aster
 *
 * Copyright (c) 2014 Ingvar Stepanyan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    aster: {
      default_options: {
        files: [
          {cwd: 'test/fixtures', src: '*.js', dest: '../../tmp/default_options'}
        ]
      },
      custom_options: {
        options: {
          // .map(asterConcat('built.js'))
          concat: 'lib.js',
          // .map(aster.dest('tmp/custom_options', {sourceMap: true}))
          dest: {
            sourceMap: true
          }
        },
        files: [
          {cwd: 'test/fixtures', src: '*.js', dest: '../../tmp/custom_options'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'aster', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
