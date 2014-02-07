mongoose = require 'mongoose'
expect   = require 'expect.js'
dbUrl    = 'mongodb://localhost/test'
User     = require '../models/user'
clearDB  = require('mocha-mongoose')(dbUrl)

describe 'Saving a new group', ->
  beforeEach(done) ->
    return done() if mongoose.connection.db
    mongoose.connect dbURI, done

  it "can be saved", (done) ->
    new Group({groupname: 'students'}).save done

  it "can be found", (done) ->
    new Group({groupname: 'students'}).save (err, model) ->
      return done(err)  if err
      new Group({groupname: 'staff'}).save (err, model) ->
        return done(err)  if err
        Group.find {}, (err, docs) ->
          return done(err)  if err

          # without clearing the DB between specs, this would be 3
          expect(docs.length).to.be 2
          do done

  it "can be removed", (done) ->
    new Group({groupname: 'students'}).save (err, model) ->
      return done(err)  if err
      clearDB (err) ->
        return done(err)  if err
        promise = Group.find({}).exec()
        promise.then (docs) ->
          expect(docs.length).to.eql 1
          do done

