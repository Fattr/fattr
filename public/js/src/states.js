angular.module('fittr')

  .config(function($stateProvider, $urlRouterProvider, $routeProvider) {
      // ENTRY
    var checkConnectedDev = function($q, $state, $http, $rootScope) {
      // check localStorage to see if user is already logged in
      // if not continue on.
      var deferred = $q.defer();
      $http.get('/loggedin').success(function(user) {
        if(user !== '0' && user.authData) {
          deferred.resolve();
        } else if (user !== '0' && !user.authData){
          deferred.resolve();
          $state.go('connect-devices');
        }else {
          deferred.reject(); // user is not auth with server, so redirect
          $state.go('login');
        }
      });
      return deferred.promise;
    };

    var checkLoggedIn = function($q, $state, $http, $rootScope) {
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

    $stateProvider

      // ENTRY
      .state('entry', {
        url: '/',
        templateUrl: 'templates/entry.html',
        controller: 'EntryController'
      }).

      state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup-login.html',
        controller: 'SignupController'
      }).

      state('login', {
        url: '/login',
        templateUrl: 'templates/signup-login.html',
        controller: 'LoginController'
      }).

      // PASSWORD RESET
      state('reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      }).

      state('reset.emailReq', {
        url: '/request',
        templateUrl: 'templates/pw-reset.html',
        controller: 'ResetController'
      }).

      state('reset.passwordEntry', {
        url: '/new/:token',
        templateUrl: 'templates/pw-reset.html',
        controller: 'ResetController'
      }).

      // CONNECT FITNESS DEVICES
      state('connect-devices', {
        url: '/connect-devices',
        templateUrl: 'templates/connect-devices.html',
        controller: 'ConnectDevicesController',
        resolve: {
          loggedin: checkLoggedIn
        }
      }).

      // MAIN
      state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'templates/main-contain.html',
        // place this an any route you need to 
        // protect and no unauth user will get to it
        resolve: {
          loggedin: checkConnectedDev 
        }
      }).

      state('main.stream', {
        url: '/stream',
        // nested views for /main/stream
        views: {
          'main@': {
            templateUrl: 'templates/main.html'
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
      }).

      // GROUPS
      state('groups', {
        url: '/groups',
        views: {
          'main@': { // load groups.html into the main nav-view
            templateUrl: 'templates/groups.html',
            controller: 'GroupsController'
          }
        },
        resolve: {
          loggedin: checkLoggedIn
        }
      }).

      state('groups.find', {
        url: '/find',
        views: {
          'main@': {
            templateUrl: 'templates/groups.html',
            controller: 'GroupsController'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  })

  // to load the currentUser object from local storage
  .run(function(UserService) {
    UserService.loadCurrentUser();
  });
