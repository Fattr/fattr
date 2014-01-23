# call backs for the routes

User    = require '../models/user'
Stats   = require '../models/stat'
bcrypt  = require 'bcrypt-nodejs'
uuid    = require 'node-uuid'
fitbit  = require('fitbit-js')('6b8b28e0569a422e97a70b5ca671df32',
                               'b351c1fea45d48ed9955a518f4e30e72',
                               'http://127.0.0.1:3000/fitbit')

module.exports =

  # TO-DO: DECIDE WHAT INDEX ROUTE SHOULD RETURN
  index: (req, res) ->
    # by default express will send index.html on  GET '/'
    res.sendfile('index.html')

  testData: (req, res) ->
    data = []
    users = [
      'fred'
      'scott'
      'david'
      'tony'
      'santiago'
      'mehul'
      'wayne'
      'douche'
    ]
    user = 0
    while user < users.length
      mock =
        username: users[user]
        date: new Date Date.now()
        steps: Math.floor Math.random() * (16000 - 2200 + 1) + 2200
      data.push mock
      user++
    res.json data

  signup: (req, res) ->

  login: (req, res) ->

  logout: (req, res) ->

  getUser: (req, res) ->

  getAll: (req, res) ->

  deleteUser: (req, res) ->

  testFitbit: (req, res) ->
    console.log req.user._id
    User.findOne
      "_id": req.user._id
    , (err, user) ->
      if err
        return done err
      if not user
        return done null, false
      # all is well, return successful user
      else
        fitbit.apiCall "GET", "/user/-/activities/date/2014-01-20.json",
          token:
            oauth_token: user.authData.fitbit.access_token
            oauth_token_secret: user.authData.fitbit.access_token_secret
        , (err, resp, json) ->
          return res.send(err, 500)  if err
          res.json json


