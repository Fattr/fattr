angular.module('fittr.controllers')

.controller('CardsController', function($q, $scope, differential, UserService){

  var getUsers = $q.defer();

  UserService.getAllUsers().
  then(function(data) {
    getUsers.resolve(data);
  });

  var users = getUsers.promise;

  $scope.users = users;

});
