angular.module('fittr.controllers')

.controller('CardsController', function($q, $scope, differential, UserService){

  // var getUsers = $q.defer();

  // UserService.getAllUsers().
  // then(function(data) {
  //   getUsers.resolve(data);
  // });

  // var users = getUsers.promise;

  // THIS IS DUMMY DATA
  var users = [
    {
      username: 'Santa',
      pic: '',
      steps: 15000,
      distance: 4.3,
      calories: 1567
    }
  ];
  // DUMMY DATA END

      
  $scope.currentUser = UserService.currentUser;
  $scope.users = users;

});
