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
        res.json stats

  # ===========================
  # query DB to get single user
  # steps
  # ===========================

  userActivity: (req, res) ->
    query = user: req.user._id
    dateRange req.params.from, req.params.to, query

    Stats.find query, (err, stats) ->
      if err
        res.send err
      else if stats.length
        data =
          username: req.user.username
          pic: req.user.authData.fitbit.avatar
          stats: stats
        res.json data
      else if !stats.length
        date = moment(req.params.from) or
        moment().subtract('days', 8)

        toDate = moment().subtract('days', 1)
        query =
          'user': req.user._id
          'date': toDate.format 'YYYY-MM-DD'

        while date <= toDate
          getDailyActivities req, res, date.format('YYYY-MM-DD'), saveStats
          date = date.add 'days', 1
          console.log "date #{date.format 'YYYY-MM-DD'}",
          "toDate #{toDate.format 'YYYY-MM-DD'}"

  compare: (req, res) ->
    compareUser = req.params.userid
    query = user: req.user._id

    to = moment().subtract('days', 1).format 'YYYY-MM-DD'
    from = moment.subtract('days', 8).format 'YYYY-MM-DD'

    dateRange from, to, query

    returnJSON = []

    Stats.find query, (err, stat) ->
      if err
        console.log 'error gettig logged in user to compare', err
        res.send 500
      if stat
        data =
          username: req.user.username
          stat: stat
        returnJSON.push data

      query.user = compareUser
      Stats.find(query).populate('user', 'username').exec (error, statt) ->
        if err
          console.log 'err getting compred user ', error
          res.send 500
        returnJSON.push statt
        res.json returnJSON



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


getDailyActivities = (req, res, day, cb) ->
  token =
    oauth_token: req.user.authData.fitbit.access_token
    oauth_token_secret: req.user.authData.fitbit.access_token_secret

  fitbitClient.apiCall 'GET', '/user/-/activities/date/'+ day + '.json',
  'token': token, (err, resp, userData) ->
    if err
      console.log 'error-- routeHelpers -- getDailyActivities', err
      res.send 500
    stat = new Stats()
    stat.user = req.user._id
    stat.date = day
    stat.steps = userData.summary.steps
    stat.veryActiveMinutes = userData.summary.veryActiveMinutes
    stat.distance = userData.summary.distances[0].distance
    cb stat

saveStats = (stat) ->
  date = moment().subtract('days', 1).format "YYYY-MM-DD"
  stat.save (err) ->
    if err
      console.log 'error savnig stats', err
    console.log 'stat date!!!!! ', stat.date


