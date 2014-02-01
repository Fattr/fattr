Stats         = require '../../models/stat'
{fitbit}      = require '../auth'
fitbitClient  = require('fitbit-js')(fitbit.consumerKey,
fitbit.cosumerSecret, fitbit.callbackURL)

module.exports =

  #==========================
  # API helpers
  #==========================

  dateRange: (dateFrom, dateTo, query) ->
    dateFrom = (if (dateFrom is "-") then undefined else dateFrom)
    dateTo = (if (dateTo is "-") then undefined else dateTo)
    if dateFrom isnt undefined and dateTo isnt undefined
      query.date =
        $gte: dateFrom
        $lte: dateTo
    else
      query.date = $gte: dateFrom  if dateFrom isnt undefined
      query.date = $lte: dateTo  if dateTo isnt undefined

  # helper function to get a weeks worth of data from fitbit
  getDailyActivities: (req, res, day, cb) ->
    token =
      oauth_token: req.user.authData.fitbit.access_token
      oauth_token_secret: req.user.authData.fitbit.access_token_secret

    fitbitClient.apiCall 'GET', '/user/-/activities/date/'+ day + '.json',
    'token': token, (err, resp, userData) ->
      if err
        throw new Error err, 'error-- routeHelpers -- getDailyActivities'
      stat = new Stats()
      stat.user = req.user._id
      stat.date = day
      stat.steps = userData.summary.steps
      stat.veryActiveMinutes = userData.summary.veryActiveMinutes
      stat.distance = userData.summary.distances[0].distance
      cb stat, req, res

  # helper function to save new stats
  saveStats: (stat, req, res) ->
    date = moment().subtract('days', 1).format "YYYY-MM-DD"
    stat.save (err) ->
      if err
        throw new Error err, 'error savnig stats'
      if stat.date is moment().subtract('days', 1).format 'YYYY-MM-DD'
        data =
          username: req.user.username
          pic: req.user.authData.fitbit.avatar
          stats: stat
        res.json data