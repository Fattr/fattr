angular.module('fittr.controllers')

.controller('CardsController', function($scope, UserService) {
  console.log("cards controller: ", UserService);

  UserService.getAllUsers()
    .then(function(data) {
      // reverse order of activities
      console.log(data);
      UserService.users = data;
      console.log("grab all users: ", UserService.users);
      $scope.users = UserService.users;
    })

  $scope.back = function() {
    
  };
});