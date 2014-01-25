'use strict';

/* global describe: false */
/* global module: false */
/* global beforeEach: false */
/* global inject: false */
/* global expect: false */
/* global it: false */

describe('Device Service Specs', function() {
  var DeviceService;

  beforeEach(module('fittr.services'));
  beforeEach(inject(function(_DeviceService_) {
    DeviceService = _DeviceService_;
  }));

  it('should not be null', function() {
    expect(DeviceService).not.toBe(null);
  });

  it('should return an array of Devices', function() {
    var devices = DeviceService.allDevices();
    expect(Array.isArray(devices)).toBe(true);
  });

  it('should return an array of four devices', function() {
    var devices = DeviceService.allDevices();
    expect(devices.length).toEqual(4);
  });

});