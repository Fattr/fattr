angular.module('fittr.controllers')

.controller('GroupsController', [
  '$scope',
  'UserService',
  'GroupService',
  function($scope, UserService, GroupService) {

    // Current View
    $scope.view = function(view) {
      if (view === 'in') {
        $scope.v = 'in';
        $scope.groups = GroupService.inGroups();
      } else if (view === 'find') {
        $scope.v = 'find';
        $scope.groups = GroupService.groupsAvail();
      }
    };

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

    $scope.view('in');

}]);