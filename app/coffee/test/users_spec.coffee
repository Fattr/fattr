superTest = require 'superTest'
mongoose  = require 'mongoose'
expect    = require 'expect.js'
dbUrl     = 'mongodb://localhost/test'
User      = require '../models/user'
clearDB   = require('mocha-mongoose')(dbUrl)

describe "Example spec for a model", ->
  beforeEach (done) ->
    return done()  if mongoose.connection.db
    mongoose.connect dbURI, done

  it "can be saved", (done) ->
    new User(username: 'scott').save done

  it "can be listed", (done) ->
    new User(username: 'scott').save (err, model) ->
      return done(err)  if err
      new User(username: 'mike').save (err, model) ->
        return done(err)  if err
        User.find {}, (err, docs) ->
          return done(err)  if err

          # without clearing the DB between specs, this would be 3
          expect(docs.length).to.be 2
          do done


  it "can clear the DB on demand", (done) ->
    new User(username: 'scott').save (err, model) ->
      return done(err)  if err
      clearDB (err) ->
        return done(err)  if err
        promise = User.find({}).exec()
        promise.then (docs) ->
          expect(docs.length).to.eql 1
          do done






