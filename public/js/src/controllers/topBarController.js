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

  $scope.$watch(
    function(scope) {
      console.log(scope.activeSlide);
    }
  );

  $scope.categories = [
    'Calories',
    'Steps',
    'Levels',
    'Distance',
    'Sleep'
  ];

  var unitBounds = {
    'Calories': 5000,
    'Steps': 20000,
    'Levels': 20,
    'Distance': 30,
    'Sleep': 10
  };

  var function

  var num = Math.floor( Math.random() * 10001 );
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  $scope.diffNum = num;

});