angular.module('fittr.controllers')

.controller('ConnectDevicesController', function($scope, $http, DeviceService, UserService) {
  // TODO: move devices to a service
  $scope.sideMenuController.close();
  $scope.devices = DeviceService.allDevices();
  $scope.services = DeviceService.allServices();

  $scope.logout = function (){
    UserService.logout();
  };

  $scope.goBack = function (){
    console.log('trying to go back');
    window.history.back();
  };

  // $scope.authFitBit = function() {
  //   $http.get($scope.devices[0].apiUrl)
  //     .success(function(data) {
  //       console.log(data);
  //     })
  //     .error(function(reason) {
  //       console.log(reason);
  //     });
  // };
});
