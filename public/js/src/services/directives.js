angular.module('fittr')

.directive('cardtop', ['$swipe', function($swipe, differential) {
  // return function(scope, element, attrs) {
  //   var fn = function() {
  //     console.log('differential', differential);
  //     console.log(element[0].getBoundingClientRect().top);
  //   };
  // };

  return {
    restrict: 'EA',
    link: function(scope, ele, attrs, ctrl) {
      var startX, pointX;

      $swipe.bind(ele, {
        'start': function(coords) {
          startX = coords.x;
          pointX = coords.y;
          console.log('startX', startX);
          console.log('pointX', pointX);
        },
        'move': function(coords) {
          var delta = coords.x - pointX;
          console.log('move - delta', delta);
        },
        'end': function(coords) {
          console.log('end - coords', coords);
        },
        'cancel': function(coords) {
          console.log('cancel - coords', coords);
        }
      });
    }
  };
    // link: function(scope, element, attrs) {
    //   var threshold = $window.innerHeight * 0.3;
    //   scope.top = element[0].getBoundingClientRect().top;
    //   console.log('offsetTop', attrs.$$element[0].offsetTop);

    //   scope.$watch(attrs.$$element[0].offsetTop, function(newVal, oldVal) {
    //     if (newVal < threshold) {
    //       differential.currentCardUser = scope.user.username;
    //       console.log(differential.currentCardUser);
    //     }
    //   }, true);

      // setInterval(function() {
      //   console.log(differential.currentCardUser);
      // }, 2500);
    // }
  // };
}]);

// directive watching the scroll event on the cardtop directive
// this directive will be applied to topbar
