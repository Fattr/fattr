angular.module('fittr.services')

/**
 * A simple example service that returns some data.
 */
.factory('DeviceService', function(UserService) {
  var baseUrl = "http://localhost:3000/fitbit";
  // Some fake testing data
  devices = [
      {
        deviceName: "FitBit",
        imgUrl: "img/fitbit_logos/1024x1024/png/fitbit-1024-blk-transparent.png",
        apiUrl: baseUrl
      },
      {
        deviceName: "Jawbone Up",
        imgUrl: "img/Jawbone_logo_black.png",
        apiUrl: ""
      },
      {
        deviceName: "Moves",
        imgUrl: "img/moves_logo.png",
        apiUrl: ""
      },
      {
        deviceName: "Runkeeper",
        imgUrl: "img/rk-icon.png",
        apiUrl: ""
      }
    ];

    services = [
      {
        serviceName: "Facebook",
        imgUrl: "img/FB-f-Logo__blue_512.png",
        apiUrl: ""
      }
    ];
  
  return {
    allDevices: function() {
      return devices;
    },
    allServices: function() {
      return services;
    },
    get: function(deviceId) {
      // Simple index lookup
      return devices[deviceId];
    }
  };
});
