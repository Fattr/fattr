angular.module('fittr.controllers')

.controller('MainController', function($scope) {

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

  $scope.catBarVis = true;
  $scope.toggleSearch = function() {
    $scope.catBarVis = !$scope.catBarVis;
  };
  
});