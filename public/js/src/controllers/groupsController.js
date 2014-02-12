angular.module('fittr.controllers')

.controller('GroupsController', [
  '$scope',
  'UserService',
  'GroupService',
  function($scope, UserService, GroupService) {

  // Current user 
  var user = UserService.currentUser;

  /*
   * Create Groups
   */
  $scope.createGroup = function(name) {
    return GroupService.create(name);
  };

  /*
   * Fetch Groups
   */

  // In Groups
  $scope.inGroups = GroupService.inGroups();

  // Available Groups
  $scope.groupsAvail = function() {
    return GroupService.available();
  };

  // Search Groups
  $scope.findGroup = function(params) {
    return GroupService.findGroup();
  };

}]);