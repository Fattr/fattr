angular.module('fittr.controllers')

.controller('CardsController', function($scope, UserService) {
  console.log("cards controller: ", UserService);
  $scope.users = UserService.users;

  $scope.back = function() {
    
  };
});