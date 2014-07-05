# grunt-aster

> Grunt plugin for using [aster](https://github.com/asterjs/aster) for code building.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-aster --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-aster');
```

## The "aster" task

### Overview
In your project's Gruntfile, add a section named `aster` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  aster: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

Options object should contain ordered task hash where keys are normalized names of aster modules (`"aster-rename-ids" => renameIds`) and values are their options (first argument).

### Usage Example

In this example, original files are parsed, concatenated as ASTs and written to destination directory with source map.

```js
grunt.initConfig({
  aster: {
    options: {
      // aster.src(...)

      // .map(asterConcat('built.js'))
      concat: 'lib.js',

      // .map(aster.dest('tmp/custom_options', {sourceMap: true}))
      dest: {
        sourceMap: true
      }
    },
    files: [
      {cwd: 'lib', src: '*.js', dest: 'dist'}
    ]
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Ingvar Stepanyan. Licensed under the MIT license.
