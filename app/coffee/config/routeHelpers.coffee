# call backs for the routes

User    = require '../models/user'
Stats   = require '../models/stat'
{fitbit}  = require './auth'
fitbitClient = require("fitbit-js")(fitbit.consumerKey,
fitbit.consumerSecret, fitbit.callbackURL)
moment = require 'moment'


module.exports =

  #==========================
  # static assets
  #==========================

  index: (req, res) ->
    # by default express will send index.html on  GET '/'
    # so this is just optional
    # send back splash/landing instead
    # of jsut login/signup
    res.sendfile('index.html')


  #==========================
  # CRUD ops
  #==========================

  # logout helper
  logout: (req, res) ->
    id = req.user._id
    User.findById id, (err, user) ->
      if err
        console.error 'User.findOne error ', err
      if user
        user.lastLoggedIn = Date.now()
        user.save (err) ->
          console.error err  if err
      req.logout()
      res.redirect '/'

  # get curent user on the fly if need it, should not need this, security issue
  getUser: (req, res) ->
    id = req.params.id
    res.send 401 if id isnt String req.user._id # can only get logged in user
    User.findById id, (err, user) ->
      if err
        console.error 'User.findOne error ', err
        res.send 500
      if not user
        # user isn't in the db
        res.send 204
      if user
        res.json user

  # get all users here for streams
  allUsersActivity: (req, res) ->
    # define query for search
    query = {}

    # check for from and to dates and add to query
    dateRange req.params.from, req.params.to, query

    # use .populate(), its fucking magic!
    # http://mongoosejs.com/docs/populate.html
    Stats.find(query).populate('user', 'pro username authData.fitbit.avatar')
    .exec (err, stats) ->
      if err
        console.log 'err users stream', err
        res.send 500
      else if stats
        console.log 'stats', stats
        res.json stats

  # ===========================
  # query DB to get single user
  # steps
  # ===========================

  userActivity: (req, res) ->
    fitbitDays(req, res)

  graphData: (req, res) ->
    currentUserId = req.user._id
    compareUser = req.params.user




  # helper to delete current user

  deleteUser: (req, res) ->
    id = req.user._id
    User.findById id, (err, user) ->
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

  # helper to protect angular routes on client
  loggedIn: (req, res) ->
    res.send if req.isAuthenticated() then req.user else "0"

  #==========================
  # API helpers
  #==========================

  # mock data for quick developing on front end
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
          'http://i.cdn.turner.com/nba/nba/.element/img'+
          '/2.0/sect/statscube/players/large/lebron_james.png'
        else if users[user] is 'Kobe'
          'http://i.cdn.turner.com/nba/nba/.element/img'+
          '/2.0/sect/statscube/players/large/kobe_bryant.png'
        else if users[user] is 'Blake Griffin'
          'http://i.cdn.turner.com/nba/nba/.element/'+
          'img/2.0/sect/statscube/players/large/blake_griffin.png'
        else if users[user] is 'Monte Ellis'
          'http://i.cdn.turner.com/nba/nba/.element/'+
          'img/2.0/sect/statscube/players/large/monte_ellis.png'
        else if users[user] is 'Scott'
          'https://1.gravatar.com/avatar/96d5a49ddb4d1d6988dd1929dccd3661?d'+
          '=https%3A%2F%2Fidenticons.github.com%2Fd1943b74ae4cd1ce3d3ad429'+
          '7b626c1a.png&r=x&s=440'
        else if users[user] is 'David'
          'https://0.gravatar.com/avatar/7fc76b7262f1e22d769652a9506acc'+
          '9b?d=https%3A%2F%2Fidenticons.github.com%2F56842110357e1aba7'+
          'e14857dd6bd070c.png&r=x&s=440'
        else if users[user] is 'Santiago'
          'https://1.gravatar.com/avatar/501933637783f2df99d065ac0e6ad'+
          'f4a?d=https%3A%2F%2Fidenticons.github.com%2F9c4979333012b6db'+
          'b47769acf5b3b397.png&r=x&s=440'
        else if users[user] is 'Mehul'
          'https://0.gravatar.com/avatar/0eaac84ceab7d598e05d570dce7f'+
          'a99f?d=https%3A%2F%2Fidenticons.github.com%2F3790612107b7e2'+
          '854245b2142f7a300f.png&r=x&s=440'
        else if users[user] is 'Wayne'
          'https://2.gravatar.com/avatar/7e3df1c25b636118521100ba361'+
          '45163?d=https%3A%2F%2Fidenticons.github.com%2F74abb5e54014'+
          'bd2260eef52f3f862966.png&r=x&s=440'
        else if users[user] is 'Fred'
          'https://i4.sndcdn.com/avatars-000004417025-ogo23j-t120x120'+
          '.jpg?5a267fd'
        else if users[user] is 'Tony'
          'http://hrhq.squarespace.com/assets/images/heroes/tonyphillips.jpg'

      data.push mock
      user++
    res.json data

dateRange = (dateFrom, dateTo, query) ->
  dateFrom = (if (dateFrom is "-") then undefined else dateFrom)
  dateTo = (if (dateTo is "-") then undefined else dateTo)
  if dateFrom isnt undefined and dateTo isnt undefined
    query.date =
      $gte: dateFrom
      $lte: dateTo
  else
    query.date = $gte: dateFrom  if dateFrom isnt undefined
    query.date = $lte: dateTo  if dateTo isnt undefined

fitbitDays = (req, res) ->
  query = user: req.user._id
  token =
    oauth_token: req.user.authData.fitbit.access_token
    oauth_token_secret: req.user.authData.fitbit.access_token_secret
  dateRange req.params.from, req.params.to, query
  Stats.find query, (err, stats) ->
    if err
      res.send err
    else if stats.length
      data =
        username: req.user.username
        pic: req.user.authData.fitbit.avatar
        stats: stats[0]
      res.json data
    else if !stats.length
      fromDay = moment req.params.from
      toDay = moment req.params.to
      while fromDay <= toDay
        ((day) ->
          fitbit.fitbitClient.apiCall 'GET', '/user/-/activities/date/'+
          day + '.json', 'token': token,
          (err, resp, userActivity) ->
            if error
              console.log 'error getting fitbit data', error
              res.send 500
            stat = new Stats()
            stat.user = query.user
            stat.date = day
            stat.steps = userActivity.summary.steps
            stat.distance = userActivity.summary.distances[0].distance
            stat.veryActiveMinutes = userActivity.summary.veryActiveMinutes

            stat.save (errs) ->
              if errs
                console.log 'error saving fitbit data', errs
                res.send 500
              console.log 'stat here', stat

        ) fromDay
        fromDay = fromDay.add 'days', 1
      res.send 200





