angular.module('fittr.controllers')

.controller('GroupsController', [
  '$scope',
  'UserService',
  'GroupService',
  function($scope, UserService, GroupService) {

  // Current user 
  var user = UserService.currentUser;

  $scope.notInGroup = false;

  // GROUPS
  $scope.groups = [];

  // Current View
  $scope.view = function(view) {
    if (view === 'in') {
      $scope.v = 'in';
      console.log('in');
    } else if (view === 'find') {
      $scope.v = 'find';
      $scope.groups = [
        {
          name: 'testy'
        }
      ];
      // set $scope.groups
    }
  }

  /*
   * Create Groups
   */
  $scope.createGroup = function(name) {
    return GroupService.create(name);
  };

  /*
   * Fetch Groups
   */

  $scope.addMe = function(groupName) {
    GroupService.addToGroup(groupName);
  };

  // In Groups
  $scope.inGroups = GroupService.inGroups();


  // Search Groups
  $scope.findGroup = function(params) {
    return GroupService.findGroup();
  };

}]);