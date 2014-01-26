angular.module('fittr.services')

.provider('UserService', function() {
  this.$get = function($http, $q, localStorageService) {
    var baseUrl = "http://fast-spire-4621.herokuapp.com/";



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
      // currentUser: {},

      // THIS IS DUMMY DATA
      currentUser: {
        username: 'Marty McFly',
        steps: 8000,
        distance: 5.2,
        calories: 2734
      },
      // DUMMY DATA END

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
      },

      // Helper function to retrieve user's active
      getActivity: function(userId) {
        var d = $q.defer();

        this.get(userId)
          .then(function(data) {
            console.log("retrieve fulfilled: ", data);

            // store user details in memory
            this.save(data);

            // store user details in local storage?
            this.saveToLocal(data);
            console.log("retrieve from mem: ", this.currentUser);
            console.log("retrieve from local: ", this.getFromLocal());
            d.resolve();
          }, function(error) {
            // TODO: flesh out this error handler
            console.log("error occured during user data retrieval");
            d.reject();
          });

        return d.promise;
      }
    };
  };
});
