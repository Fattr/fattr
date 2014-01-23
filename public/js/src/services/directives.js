angular.module('fittr')

.directive('cardtop', function($window) {
  // var topHeight = 180;
  return function(scope, element, attrs) {
    var fn = function() {
      console.log(element, element[0].getBoundingClientRect());
    };
  };
});

// directive watching the scroll event on the cardtop directive
// this directive will be applied to topbar
