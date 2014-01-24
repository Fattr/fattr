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

describe "Test data", ->

  it "Should send mock users", (done) ->
    request(app).get('/test/data').expect(200).end (err, res) ->
      expect(err).to.be null
      expect(res.body).to.be.ok
      expect(res.body).to.be.an 'array'
      expect(res.body.length).to.be 11
      expect(res.body[0]).to.be.an 'object'
      expect(res.body[0].username).to.be.a 'string'
      do done

describe "User auth", (done) ->

  beforeEach (done) ->
    return done()  if mongoose.connection.db
    mongoose.connect dbURI, done

  it "Should sing up new user", (done) ->
    request(app).post('/signUp')
    .send('email': 'scott33moss35@gmail', 'password': '1234')
    .expect(200)
    .end (err, res) ->
      expect(err).to.be.an 'object'
      expect(res.body).to.be.an 'object'
      expect(res.body).to.have.property '_id'
      expect(res.body).to.have.property 'salt'
      expect(res.body).to.have.property 'password'
      do done

  it "Should not let new user sign in", (done) ->
    request(app).post('/login')
    .send('email': 'scott3dsf3moss35@gmail', 'password': '1234')
    .expect(401)
    .end (err, res) ->
      do done

describe "Auth with Fitbit", (done) ->

  it "Should not auth with fitbit if not logged in", (done) ->
    request(app).get('/connect/fitbit').expect(401)
    .end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not auth with fitbit callback", (done) ->
    request(app).get('/connect/fitbit/callback').expect(401)
    .end (err, res) ->
      expect(err).to.be null
      do done




