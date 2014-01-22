angular.module('fittr.controllers')

  .controller('fbAuthController', ['$scope', 'Facebook', function($scope, Facebook) {

    // Facebook Authentication 
    // code below was lifted from the angular-facebook example:
    // http://plnkr.co/edit/dDAmvdCibv46ULfgKCd3
    // ========================================================================
    $scope.user = {};
    $scope.loggedIn = false;

    // Here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
      return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newVal) {
      $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
    });

    // TODO: Investigate the failure path
    $scope.IntentLogin = function() {
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;    // TODO: this needs to be persisted app wide
          // TODO: determine where to store the user's acessToken somewhere
          console.log(response.authResponse.accessToken);
          $scope.me();
        } else {
          $scope.login();
        }
      });
    };

    // From now and on you can use the Facebook service just as Facebook api says
    // Take into account that you will need $scope.$apply when being inside Facebook functions scope and not angular
    $scope.login = function() {
      Facebook.login(function(response) {
        // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
        if (response.status == 'connected') {
          $scope.logged = true;
          $scope.me();
        } else {
          // TODO: investigate what to do here
        }
      }, {scope: 'email'});  // request permission to access the user's email
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.$apply(function() {
          // Here you could re-check for user status (just in case)
          $scope.user = response;
          console.log($scope.user);
        });
      });
    };

    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.logged = false;
        });
      });
    };
  }]);