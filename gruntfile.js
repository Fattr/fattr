
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  var clientSideJavascriptFiles = "public/js/src/**/*.js";

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    express: {
      dev: {
        options: {
          cmd: 'coffee',
          script: '/app.coffee'
        }
      }
    },

    coffeelint: {
      app: 'app/**/*.coffee'
    },

    coffee: {
      options: {
        sourceMap: true
      },

      compile: {
        files: [{
          expand: true,
          cwd: 'app/coffee',
          src: '**/*.coffee',
          dest: 'app/js',
          ext: '.js'
        }]
      }
    },

    stylus: {
      compile: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'public/css',
          src: [ '**/*.styl' ],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },

    watch: {
      coffee: {
        files: ['app/**/*.coffee'],
        tasks: ['coffeelint','coffee']
      },
      js: {
        files: [clientSideJavascriptFiles],
        tasks: ['jshint'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['index.html, public/templates/**/'],
        options: {
          livereload: true,
        },
      },
      stylus: {
        files: ['public/css/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      },
      karma: {
        files: [clientSideJavascriptFiles, 'test/jasmine/**/*.js'],
        tasks: ['karma:unit:run']
      }
    },

    jshint: {
      all: ['gruntfile.js', clientSideJavascriptFiles]
    },

    mochaTest: {
      test: {
        options: {
          require: 'coffee-script',
          reporter: 'spec'
        },
        src: ['app/coffee/test/*.coffee']
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      }
    },

    // Karma will run our Jasmine tests for us
    karma: {
      unit: {
        configFile: 'public/test/karma/karma.conf.js'
      }
    },

    shell: {
      server: {
        options: {
          stdout: true
        },
        command: 'nodemon app/coffee/app.coffee'
      }
    },

  });

  // Server side plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mocha-test');

  // client side plugins
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Server side tasks
  grunt.registerTask('build', ['coffeelint', 'coffee']);
  grunt.registerTask('style', ['stylus']);
  grunt.registerTask('serve', ['build','shell:server']);
  grunt.registerTask('test', ['mochaTest:test']);
  grunt.registerTask('travis', ['build', 'test']);

  // client side tasks
  // grunt.registerTask('testClient', ['env:test', 'karma:unit']);
  grunt.registerTask('stylus', ['stylus']);

  // deafult tasks lints and compiles coffe
  // use grunt command no options
  grunt.registerTask('default', ['jshint','test', 'watch']);

};