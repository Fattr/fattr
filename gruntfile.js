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
      app: 'src/**/*.coffee'
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
      files: ['app/**/*.coffee'],
      tasks: ['coffeelint','coffee']
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

    shell: {
      server: {
        options: {
          stdout: true
        },
        command: 'nodemon app/coffee/app.coffee'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mocha-test');

  // deafult tasks lints and compiles coffe
  // use grunt command no options

  grunt.registerTask('build', ['coffeelint', 'coffee']);
  grunt.registerTask('serve', ['build','shell:server']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', 'mochaTest:test');
  grunt.registerTask('travis', ['build', 'test']);

};