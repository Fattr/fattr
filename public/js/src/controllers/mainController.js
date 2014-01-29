angular.module('fittr.controllers')

.controller('MainController', function($scope, UserService) {

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

  $scope.catBarVis = true;
  $scope.toggleSearch = function() {
    $scope.catBarVis = !$scope.catBarVis;
  };

  // Connects to the UserService logout method
  $scope.logout = function (){
    console.log("trying to logout");
    UserService.logout();
  };
  
});