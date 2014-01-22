request = require 'supertest'
expect = require 'expect.js'
mongoose = require 'mongoose'
app = require '../server'
dbURI = 'mongodb://127.0.0.1/app'
user = require '../models/user'
clearDB = require('mocha-mongoose')(dbURI)
expect = require 'expect.js'

describe "Auth without API key", ->
  # beforeEach (done) ->
  #   return done()  if mongoose.connection.db
  #   mongoose.connect dbURI, done

  it "Should get hello world", (done) ->
    request(app).get('/').expect(200).end (err, res) ->
      expect(err).to.eql null
      do done

  it "Should not be able to POST /login without api key", (done) ->
    request(app).post('/login').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not be able to POST /signup without api key", (done) ->
    request(app).post('/users').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not be able to GET users without api key", (done) ->
    request(app).get('/users').expect(401).end (err, res) ->
      expect(err).to.be null
      do done


  it "Should not be able to GET a user without api key", (done) ->
    request(app).get('/users/123').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not be able to DELETE user without api key", (done) ->
    request(app).del('/users/123').expect(401).end (err, res) ->
      expect(err).to.be null
      do done


describe 'Auth with API Key', ->
  beforeEach (done) ->
    return done() if mongoose.connection.db
    mongoose.connect dbURI, done

  describe 'Sign up new user', ->

    # TODO: make test for smae user sign up

    it "Should POST and sign up new user with fittr-api-key", (done) ->
      request(app).post('/users',{email:'test@test.com',password:'test'})
      .set('fittr-api-key', 'myKey').end (err, res) ->
        expect(err).to.be null
        expect(res.status).to.be 201
        expect(res.body).not.to.empty()
        expect(res.body).to.be.an 'object'
        do done

    it "Should return createdAt on signup", (done) ->
      request(app).post('/users',{email:'test@test.com',password:'test'})
      .set('fittr-api-key', 'myKey').end (err, res) ->
        expect(res.body).to.have.property 'createdAt'
        do done

    it "Should return access token on signup", (done) ->
      request(app).post('/users',{email:'test@test.com',password:'test'})
      .set('fittr-api-key', 'myKey').end (err, res) ->
        expect(res.body).to.have.property '_access_token'
        do done

    it "Should return _id on signup", (done) ->
      request(app).post('/users',{email:'test@test.com',password:'test'})
      .set('fittr-api-key', 'myKey').end (err, res) ->
        expect(res.body).to.have.property '_id'
        do done


