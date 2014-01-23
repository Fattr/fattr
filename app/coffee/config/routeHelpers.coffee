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
      'Fred'
      'Scott'
      'Monte Ellis'
      'Blake Griffin'
      'David'
      'Tony'
      'Santiago'
      'Mehul'
      'Wayne'
      'LeBron'
      'Kobe'
    ]
    user = 0
    while user < users.length
      mock =
        username: users[user]
        date: new Date Date.now()
        steps: Math.floor Math.random() * (16000 - 2200 + 1) + 2200
        calories: Math.floor Math.random() * (6000 - 1000 + 1) + 1000
        distance: Math.floor Math.random() * (16 - 2 + 1) + 2
        levels: Math.floor Math.random() * (60 - 2 + 1) + 2

      mock.isAthlete =
        if users[user] is 'Kobe' or
            users[user] is 'LeBron' or
            users[user] is 'Blake Griffin' or
            users[user] is 'Monte Ellis'
          true
        else
          false

      mock.pic =
        if users[user] is 'LeBron'
          'http://i.cdn.turner.com/nba/nba/.element/img
          /2.0/sect/statscube/players/large/lebron_james.png'
        else if users[user] is 'Kobe'
          'http://i.cdn.turner.com/nba/nba/.element/img
          /2.0/sect/statscube/players/large/kobe_bryant.png'
        else if users[user] is 'Blake Griffin'
          'http://i.cdn.turner.com/nba/nba/.element/
          img/2.0/sect/statscube/players/large/blake_griffin.png'
        else if users[user] is 'Monte Ellis'
          'http://i.cdn.turner.com/nba/nba/.element/
          img/2.0/sect/statscube/players/large/monte_ellis.png'
        else if users[user] is 'Scott'
          'https://1.gravatar.com/avatar/96d5a49ddb4d1d6988dd1929dccd3661?d
          =https%3A%2F%2Fidenticons.github.com%2Fd1943b74ae4cd1ce3d3ad429
          7b626c1a.png&r=x&s=440'
        else if users[user] is 'David'
          'https://0.gravatar.com/avatar/7fc76b7262f1e22d769652a9506acc
          9b?d=https%3A%2F%2Fidenticons.github.com%2F56842110357e1aba7
          e14857dd6bd070c.png&r=x&s=440'
        else if users[user] is 'Santiago'
          'https://1.gravatar.com/avatar/501933637783f2df99d065ac0e6ad
          f4a?d=https%3A%2F%2Fidenticons.github.com%2F9c4979333012b6db
          b47769acf5b3b397.png&r=x&s=440'
        else if users[user] is 'Mehul'
          'https://0.gravatar.com/avatar/0eaac84ceab7d598e05d570dce7f
          a99f?d=https%3A%2F%2Fidenticons.github.com%2F3790612107b7e2
          854245b2142f7a300f.png&r=x&s=440'
        else if users[user] is 'Wayne'
          'https://2.gravatar.com/avatar/7e3df1c25b636118521100ba361
          45163?d=https%3A%2F%2Fidenticons.github.com%2F74abb5e54014
          bd2260eef52f3f862966.png&r=x&s=440'
        else if users[user] is 'Fred'
          'https://i4.sndcdn.com/avatars-000004417025-ogo23j-t120x120
          .jpg?5a267fd'
        else if users[user] is 'Tony'
          'http://hrhq.squarespace.com/assets/images/heroes/tonyphillips.jpg'

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
    # res.send 401 if id isnt String req.user._id # only for logged-in user
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


