xdescribe('signupController specs', function() {
  var $scope; 

  // beforeEach(module('fittr.controllers')); 
  beforeEach(inject(function($rootScope) { 
    $scope = $rootScope.$new();
  }));

  xit('should do something', inject(function($controller) { 
    var teamMember = {}; 
    $controller('signupController', {
      $scope: $scope
    });
  }));
});
