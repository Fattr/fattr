angular.module('fittr.controllers')

.controller('CardsController', function($q, $scope, $timeout, UserService){

  $scope.Math = window.Math; // so that we can use Math operations in angular expressions
  $scope.yesterday = Date.now()-1000*60*60*24; // this moment - the number of ms in a day;

  // GET your stats from yesterday
  UserService.get().then(function(userData){

    // and save your activity to the UserService.currentUser
    UserService.saveActivity(userData.stats._id, userData);

    // After your data is saved into UserService.currentUser
    // we can get all the other users' activity stats from yesterday
    UserService.getAll(0).then(function(data) {

      $scope.users = data;
      UserService.users = data;
      $scope.currentUser = UserService.currentUser;

      // define function that calculates width percentage for your bar chart
      $scope.calculateYourWidth = function (user, activity){
        // if you have more steps than the user on the card
        if ($scope.currentUser.stats[activity] - user[activity] >= 0){
          // your bar will be width 100%
          return {width: "100%"};
        } else {
          // your bar will be a normalized percentage of their bar chart width
          return {width: String(~~(100*($scope.currentUser.stats[activity]/user[activity]))) + "%"};
        }
      };

      // define function calculates width percentage for opponent's bar chart
      // it's the reverse from the function above...
      $scope.calculateFriendWidth = function (user, activity){
        if (user[activity] - $scope.currentUser.stats[activity] >= 0)
          return {width: "100%"};
        else {
          return {width: String(~~(100*(user[activity]/$scope.currentUser.stats[activity]))) + "%"};
        }
      };
    });
  });

  // broadcast to the child chartControllers that the chart button in the card's
  // header has been clicked
  $scope.onclick = function() {
    this.$broadcast('chartButtonClick');
  };
});

