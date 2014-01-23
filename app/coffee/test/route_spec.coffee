request = require 'supertest'
expect = require 'expect.js'
mongoose = require 'mongoose'
app = require '../server'
dbURI = 'mongodb://127.0.0.1/app'
user = require '../models/user'
clearDB = require('mocha-mongoose')(dbURI)
expect = require 'expect.js'

describe "Web Server", ->


  it "Should get hello world", (done) ->
    request(app).get('/').expect(200).end (err, res) ->
      expect(err).to.eql null
      do done

describe "New user signUp", (done) ->

  beforeEach (done) ->
    return done()  if mongoose.connection.db
    mongoose.connect dbURI, done

  request(app).post('/signUp')
  .send('email': 'scottmoss35@gmail', 'password': '1234')
  .expect(200)
  .end (err, res) ->
    expect(err).to.be null
    expect(res.body).to.be.an 'object'