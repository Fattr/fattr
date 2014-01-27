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
      pic: 'https://pbs.twimg.com/profile_images/378800000080452472/98b3949c0ac9afbe5dfc32420c6f1d5f.jpeg',
      steps: 15345,
      distance: 4.3,
      calories: 1567
    },
    {
      username: 'Rudolph',
      pic: 'http://31.media.tumblr.com/avatar_bd38855a9b02_96.png',
      steps: 9134,
      distance: 12.5,
      calories: 2134
    }
  ];
  // DUMMY DATA END

  // // Retrieve current user's activity for the past 7 days
  // // and store in memory and localStorage
  // UserService.currentUser = UserService.getFromLocal();

  // UserService.getActivity(UserService.currentUser._id, 7)
  //   .then(function(data) {
  //     console.log("response from get activity: ", data);
  //     // debugger;
  //     UserService.saveActivity(UserService.currentUser._id, data);
  //     $scope.currentUser = UserService.currentUser;
  //   }, function(data) {
  //     console.log("an error occured (get activity)");
  //   });

  $scope.currentUser = UserService.currentUser;
  $scope.users = users;

});
