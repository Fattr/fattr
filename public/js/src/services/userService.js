angular.module('fittr.services')

.provider('UserService', function() {
  this.$get = function($http, $q, localStorageService) {
    var baseUrl = "http://localhost:3000";
    // var baseUrl = "http://fittrapp.herokuapp.com";


    var calculateDates = function(numOfDays) {
      var today = new Date();
      var yesterday = new Date(today - 86400000);
      var fromDate = new Date(yesterday - (numOfDays * 86400000));
      return "/" + fromDate.toISOString().slice(0, 10) + "/" + yesterday.toISOString().slice(0, 10);
    };

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
            // console.log("data: ", data, "status: ", status);
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

      get: function() {
        return this._httpHelper('get', "/api/user" + calculateDates(1));
      },

      logout: function(user) {
        localStorageService.clearAll();
        console.log(this);
        window.location.assign("/logout");
      },

      getAll: function(numOfDays) {
        if (!numOfDays) return this._httpHelper("get", "/api/users");
        return this._httpHelper('get', "/api/users"+ calculateDates(numOfDays));
      },

      save: function(userData) {
        delete userData.__v;
        delete userData.password;
        delete userData.salt;
        this.currentUser = userData;
        this.saveToLocal(userData._id, userData);

        // console.log("currentUser: ", this.currentUser);
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
      getActivity: function(numOfDays) {
        if (!numOfDays) return this._httpHelper("get", "/api/user");
        return this._httpHelper("get", "/api/user" + calculateDates(numOfDays));
      },

      saveActivity: function(userId, data) {
        var stats = {
          steps: data.stats[0].steps,
          distance: data.stats[0].distance,
          veryActiveMinutes: data.stats[0].veryActiveMinutes
        };

        // var user = this.getFromLocal(userId);

        this.currentUser.stats = stats;
        // user.stats = stats;
        // console.log("saveActivity: currentUser", this.currentUser);
        // this.saveToLocal(userId, user);
      },
      getWeekly: function(userId) {
        return this._httpHelper('get', "/api/compare" + "/" + userId);
      },

      //   stats: Object
// __v: 0
// _id: "52e86b91a7a407d4ad1f27b4"
// date: "2014-01-22"
// distance: 4.45
// steps: 5973
// user: "52e809e7a166559d706dc070"
// veryActiveMinutes: 25
// __proto__: Object
// username: "stateoflux"

      // populate the currentUser object from the most recent currentUser stored
      // in localStorage. This ensures that the currentUser always has valid
      // data when the app reloads.  Will be called during the app's run phase
      loadCurrentUser: function() {
        this.currentUser = this.getFromLocal();
      }
    };
  };
});