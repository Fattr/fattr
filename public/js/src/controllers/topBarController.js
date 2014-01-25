angular.module('fittr.controllers')

.controller('TopBarController', function($scope, UserService) {

  $scope.currentUser = UserService.currentUser;
  if ($scope.currentUser.authData && $scope.currentUser.authData.fitbit) {
    $scope.avatar = $scope.currentUser.authData.fitbit.avatar;
  } else {
    $scope.avatar = 'http://ionicframework.com/img/docs/mcfly.jpg';
  }

  // DUMMY DATA - REPLACE WITH REAL DATA
  $scope.steps = 8000;
  $scope.distance = 5.7;
  $scope.calories = 2734;

});