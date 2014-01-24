
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
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

    watch: {
      coffee: {
        files: ['app/**/*.coffee'],
        tasks: ['coffeelint','coffee']
      },
      js: {
        files: ['public/js/src/**/*.js'],
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
      css: {
        files: ['public/css/**'],
        options: {
          livereload: true
        }
      },
      karma: {
        files: ['public/js/src/**/*.js', 'test/jasmine/**/*.js'],
        tasks: ['karma:unit:run']
      }
    },

    jshint: {
      all: ['gruntfile.js', '/public/js/src/*.js']
    },

    mochaTest: {
      test: {
        options: {
          require: 'coffee-script',
          reporter: 'spec'
        },
        src: ['app/coffee/test/route_spec.coffee']
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
        configFile: 'test/karma/karma.conf.js'
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
  grunt.loadNpmTasks('grunt-contrib-sass');

  // deafult tasks lints and compiles coffe
  // use grunt command no options

  grunt.registerTask('build', ['coffeelint', 'coffee']);
  grunt.registerTask('serve', ['build','shell:server']);
  grunt.registerTask('default', ['jshint','test', 'watch']);
  grunt.registerTask('test', 'mochaTest:test');
  grunt.registerTask('travis', ['build', 'test']);

  // client side tasks
  grunt.registerTask('karma', ['env:test', 'karma:unit']);
  grunt.registerTask('sass', ['sass']);


  // client side
  // ==========================================================================


  //   nodemon: {
  //     dev: {
  //       options: {
  //         file: 'server.js',
  //         args: [],
  //         ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
  //         watchedExtensions: ['js', 'html', 'css'],
  //         watchedFolders: ['js', 'css', 'templates', './'],
  //         debug: true,
  //         delayTime: 1,
  //         env: {
  //           PORT: 3000
  //         },
  //         cwd: __dirname
  //       }
  //     }
  //   },
  //   concurrent: {
  //     tasks: ['nodemon', 'watch'],
  //     options: {
  //       logConcurrentOutput: true
  //     }
  //   },
  //   env: {
  //     test: {
  //       NODE_ENV: 'test'
  //     }
  //   },
  //   // Karma will run our Jasmine tests for us
  //   karma: {
  //     unit: {
  //       configFile: 'test/karma/karma.conf.js'
  //     }
  //   }
  // });

  // //Load NPM tasks
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-karma');
  // grunt.loadNpmTasks('grunt-nodemon');
  // grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpmTasks('grunt-env');
  // grunt.loadNpmTasks('grunt-contrib-sass');

  // //Making grunt default to force in order not to break the project.
  // grunt.option('force', true);

  // //Default task(s).
  // grunt.registerTask('default', ['jshint', 'concurrent']);

  // //Test task.
  // grunt.registerTask('test', ['env:test', 'karma:unit'])

};