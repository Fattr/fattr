angular.module('fittr.services')
  .factory('DeviceService', function() {
    devices = [
        {
          deviceName: "FitBit",
          imgUrl: "img/fitbit-small-blk-transparent.png",
          apiUrl: "/connect/fitbit"
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
