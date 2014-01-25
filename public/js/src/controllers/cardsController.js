angular.module('fittr.controllers')

.controller('CardsController', function($scope, differential, UserService){

  UserService.getAllUsers()
    .then(function(data) {
      // reverse order of activities
      UserService.users = data;
      $scope.users = UserService.users;
    });

});
