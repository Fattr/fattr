angular.module('fittr.controllers')

.controller('TopBarController', function($scope, differential, categories) {

  /*
   * SLIDE (category)
   */
  $scope.categories = categories;
  var activeSlide = $scope.activeSlide;

  var slideMap = {

  };

  // diff for current category
  // and current active card
  $scope.differential = 0;

});