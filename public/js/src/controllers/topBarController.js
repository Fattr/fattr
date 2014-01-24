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

  var unitBounds = {
    'Calories': 2500,
    'Steps': 20000,
    'Levels': 20,
    'Distance': 30,
    'Sleep': 10
  };

  $scope.$watch('activeSlide', function() {
    var currSlide = $scope.activeSlide;

    var multiplier;
      if (currSlide === undefined) {
        // calories
        multiplier = 2500;
      } else if (currSlide === 1) {
        // steps
        multiplier = 10000;
      } else if (currSlide === 2) {
        // levels
        multiplier = 20;
      } else if (currSlide === 3) {
        // distance
        multiplier = 30;
      } else if (currSlide === 4) {
        // sleep
        multiplier = 10;
      }

      var num = Math.floor( Math.random() * multiplier );
      num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
      $scope.diffNum = num;
  });

});