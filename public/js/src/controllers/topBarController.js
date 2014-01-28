angular.module('fittr.controllers')

.controller('TopBarController', function($scope, UserService) {

  // Retrieve current user's activity for the past 7 days
  // and store in memory and localStorage
  UserService.getActivity(UserService.currentUser._id, 7)
    .then(function(data) {
      console.log("response from get activity: ", data);
      UserService.saveActivity(UserService.currentUser._id, data);
      $scope.currentUser = UserService.currentUser;
    }, function(data) {
      console.log("an error occured (get activity)");
    });

  $scope.currentUser = UserService.currentUser;
  if ($scope.currentUser.authData && $scope.currentUser.authData.fitbit) {
    $scope.avatar = $scope.currentUser.authData.fitbit.avatar;
  } else {
    $scope.avatar = 'http://ionicframework.com/img/docs/mcfly.jpg';
  }

});