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

      retrieve: function(userId) {
        return httpHelper('get', "users/" + userId);

        // var retrievingUser = $q.defer();

        // console.log("retrieve: ", userId);
        // $http.get(baseUrl + "users/" + userId)
        //   .success(function(data, status, headers, config) {
        //     console.log("data: ", data, "status: ", status);
        //     retrievingUser.resolve(data);     
        //   })
        //   .error(function(data, status, headers, config) {
        //     retrievingUser.reject(data, status);
        //   });
        // return retrievingUser.promise;
      },

      save: function(userData) {
        this.currentUser = userData;
      },

      saveToLocal: function(userData) {
        console.log("saving user into localStorage");
        localStorageService.add('currentUser', userData);
      },
      retrieveFromLocal: function() {
        return localStorageService.get('currentUser');
      },

      getUserActivity: function(userId) {
        // return httpHelper('get', "users") 
        // var fetchingUserAct = $q.defer();

        // console.log("getUserActivity: ", userId);
        // $http.get(baseUrl + "users/" + userId + "/fitbit/steps")
        //   .success(function(data, status, headers, config) {
        //     // console.log("data: ", data, "status: ", status);
        //     // console.log("what is this: ", this.currentUser);
        //     // this.currentUser.activity = data;
        //     fetchingUserAct.resolve(data);
        //   })
        //   .error(function(data, status, headers, config) {
        //     fetchingUserAct.reject(data, status);
        //   });
        // return fetchingUserAct.promise;
      },

      getAllUsers: function() {
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
      // }
    };
  };
});
