angular.module('fittr.controllers')

.controller('ChartController', function($q, $scope, $timeout, UserService){

  var stepsDatum = null;
  var milesDatum = null;
  var activeDatum = null;

  $scope.$on('chartButtonClick', function() {
    getWeekly(($scope.user.user._id));
  });


  var alreadyCalled = false;

  var getWeekly = function(userId) {

    // console.log("backShown: ", backShown);
    // if (!backShown) { return; }
    if (alreadyCalled) { return; }

    UserService.getWeekly(userId)
      .then(function(data) {
        console.log("7 days worth: ", data);
        $timeout(function() {
          stepsDatum = buildChartData(data, 'steps');
          milesDatum = buildChartData(data, 'distance');
          activeDatum = buildChartData(data, 'veryActiveMinutes');

          $scope.statCategories = {
            'Steps':stepsDatum,
            'Miles':milesDatum,
            'Active':activeDatum
          };
          alreadyCalled = true;
        }, 1000);
      }, function(status) {
        console.log("An error occured during the call to get" + status);
      });

  };

  var buildChartData = function(data, stat) {
    var date;
    // format user data
    var currentUser = [];
    for (var i = 0; i < data[0].stat.length; i++) {
      date = new Date(data[0].stat[i].date).getTime();
      currentUser.push([date, data[0].stat[i][stat]]);
    }

    var userData = {
      'key': data[0].username,
      'values': currentUser
    };

    // format compared user data
    var comparedUser = [];
    for (var j = 0; j < data[1].length; j++) {
      date = new Date(data[1][j].date).getTime();
      comparedUser.push([date, data[1][j][stat]]);
    }
    var comparedData = {
      'key': data[1][0].user.username,
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
