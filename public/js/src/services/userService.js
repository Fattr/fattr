angular.module('fittr.services')

.provider('UserService', function() {
  var baseUrl = "http://localhost:3000/users";
  var apiKey = '';

  // Set our API key from the .config section
  // of our app
  this.setApiKey = function(key) {
    apiKey = key || apiKey;
  };


  this.$get = function($http, $q, localStorageService) {
    return {
      // persist user details in memory
      currentUser: {},
      // TODO: integrate with user object.  quick and dirty hack :/
      sessionToken: '',

      signup: function(user) {
        console.log(user, apiKey);
        var creatingUser = $q.defer();
        
        // configure http to send app access token along with POST
        $http.defaults.headers.common['fittr-api-key'] = apiKey;
        $http.post(baseUrl, user)
          .success(function(data, status, headers, config) {
            console.log("data: ", data, "status: ", status);
            creatingUser.resolve(data); 
          })
          .error(function(data, status, headers, config) {
            creatingUser.reject(data, status);
          // TODO: investigate how to indicate to user that signup was successfull
          // TODO: investigate how to properly move from this state to connect devices state
          });

        return creatingUser.promise;
      },

      login: function(user) {
        // console.log(user, apiKey);
        // var creatingUser = $q.defer();
        
        // // configure http to send app access token along with POST
        // $http.defaults.headers.post.apikey = apiKey;
        // $http.post(baseUrl + , user)
        //   .success(function(data, status, headers, config) {
        //     console.log("data: ", data, "status: ", status);
        //     creatingUser.resolve(data);
        //     // TODO: investigate how to indicate to user that signup was successfull
        //     // TODO: investigate how to properly move from this state to connect devices state
        //     // - how about combining the two. indication of success is transition to 'connect devices'
        //     // state    
        //     // this.setUser(data);   
            
        //   })
        //   .error(function(data, status, headers, config) {
        //     creatingUser.reject(data, status);
        //   // TODO: investigate how to indicate to user that signup was successfull
        //   // TODO: investigate how to properly move from this state to connect devices state
        //   });

        // return creatingUser.promise;
      },

      retrieve: function(userId, token) {
        var retrievingUser = $q.defer();
        $http.defaults.headers.common['fittr-api-key'] = apiKey;
        $http.defaults.headers.common['fittr-session-token'] = token;
        console.log("retrieve: ", userId);
        $http.get(baseUrl + "/" + userId)
          .success(function(data, status, headers, config) {
            console.log("data: ", data, "status: ", status);
            retrievingUser.resolve(data);     
          })
          .error(function(data, status, headers, config) {
            retrievingUser.reject(data, status);
          });
        return retrievingUser.promise;
      },

      save: function(userData) {
        this.currentUser = userData;
      },

      setSessionToken: function(token) {
        this.sessionToken = token;
      },

      saveToLocal: function(userData) {
        console.log("saving user into localStorage");
        localStorageService.add('currentUser', userData);
      },
      retrieveFromLocal: function() {
        localStorageService.get('currentUser');
      }
    };
  };
});
