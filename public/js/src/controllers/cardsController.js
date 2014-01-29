angular.module('fittr.controllers')

.controller('CardsController', function($q, $scope, UserService){

  // var getUsers = $q.defer();

  UserService.getAll(1)
    .then(function(data) {
      // console.log("getAll: ", data);

      $scope.users = data;
      $scope.currentUser = UserService.currentUser;
      // getUsers.resolve(data);
  });



 // Response object for UserService.getAll
 // -----------------------------------------------------
// [Object, Object]
// 0: Object
  // __v: 0
  // _id: "52e8a7db1a77290dde1ad3f0"
  // date: "2014-01-27"
  // distance: 4.21
  // steps: 5735
  // veryActiveMinutes: 29
  // user: Object
    // _id: "52e8a7c91a77290dde1ad3ef"
    // username: "stateoflux"
    // authData: Object
      // fitbit: Object
        // avatar: "https://d6y8zfzc2qfsl.cloudfront.net/4F55F4BF-8DE2-4662-9BA5-A88E9F87E45B_profile_100_square.jpg"

  $scope.percentage = {steps: 82, distance: 35, calories: 95};

  $scope.getHistoricalData = function(username) {
    UserService.getWeeklyData(username)
      .then(function(data) {
        console.log("7 days worth: ", data);
      }, function(status) {
        console.log("An error occured during the call to get" + status);
      });
  };



  // CHART SAMPLE DATA BELOW
  var buildSampleData = function() {
    var data = [];
    var values = [];
    var today = new Date();
    var day = 86400000;
    var rand = function() {
    return Math.floor(Math.random() * 10000);
    };
    var buildForOneUser = function(user) {
    for (var i = 0; i < 7; i++) {
      var dayStats = [];
      dayStats[0] = today.getTime() - (i * day);
      dayStats[1] = rand();
      values.push(dayStats);
    }
    data.push({key: user, values: values});
    values = [];
    };

    buildForOneUser("Lebron James");
    buildForOneUser("me");
    return data;
  };

  $scope.xAxisTickFormat = function() {
    return function(d) {
      return d3.time.format('%m/%e')(new Date(d));
    };
  };

  var colorArray = ['#27ae60', '#c0392b'];

  $scope.colorFunction = function() {
    return function(d, i) {
      return colorArray[i];
    };
  };

  var datum = buildSampleData();

  $scope.statCategories = {
    'Steps':datum,
    'Miles':datum,
    'Active':datum
  };

});