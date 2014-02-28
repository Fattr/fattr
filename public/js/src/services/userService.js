angular.module('fittr.services')

  .provider('UserService', function() {

    this.$get = function($http, $q, localStorageService) {

      return {

        users: [],

        // http helper since http operations are repeated
        // several times within this service.
        // The "context" parameter is optional and used in the case
        // where one needs a reference to the UserService
        _httpHelper: function(verb, url, body) {
          var d = $q.defer();
          $http[verb](url, body)
            .success(function(data, status, headers, config) {
              d.resolve(data);
            })
            .error(function(data, status, headers, config) {
              d.reject(data, status);
            });
          return d.promise;
        },

        signup: function(user) {
          return this._httpHelper('post', '/signup', user);
        },

        login: function(user) {
          return this._httpHelper('post', '/login', user);
        },

        reset: function(user) {
          return this._httpHelper('post', '/user/forgot/password', user);
        },

        updatePw: function(user) {
          return this._httpHelper('post', '/user/reset/' + user.token, user);
        },

        get: function() {
          return this._httpHelper('get', "/api/user");
        },

        logout: function(user) {
          localStorageService.clearAll();
          console.log(this);
          window.location.assign("/logout");
        },

        getAll: function(numOfDays) {
          if (!numOfDays) return this._httpHelper("get", "/api/users");
          return this._httpHelper('get', "/api/users");
        },

        save: function(userData) {
          delete userData.__v;
          delete userData.password;
          delete userData.salt;
          this.currentUser = userData;
          this.saveToLocal(userData._id, userData);
        },

        saveToLocal: function(id, userData) {
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
        getActivity: function(numOfDays) {
          if (!numOfDays) return this._httpHelper("get", "/api/user");
          return this._httpHelper("get", "/api/user");
        },

        saveActivity: function(userId, data) {
          var stats = {
            steps: data.stats.steps,
            distance: data.stats.distance,
            veryActiveMinutes: data.stats.veryActiveMinutes
          };

          // var user = this.getFromLocal(userId);
          this.currentUser.pic = data.pic;
          this.currentUser.stats = stats;
          // user.stats = stats;
          // this.saveToLocal(userId, user);
        },
        getWeekly: function(userId) {
          return this._httpHelper('get', "/api/compare" + "/" + userId);
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