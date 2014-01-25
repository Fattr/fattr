// Ionic fittr App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'fittr' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'fittr.services' is found in services.js
// 'fittr.controllers' is found in controllers.js
angular.module('fittr', ['ionic', 'ngRoute', 'LocalStorageModule', 'dangle', 'fittr.services', 'fittr.controllers'])
.config(function(UserServiceProvider) {
  // UserServiceProvider.setApiKey('myKey');
})

// Allows us to segregate app data by using a 'Fittr' prefix
.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('Fittr');
})

.config(function($stateProvider, $urlRouterProvider, $routeProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  /*
   * Fittr
   */
  $stateProvider
    // ENTRY 
    .state('entry', {
      url: '/',
      templateUrl: 'templates/entry.html',
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup-login.html',
      controller: 'SignupController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/signup-login.html',
      controller: 'LoginController'
    })

    // MAIN
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'templates/main.html'
    })
    .state('main.stream', {
      url: '/stream',
      // nested views for /main/stream
      views: {
        'searchBar@': {
          templateUrl: 'templates/searchBar.html'
          // controller: 'CatBarController'
        },
        'topBar@': {
          templateUrl: 'templates/topBar.html',
          controller: 'TopBarController'
        },
        'cards@': {
          templateUrl: 'templates/cards.html',
          controller: 'CardsController'
        }
      }
    })

    // CHARTS
    .state('charts', {
      url: '/charts',
      templateUrl: 'templates/testChart.html',
      controller: 'ChartController'
    })

    // User will connect their devices/services here
    .state('connect-devices', {
      url: '/connect-devices',
      templateUrl: 'templates/connect-devices.html',
      controller: 'ConnectDevicesController'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});

/*
 * SETTING SERVICES
 */
angular.module('fittr.services', []);

