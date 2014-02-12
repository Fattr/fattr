angular.module('fittr.controllers')

.controller('GroupsController',
  [
    '$scope',
    'UserService',
    'GroupService',
    function($scope, UserService, GroupService) {

    // Current user 
    var user = UserService.currentUser;

    /*
     * Group creation
     */
    $scope.createGroup = function(name) {
      GroupService.create(name, user);
    };

    /*
     * Fetch Groups
     */ 

    // In Groups
    $scope.user.fetchGroups = function() {
      GroupService.fetch(user);
    };

    // Available Groups
    $scope.groupsAvail = function() {
      GroupService.available();
    };

    // Search Groups
    $scope.search = function(params) {
      GroupService.findGroup();
    };

}]);