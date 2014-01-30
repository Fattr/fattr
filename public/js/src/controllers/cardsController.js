angular.module('fittr.controllers')

.controller('CardsController', function($q, $scope, UserService){


  $scope.Math = window.Math; // so that we can use Math operations in angular expressions

  // var getUsers = $q.defer();
  UserService.getAll(1)
    .then(function(data) {
      // console.log("getAll: ", data);

      $scope.users = data;
      UserService.users = data;
      $scope.currentUser = UserService.currentUser;
      // getUsers.resolve(data);

      $scope.calculateYourWidth = function (user, activity){

        if ($scope.currentUser.stats[activity] - user[activity] >= 0)
          return {width: "100%"};
        else {
          return {width: String(~~(100*($scope.currentUser.stats[activity]/user[activity]))) + "%"};
        }
      };

      $scope.calculateFriendWidth = function (user, activity){

        if (user[activity] - $scope.currentUser.stats[activity] >= 0)
          return {width: "100%"};
        else {
          return {width: String(~~(100*(user[activity]/$scope.currentUser.stats[activity]))) + "%"};
        }
      };

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
  var datum;
  $scope.getWeekly = function(userId) {

    UserService.getWeekly(userId)
      .then(function(data) {
        console.log("7 days worth: ", data);
        datum = buildChartData();

      }, function(status) {
        console.log("An error occured during the call to get" + status);
      });

  };

  var buildChartData = function(data) {
    // format user data
    var currentUser;
    for (var i = 0; i < data[0].stat.length; i++) {
      currentUser.push([data[0].stat[i]].date, [data[0].stat[i]].steps);
    }
    var userData = {
      'key': data[0].username,
      'values': currentUser
    };

    // format compared user data
    var comparedUser;
    for (var i = 0; i < data[1].length; i++) {
      comparedUser.push([data[1][i].date, data[1][i].steps]);
    }
    var comparedData = {
      'key': data[1].user.username,
      'values': comparedUser
    };

    var chartOutputData = [userData, comparedData];
    console.log(chartOutputData);
    return chartOutputData;
  };



  // var buildSampleData = function() {
  //   var data = [];
  //   var values = [];
  //   var today = new Date();
  //   var day = 86400000;
  //   var rand = function() {
  //   return Math.floor(Math.random() * 10000);
  //   };
  //   var buildForOneUser = function(user) {
  //   for (var i = 0; i < 7; i++) {
  //     var dayStats = [];
  //     dayStats[0] = today.getTime() - (i * day);
  //     dayStats[1] = rand();
  //     values.push(dayStats);
  //   }
  //   data.push({key: user, values: values});
  //   values = [];
  //   };

  //   buildForOneUser("Lebron James");
  //   buildForOneUser("me");
  //   return data;
  // };

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


  $scope.statCategories = {
    'Steps':datum,
    'Miles':datum,
    'Active':datum
  };

});



// [
// {
//   username: "zooose",
//   stat:
//   [
//   {
//     distance: 4.22,
//     veryActiveMinutes: 9,
//     steps: 5884,
//     date: "2014-01-26",
//     user: "52e97cef52dee34b1d8a3353",
//     _id: "52e97d0352dee34b1d8a3354",
//     __v: 0
//   },
//   {
//     distance: 5.64,
//     veryActiveMinutes: 22,
//     steps: 7868,
//     date: "2014-01-27",
//     user: "52e97cef52dee34b1d8a3353",
//     _id: "52e97d0352dee34b1d8a3355",
//     __v: 0
//   },
//   {
//     distance: 4.58,
//     veryActiveMinutes: 20,
//     steps: 6390,
//     date: "2014-01-28",
//     user: "52e97cef52dee34b1d8a3353",
//     _id: "52e97d0352dee34b1d8a3356",
//     __v: 0
//   }
//   ]
// },
// [
// {
//   distance: 4.58,
//   veryActiveMinutes: 20,
//   steps: 6390,
//   date: "2014-01-28",
//   user:
//   {
//     _id: "52e97b7fb59349651b452fa1",
//     username: "sdfnlewhtle"
//   },
//   _id: "52e97b84b59349651b452fa2",
//   __v: 0
// },
// {
//   distance: 5.64,
//   veryActiveMinutes: 22,
//   steps: 7868,
//   date: "2014-01-27",
//   user:
//   {
//     _id: "52e97b7fb59349651b452fa1",
//     username: "sdfnlewhtle"
//   },
//   _id: "52e97b84b59349651b452fa3",
//   __v: 0
// },
// {
//   distance: 4.22,
//   veryActiveMinutes: 9,
//   steps: 5884,
//   date: "2014-01-26",
//   user:
//   {
//     _id: "52e97b7fb59349651b452fa1",
//     username: "sdfnlewhtle"
//   },
//   _id: "52e97b84b59349651b452fa4",
//   __v: 0
// }
// ]
// ]
