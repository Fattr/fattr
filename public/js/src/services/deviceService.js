angular.module('fittr.services')

/**
 * A simple example service that returns some data.
 */
.factory('DeviceService', function() {
  // Some fake testing data
  //var baseUrl = "http://localhost:3000";
  var baseUrl = "http://fittrapp.herokuapp.com";
  devices = [
      {
        deviceName: "FitBit",
        imgUrl: "img/fitbit_logos/1024x1024/png/fitbit-1024-blk-transparent.png",
        apiUrl: baseUrl + "/connect/fitbit"
      },
      {
        deviceName: "Jawbone Up",
        imgUrl: "img/Jawbone_logo_coming_soon.png",
        apiUrl: ""
      },
      {
        deviceName: "Moves",
        imgUrl: "img/moves_logo_coming_soon.png",
        apiUrl: ""
      },
      {
        deviceName: "Runkeeper",
        imgUrl: "img/rk-icon_coming_soon.png",
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
