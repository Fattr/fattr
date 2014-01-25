angular.module('fittr.services')

.factory('differential', function($http, $q, UserService) {


  // pull public feed of all users 
  // return json blob of all differentials
  var findMySteps = $q.defer();

  $http({
    method: 'GET',
    url: ''
  })
  .success(function(data, status, headers, config) {
    findMySteps.resolve(data);
  })
  .error(function(data, status, headers, config) {
    findMysteps.reject(status);
  });

  return {
    currentUser: UserService.currentUser,
    currentCardUser: 'dunno yet',

    calories: function() {
      return me.calories - friend.calories;
    },

    steps: function() {
      return findMySteps.promise;
    },

    sleep: function() {
      return me.sleep - friend.sleep;
    },

    levels: function() {
      return me.levels - friend.levels;
    }
  };

});
