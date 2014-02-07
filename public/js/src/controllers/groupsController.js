angular.module('fittr.controllers')

.controller('GroupsController', ['$scope', 'UserService', function($scope, UserService) {

  // $scope.toggleMenu = function() {
  //   $scope.sideMenuController.toggleLeft();
  // };

  $scope.user = {};

  $scope.user.groups = [
    'Hack Reactor', '2013-11'
  ];

}]);