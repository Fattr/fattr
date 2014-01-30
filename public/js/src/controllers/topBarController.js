angular.module('fittr.controllers')

.controller('TopBarController', function($q, $scope, $timeout, UserService) {
  $scope.me = UserService.currentUser;
  $scope.me.pic = $scope.me.pic || '/img/defaultUserAvatar.jpg';
});
