angular.module('fittr.controllers')

.controller('CardsController', function($scope) {
  $scope.users = [
    {
      name: 'David',
      steps: 8785
    },
    {
      name: 'Scott',
      steps: 5255
    },
    {
      name: 'Wayne',
      steps: 7573
    },
    {
      name: 'Santiago',
      steps: 10083
    },
    {
      name: 'Mehul',
      steps: 15000
    }
  ];

  $scope.back = function() {
    
  };
});