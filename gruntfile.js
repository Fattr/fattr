module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['js/src/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['index.html, templates/**/'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: ['css/**'],
        options: {
          livereload: true
        }
      },
      karma: {
        files: ['js/src/**/*.js', 'test/jasmine/**/*.js'],
        tasks: ['karma:unit:run']
      }
    },
    jshint: {
      all: ['gruntfile.js', '/js/src/*.js', 'test/jasmine/**/*.js']
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js', 'html', 'css'],
          watchedFolders: ['js', 'css', 'templates', './'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
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
    }
  });

  //Load NPM tasks 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-sass');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['jshint', 'concurrent']);

  //Test task.
  grunt.registerTask('test', ['env:test', 'karma:unit']);
};