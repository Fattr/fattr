angular.module('fittr.controllers')

  .controller('ChartController', function($scope) {
    
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
        console.log(d);
        return d3.time.format('%m/%e')(new Date(d)); 
      }
    };

    var colorArray = ['#27ae60', '#c0392b'];

    $scope.colorFunction = function() {
      return function(d, i) {
        return colorArray[i];
      };
    };

    $scope.stepsData = buildSampleData();
  });
