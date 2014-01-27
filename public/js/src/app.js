// Ionic fittr App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'fittr' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'fittr.services' is found in services.js
// 'fittr.controllers' is found in controllers.js
angular.module('fittr', ['ionic', 'ngRoute', 'LocalStorageModule', 'nvd3ChartDirectives', 'fittr.services', 'fittr.controllers'])
.config(function(UserServiceProvider) {
  // UserServiceProvider.setApiKey('myKey');
})

// Allows us to segregate app data by using a 'Fittr' prefix
.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('Fittr');
})

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.config(function($stateProvider, $urlRouterProvider, $routeProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

    // ENTRY
  var checkEntry = function($q, $state, $http, $rootScope) {
    // check localStorage to see if user is already logged in
    // if not continue on.

    var user = null;

    var deferred = $q.defer();
    $http.get('/loggedin').success(function(user) {
      if(user !== '0') {
        deferred.resolve();
        $state.go('main.stream');
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  };


  var checkAuth = function($q, $state, $http, $rootScope) {
    // check localStorage to see if user is already logged in
    // if not continue on.

    var user = null;
    $rootScope.isAuth = function() {
      return user; // might come in handy to show and hide links based on if the user is auth
      // example is show sign in/ log in if no user is auth and hide logout
      // vice versa if user is logged in. Just do a ng-if='$rootScope.isAuth()'
      // if it doesn't work, then the User variable might need to be a $root variable
    };

    var deferred = $q.defer();
    // Promise for ajax call to check if user is logged in the sever
    // use on any state / template to prevent access

    $http.get('/loggedin').success(function(user) {
      if(user !== '0') { // if no user is logged in, the server will send back '0'
        // $rootScope.User = user; could come in handy but you don't wanna set $rootScope stuff
        deferred.resolve(); // if it's not '0' then the user is auth with thes server, we may resolve
      } else {
        // $rootScope.error_message = 'You must be logged in'; again, may come in handy here
        deferred.reject(); // user is not auth with server, so redirect that clown

        $state.go('login'); //where ever the sign up page will be, right now it's '/' but that will
        //be a splash soon and the signup/sign in will prob be someting like '#/signup' duh :)
      }
    });
    return deferred.promise;
  };


  /*
   * Fittr
   */
  $stateProvider

    .state('entry', {
      url: '/',
      templateUrl: 'templates/entry.html',
      resolve: {
        loggedin: checkEntry
      }
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

    // User will connect their devices/services here
    .state('connect-devices', {
      url: '/connect-devices',
      templateUrl: 'templates/connect-devices.html',
      controller: 'ConnectDevicesController',
      resolve: {
        loggedin: checkAuth
      }
    })

    // MAIN
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'templates/main.html',
      resolve: {
        loggedin: checkAuth // place this an any route you need
          //to protect and no unauth user will get to it
      }
    })
    .state('main.stream', {
      url: '/stream',
      // nested views for /main/stream
      views: {
      //   'searchBar@': {
      //     templateUrl: 'templates/searchBar.html',
          // controller: 'searchBarController'
      // },
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
      controller: 'ChartController',
      resolve: {
        loggedin: checkAuth
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

})
// to load the currentUser object from local storage
.run(function(UserService) {
  UserService.loadCurrentUser();
});

/*
 * SETTING SERVICES
 */
angular.module('fittr.services', []);

