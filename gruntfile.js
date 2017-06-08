(function() {
  'use strict';
  module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt)

    grunt.initConfig({
      browserify: {
        dist: {
          options: {
            debug: true
          },
          files: {
            'build/helpbot.new.js': ['src/js/helpbot.js'],

          }
        }
      },
      copy: {
        public:{
          files:[
            {expand: true, cwd: "./build/", src: "**/*.js", dest: "./public/js"},
            {expand: true, cwd: "./src/css/", src: "**/*.*", dest: "./public/css"},
            {expand: true, cwd: "./src/", src: "index.html", dest: "./public"},
            {expand: true, cwd: "./lib/", src: "**/*.js", dest: "./public/js"}
          ]
        }
      },
      babel: {
        compile: {
          options: {
            presets: ['es2015'],
            compact: false
          },
          files: {
            'build/helpbot.js': ['build/helpbot.new.js']
          }
        }
      },
      sass: {
        options: {
          outputStyle: 'compressed'
        },
        dist: {
          files: {

          }
        }
      },
      watch: {
        scripts: {
          files: ['src/js/**/*.js'],
          tasks: ["unsafe_build"],
          options: {
            spawn: false,
            interrupt: true,
            debounceDelay: 250,
          },
        },
      },

      jshint: {
        all: ['Gruntfile.js', 'src/js/**/*.js'],
        options: {
          esversion: 6,
          asi: true,
          boss: false,
          maxparams: 4,
          maxdepth: 2,
          maxstatements: 13,
          maxcomplexity: 5
        }
      },
      eslint: {
        options: {
          parserOptions: {
            ecmaVersion: 6
          },
          "rules": {
            "indent": ["error", 2],
            "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }],
            "no-undef": "error",
            "no-unreachable": "error",
            complexity: 0,
            'dot-notation': 2,
            'dot-location': [ 2, 'property' ],
            eqeqeq: 2,
            //'no-alert': 2,
            'no-implicit-coercion': 0,
            'no-implied-eval': 2,
            'no-invalid-this': 2,
            'no-labels': 2,
            'no-loop-func': 2,
            'no-new-func': 2,
            'no-new-wrappers': 2,
            'no-new': 2,
            'no-octal-escape': 2,
            'no-octal': 2,
            'no-param-reassign': 0,
            'no-process-env': 1,
            'no-unused-expressions': 2,
            'no-useless-concat': 2,
            'no-void': 2,
            'no-with': 2,
            'wrap-iife': [ 2, 'inside' ],
            yoda: [ 2, 'never', { exceptRange: true } ]
          }
        },
        target: ['Gruntfile.js', 'src/js/**/*.js']
      },
      clean: {
        new: ['./build/**/*.new.js']
      },

      uglify: {
        my_target: {
          files: {
            'build/helpbot.min.js': ['build/helpbot.js'],
          }
        }

      },
      exec: {
        'electron-mocha': 'npm test'
      },
      complexity: {
        generic: {
          src: ['build/**/*.js'],
          options: {
            breakOnErrors: false,
            jsLintXML: 'complexity_report.xml', // create XML JSLint-like report
            errorsOnly: false,               // show only maintainability errors
            cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
            halstead: [8, 13, 20],           // or optionally a single value, like 8
            maintainability: 100,
            hideComplexFunctions: false,     // only display maintainability
            broadcast: false                 // broadcast data over event-bus
          }
        }
      },
    });

    grunt.loadTasks('tasks')
    grunt.registerTask("default", ["watch"])
    //grunt.registerTask("test", ["exec:electron-mocha"])
    grunt.registerTask("unsafe_build", ["browserify", "babel", "clean", "uglify" ])
    grunt.registerTask("build", [ "unsafe_build", "copy:public"])
    //grunt.registerTask("build_test", ["build", "test"])
  };
})();
