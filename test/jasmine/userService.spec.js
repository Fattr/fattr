'use strict';

/* jasmine specs for services go here */

describe('User Service Specs', function() {
  var UserService;
  var localStorageService;
  var baseUrl = "http://localhost:3000/users";

  beforeEach(module('fittr.services', 'LocalStorageModule'));
  beforeEach(inject(function(_UserService_, _localStorageService_) {
    UserService = _UserService_;
    localStorageService = _localStorageService_;
  }));

  it('should not be null', function() {
    expect(UserService).not.toBe(null);
  });

  describe('signup method', function() {

    // do i test the http request?
    it('should return a promise object when invoked', function() {
      var promise = UserService.signup();

      expect(typeof promise).toEqual('object');
      expect(typeof promise.then).toEqual('function');
    });
  });

  describe('retrieve method', function() {

    // do i test the http request?
    it('should return a promise object when invoked', function() {
      var promise = UserService.retrieve();

      expect(typeof promise).toEqual('object');
      expect(typeof promise.then).toEqual('function');
    });
  });

  describe('saving users', function() {
    var user;

    beforeEach(function() {
      user = {
        'email':'karl@gmail.com',
        '_id':'007',
        'following':[],
        'services':[],
        'updatedAt':'2014-01-20T20:06:43.598Z',
        'createdAt':'2014-01-20T20:06:43.598Z'
      };
    });

    describe('save method', function() {
      it('should save user details to user property', function() {
        UserService.save(user);
        expect(typeof UserService.currentUser).toEqual('object');
        expect(UserService.currentUser.email).toEqual('karl@gmail.com');
        expect(UserService.currentUser._id).toEqual('007');
        expect(UserService.currentUser.services).toEqual([]);
      });
    });

    xdescribe('saveToLocal', function() {
      it('should save user details to localStorage', function() {
        var userFromLocal;

        UserService.saveToLocal(user);
        userFromLocal = UserService.retrieveFromLocal();

        expect(userFromLocal).toEqual('object');
        expect(userFromLocal.email).toEqual('karl@gmail.com');
        expect(userFromLocal._id).toEqual('007');
        expect(userFromLocal.services).toEqual('[]');
      });
    });
  });
});
