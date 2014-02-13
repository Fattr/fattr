angular.module('fittr.controllers')

.controller('GroupsController', [
  '$scope',
  'UserService',
  'GroupService',
  function($scope, UserService, GroupService) {

  // Current user 
  var user = UserService.currentUser;

  // Current View
  $scope.view = function(view) {
    if (view === 'in') {
      $scope.v = 'in';
      console.log('in');
    } else if (view === 'find') {
      $scope.v = 'find';
      console.log('find');
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