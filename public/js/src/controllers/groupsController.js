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

  // Current View
  $scope.view = function(view) {
    if (view === 'in') {
      $scope.v = 'in';
      $scope.groups = GroupService.inGroups();
      console.log($scope.groups);
    } else if (view === 'find') {
      $scope.v = 'find';
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

}]);