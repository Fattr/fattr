angular.module('fittr.services')

.factory('differential', function() {
  // pull public feed of all users 
  // return json blob of all differentials
  var me = {
    steps: 12000,
    sleep: 8.2,
    levels: 12
  };

  var opp = {
    steps: 8723,
    sleep: 10.5,
    levels: 7
  };

  return {
    steps: function() {
      return me.steps - opp.steps;
    },

    sleep: function() {
      return me.sleep - friend.sleep;
    },

    levels: function() {
      return me.levels - friend.levels;
    }
  };

});
