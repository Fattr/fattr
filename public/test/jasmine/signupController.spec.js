xdescribe('signupController specs', function() {
  var $scope; 

  beforeEach(module('fittr.controllers', 'fittr.services')); 
  beforeEach(inject(function($rootScope) { 
    $scope = $rootScope.$new();
  }));

  function runController($scope, projects) {
    inject(function($controller) {
      $controller('SignupController', { $scope: $scope, projects: projects });
    });
  }

});
