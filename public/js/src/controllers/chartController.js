angular.module('fittr.controllers')

  .controller('ChartController', function($scope, UserService) {
    $scope.myStats = {
      entries: [
        {time: 10, count: 100},
        {time: 20, count: 20},
        {time: 30, count: 43}
      ]
    };
  });
