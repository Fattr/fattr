// Karma configuration
// Generated on Sat Oct 05 2013 22:00:14 GMT+0700 (ICT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../../',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // 'bower_components/ionic/dist/js/angular/angular.js',
      // 'bower_components/angular-mocks/angular-mocks.js',
      // 'bower_components/ionic/dist/js/angular-*/*.js',
      // 'bower_components/ionic/dist/js/ionic.js',
      // 'bower_components/ionic/dist/js/ionic-angular.js',
      // 'bower_components/angular-local-storage/angular-local-storage.js',
      // 'js/src/app.js',
      // 'js/src/services/services.js',
      // 'js/src/services/userService.js',
      // 'js/src/services/deviceService.js',
      // 'js/src/controllers/controllers.js',
      // 'js/src/controllers/cardsController.js',
      // 'js/src/controllers/loginController.js',
      // 'js/src/controllers/mainController.js',
      // 'js/src/controllers/signupController.js',
      // 'js/src/controllers/connectDevicesController.js',
      // 'test/jasmine/**/*.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],
    // reporters: ['progress', 'coverage'],

    // coverage
    // preprocessors: {
    //   // source files, that you wanna generate coverage for
    //   // do not include tests or libraries
    //   // (these files will be instrumented by Istanbul)
    //   'js/controllers/*.js': ['coverage'],
    //   'js/services/*.js': ['coverage']
    // },

    // coverageReporter: {
    //     type: 'html',
    //     dir: 'test/coverage/'
    // },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],

    // Plugins
    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};