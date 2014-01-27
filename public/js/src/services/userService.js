angular.module('fittr.services')

.provider('UserService', function() {
  this.$get = function($http, $q, localStorageService) {
    var baseUrl = "http://fast-spire-4621.herokuapp.com/";




    return {
      // currentUser: {},

      // THIS IS DUMMY DATA

      // currentUser: {
      //   username: 'Marty McFly',
      //   steps: 8000,
      //   distance: 5.2,
      //   calories: 2734
      // },

      // DUMMY DATA END

      users: [],

      // http helper since http operations are repeated
      // several times within this service.
      // The "context" parameter is optional and used in the case
      // where one needs a reference to the UserService
      _httpHelper: function(verb, url, body) {
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
      },

      signup: function(user) {
        return this._httpHelper('post', 'signup', user);
      },

      login: function(user) {
        return this._httpHelper('post', 'login', user);
      },


      get: function(userId) {
        return this._httpHelper('get', "users/" + userId, this);
        // return this._httpHelper('get', "user/");
      },

      getAll: function() {
        return this._httpHelper('get', "test/data");
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
        delete userData.__v;
        delete userData.password;
        delete userData.salt;
        this.currentUser = userData;
        this.saveToLocal(userData._id, userData);

        console.log("currentUser: ", this.currentUser);
      },

      saveToLocal: function(id, userData) {
        // debugger;
        localStorageService.add(id, userData);
        localStorageService.add('currentUser', userData);   // maybe this can be optimized
      },
      getFromLocal: function(userId) {
        if (userId) {
          return localStorageService.get(userId);
        } else {
          return localStorageService.get('currentUser');
        }
      },

      // Helper function to retrieve user's activity
      getActivity: function(userId, numOfDays) {
        var calculateDates = function(numOfDays) {
          var today = new Date();
          var fromDate = new Date(today - (numOfDays * 86400000));
          return fromDate.toISOString().slice(0, 10) + "/" + today.toISOString().slice(0, 10);
        };

        return this._httpHelper("get", "api/user/" + calculateDates(numOfDays));
      },

      saveActivity: function(userId, activities) {
        var user = this.getFromLocal(userId);

        this.currentUser.activities = activities;
        user.activities = activities;
        this.saveToLocal(userId, user);
      },

      // populate the currentUser object from the most recent currentUser stored
      // in localStorage. This ensures that the currentUser always has valid
      // data when the app reloads.  Will be called during the app's run phase
      loadCurrentUser: function() {
        this.currentUser = this.getFromLocal();
      }
    };
  };
});
