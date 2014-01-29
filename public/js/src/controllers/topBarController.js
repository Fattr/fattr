angular.module('fittr.controllers')

.controller('TopBarController', function($q, $scope, UserService) {

  /*
   * USER ACTIVITY RETRIEVAL
   */
  // var gettingActs = $q.defer();
  // UserService.getActivity(UserService.currentUser._id, 7)
  //   .then(function(data) {
  //     console.log("UserService.getActivity()", data);
  //     // resolve promise
  //     gettingActs.resolve(data);
  //     // save to local storage
  //     UserService.saveActivity(UserService.currentUser._id, data);
  //     $scope.currentUser = data[0]; 
  //   }, function(data) {
  //     console.log("an error occured (get activity)");
  //   });

  /*
   * USER AVATAR
   */

  UserService.get().then(function(userData){
    console.log("get: ", userData);
    UserService.saveActivity(userData.stats[0]._id, userData);
    $scope.me = UserService.currentUser;
  });

  if (UserService.currentUser.authData && UserService.currentUser.authData.fitbit) {
    $scope.avatar = UserService.currentUser.authData.fitbit.avatar;

  } else {
    $scope.avatar = 'http://ionicframework.com/img/docs/mcfly.jpg';
  }

  //$scope.me = UserService.currentUser;

});






