superTest = require 'superTest'
mongoose  = require 'mongoose'
expect    = require 'expect.js'
dbUrl     = 'mongodb://127.0.0.1/app'
User      = require '../models/user'


# function to find our test user, tracy
findUser = (cb) ->
  User.findOne 'email': 'tracy@gmail.com', (err, tracy) ->
    throw new err if err
    cb tracy

before (done) ->
  # Drop db
  User.collection.drop (err) ->
    # save test user
    if err then throw new err
    User.create
      'email': 'tracy@gmail.com'
      'password': '1234', done

describe 'create user', ->

  it 'Should create a document that can be found', (done) ->
    User.findOne 'email': 'tracy@gmail.com', (err, tracy) ->
      expect(tracy.email).to.be 'tracy@gmail.com'
      do done

