angular.module('fittr.controllers')

.controller('TopBarController', function($q, $scope, UserService) {
  /*
   * USER AVATAR
   */

  UserService.get().then(function(userData){
    // console.log("get: ", userData);
    UserService.saveActivity(userData.stats._id, userData);
    $scope.me = UserService.currentUser;
  });

  if (UserService.currentUser.authData && UserService.currentUser.authData.fitbit) {
    $scope.avatar = UserService.currentUser.authData.fitbit.avatar;

  } else {
    $scope.avatar = 'http://ionicframework.com/img/docs/mcfly.jpg';
  }
});






