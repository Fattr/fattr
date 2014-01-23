# call backs for the routes

User    = require '../models/user'
Stats   = require '../models/stat'
bcrypt  = require 'bcrypt-nodejs'
uuid    = require 'node-uuid'
fitbit  = require('fitbit-js')('6b8b28e0569a422e97a70b5ca671df32',
                               'b351c1fea45d48ed9955a518f4e30e72',
                               'http://127.0.0.1:3000/fitbit')

formatDate = (date) ->
  year = date.getFullYear()
  month = parseInt date.getMonth() + 1
  day = date.getDate()
  month = '0' + month  if month < 10
  day = '0' + day  if day < 10
  "#{year}-#{month}-#{day}"

aMonthAgo = () ->
  # the date - 30 days (in ms)
  new Date Date.now()-30*24*60*60*1000

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

  logout: (req, res) ->
    User.findOne
      '_id': req.user._id,
      (err, user) ->
        if err
          console.error 'User.findOne error ', err
        if user
          user.lastLoggedIn = Date.now()
          user.save (err) ->
            console.error err  if err
        req.logout()
        res.redirect '/'

  getUser: (req, res) ->
    id = req.params.id
    res.send 401 if id isnt String req.user._id # can only get logged in user
    User.findOne
      '_id': id,
      (err, user) ->
        if err
          console.error 'User.findOne error ', err
          res.send 500
        if not user
          # user isn't in the db
          res.send 204
        if user
          res.json user

  getAll: (req, res) ->
    User.find((err, users) ->
      if err
        console.error 'User.find error', err
        res.send 500
      res.json users
    )

  deleteUser: (req, res) ->
    id = req.params.id
    res.send 401 if id isnt String req.user._id # only delete logged-in user
    User.findOne
      '_id':id,
      (err, user) ->
        if err
          console.error 'User.findOne error', err
          res.send 500
        if not user
          # user is not in DB anyways..
          res.send 204
        else
          user.remove (err, user) -> # remove user record
            if err
              console.error 'user.remove error ', err
              res.send 500
            req.logout()
            res.redirect '/'

  fitbitSteps: (req, res) ->
    id = req.params.id
    res.send 401 if id isnt String req.user._id # only for logged-in user
    User.findOne
      "_id": id,
      (err, user) ->
        if err
          return done err
        if not user
          return done null, false
        # all is well, return successful user
        else
          ##
          lastMonth = formatDate aMonthAgo()
          today = formatDate new Date()
          fitbit.apiCall "GET",
            "/user/-/activities/steps/date/#{lastMonth}/#{today}.json",
            token:
              oauth_token: user.authData.fitbit.access_token
              oauth_token_secret: user.authData.fitbit.access_token_secret
          , (err, resp, json) ->
            return res.send(err, 500)  if err
            res.json json

  fitbitSubscriptionHandler: (req, res) ->
    console.log req.body
    res.send 204


