angular.module('fittr')

.directive('cardtop', ['$swipe', function($swipe, differential) {

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
}])

// directive watching the scroll event on the cardtop directive
// this directive will be applied to topbar
