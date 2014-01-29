angular.module('fittr.controllers')

.controller('TopBarController', function($q, $scope, $timeout, UserService) {
  /*
   * USER AVATAR
   */

  // Kinda janky, but it works
  UserService.get()
    .then(function(userData){
      console.log("get: ", userData);
      if (userData === "null") {
        $timeout(function() {
          UserService.get()
            .then(function(userData2) {
              console.log("2nd request:", userData2);
              UserService.saveActivity(userData2.stats._id, userData2);
              $scope.me = UserService.currentUser;   
            }, function(status) {
              console.log(status);
            });
        }, 1000);
      } else {
        UserService.saveActivity(userData.stats._id, userData);
        $scope.me = UserService.currentUser; 
      }
  });

  if (UserService.currentUser.authData && UserService.currentUser.authData.fitbit) {
    $scope.avatar = UserService.currentUser.authData.fitbit.avatar;

  } else {
    $scope.avatar = 'http://ionicframework.com/img/docs/mcfly.jpg';
  }
});






