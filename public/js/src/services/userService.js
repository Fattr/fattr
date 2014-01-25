angular.module('fittr.services')

.provider('UserService', function() {
  this.$get = function($http, $q, localStorageService) {
    var baseUrl = "http://localhost:3000/";   

    // http helper since http operations are repeated
    // several times within this service   
    var httpHelper = function(verb, url, body) {
      var d = $q.defer();
      $http[verb](baseUrl + url, body)
        .success(function(data, status, headers, config) {
          console.log("data: ", data, "status: ", status);
          d.resolve(data); 
        })
        .error(function(data, status, headers, config) {
          d.reject(data, status);
        });
      return d.promise;
    };

    return {
      currentUser: {},
      users: [],

      signup: function(user) {
        return httpHelper('post', 'signup', user);
      },

      login: function(user) {
        return httpHelper('post', 'login', user);
      },

      get: function(userId) {
        //return httpHelper('get', "users/" + userId);
        return httpHelper('get', "user/");
      },

      getAll: function() {
        return httpHelper('get', "test/data");
      //   $http.get(baseUrl + "test/data")
      //     .success(function(data, status, headers, config) {
      //       console.log("data: ", data, "status: ", status);
      //       fetchingUsers.resolve(data);

      //       // need logic to format the data for user stream
      //       // =============================================
      //     })
      //     .error(function(data, status, headers, config) {
      //       fetchingUsers.reject(data, status);
      //     });
      //   return fetchingUsers.promise;
      },

      save: function(userData) {
        this.currentUser = userData;
      },

      saveToLocal: function(userData) {
        console.log("saving user into localStorage");
        localStorageService.add('currentUser', userData);
      },
      getFromLocal: function() {
        return localStorageService.get('currentUser');
      }

    };
  };
});
