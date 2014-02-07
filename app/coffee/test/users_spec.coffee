mongoose  = require 'mongoose'
expect    = require 'expect.js'
dbUrl     = 'mongodb://localhost/appp'
User      = require '../models/user'
clearDB   = require('mocha-mongoose')(dbUrl)

describe "Saving a new user", ->
  beforeEach (done) ->
    return done()  if mongoose.connection.db
    mongoose.connect dbURI, done

  it "can be saved", (done) ->
    new User(username: 'scott').save done

  it "can be found", (done) ->
    new User(username: 'scott').save (err, model) ->
      return done(err)  if err
      new User(username: 'mike').save (err, model) ->
        return done(err)  if err
        User.find {}, (err, docs) ->
          return done(err)  if err

          # without clearing the DB between specs, this would be 3
          expect(docs.length).to.be 2
          do done

  it "Remove user", (done) ->
    new User(username: 'scott').save (err, model) ->
      return done(err)  if err
      clearDB (err) ->
        return done(err)  if err
        promise = User.find({}).exec()
        promise.then (docs) ->
          expect(docs.length).to.eql 1
          do done






