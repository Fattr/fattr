angular.module('fittr.controllers')

.controller('ConnectDevicesController', function($scope, $http, DeviceService, UserService) {
  $scope.devices = DeviceService.allDevices();
  $scope.services = DeviceService.allServices();

  $scope.logout = function (){
    UserService.logout();
  };

  $scope.goBack = function (){
    console.log('trying to go back');
    window.history.back();
  };
});
