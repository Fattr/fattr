/*
 * Groups Service
 *
 * This service's primary job is to add/remove user(s)
 * from group(s)
 * 
 * It also permits users to create groups
 */
 
angular.module('fittr.services')

.provider('GroupService', function() {
  this.$get = function($http, $q) {
    return {

      // http helper since http operations are repeated
      // several times within this service.
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

      // Create group
      createGroup: function(name) {
        return this._httpHelper('post', '/group/new', name);
      },

      // Fetch groups
      inGroups: function(userId) {
        // return this._httpHelper('get', '/groups');
        // this is temporary until the endpoint is set up
        return [
          {name: 'Hack Reactor'},
          {name: '2013-11'},
          {name: 'Hackers in Residence'},
          {name: 'Staff'}
        ];
      },

      // Join group
      addToGroup: function(groupName) {
        return this._httpHelper('post', '/group/request', {group: groupName});
      },

      // Available groups
      groupsAvail: function() {
        return this._httpHelper('get', '/group');
      },

      // Search groups
      findGroup: function(params) {
        return this._httpHelper('get', '/group/' + params)
      }

    }
  }

});