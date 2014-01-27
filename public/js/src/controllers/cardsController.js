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

  // Retrieve current user's activity for the past 7 days
  // and store in memory and localStorage
  UserService.currentUser = UserService.getFromLocal();

  UserService.getActivity(UserService.currentUser._id, 7)
    .then(function(data) {
      console.log("response from get activity: ", data);
      debugger;
      UserService.saveActivity(UserService.currentUser._id, data);
      $scope.currentUser = UserService.currenUser;
    }, function(data) {
      console.log("an error occured (get activity)");
    });
        


  $scope.currentUser = UserService.currentUser;
  $scope.users = users;

});
