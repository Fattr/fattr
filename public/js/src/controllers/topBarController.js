angular.module('fittr.controllers')

.controller('TopBarController', function($scope, differential) {
  // all diffs
  // var allDiffs = differential.stats();
  // find current user
  $scope.currUser = '';
  // find current cat
  $scope.currCat = '';

  // var update = function() {
  //   differential.steps() 
  // }

  // $scope.value = differential.['category']();

  $scope.categories = [
    'Calories',
    'Steps',
    'Levels',
    'Distance',
    'Sleep'
  ];

  $scope.diffNum = Math.floor( Math.random() * 10001 );

});