angular.module('fittr.controllers')

.controller('GroupsController', ['$scope', function($scope) {

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

}]);