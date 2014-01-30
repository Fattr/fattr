mongoose = require "mongoose"
{url} = require './config/dbconfig'
db = mongoose.connect url
User = require "./models/user"
Stat = require "./models/stat"
config = require("./config/auth").fitbit
fitbitClient = require("fitbit-js")(config.consumerKey,
config.consumerSecret, config.callbackURL)
moment = require "moment"

# =================================
# get all users fibit access tokens
# retrieve prior days info and save
# to database
# =================================

yesterday = do ->
  date = moment()
  date = date.subtract("days", 1).format("YYYY-MM-DD")
  date

updateActivitiesDb = (userActivities) ->
  console.log 'act', userActivities
  console.log '---DATE---', userActivities.date
  dailyActivities = new Stat(
    user: userActivities.id
    date: userActivities.date
    steps: userActivities.summary.steps
    veryActiveMinutes: userActivities.summary.veryActiveMinutes
    distance: userActivities.summary.distances[0].distance

  )
  dailyActivities.save (err, activities, numAffected) ->
    unless err
      console.log "number affected", numAffected


getActivities = (users) ->
  i = 0

  while i < users.length
    ((index) ->
      user = users[index]
      token =
        oauth_token: user.authData.fitbit.access_token
        oauth_token_secret: user.authData.fitbit.access_token_secret

      fitbitClient.apiCall "GET", "/user/-/activities/date/"+
      yesterday + ".json",
        token: token
      , (err, resp, userActivities) ->
        unless err
          userActivities.id = user._id
          userActivities.date = yesterday
          updateActivitiesDb userActivities

    ) i
    i++

updateProfileDb = (userProfile, user) ->

  # updates displayName and profPic
  query = _id: user._id
  User.update query,
    $set:
      "fitbit.displayName": userProfile.user.displayName
      "fitbit.avatar": userProfile.user.avatar

  # {upsert: true},
  , (err, numAffected, raw) ->
    console.log err  if err
    console.log "rows affected:", numAffected


getProfile = (users) ->
  i = 0

  while i < users.length
    user = users[i]
    token =
      oauth_token: user.authData.fitbit.access_token
      oauth_token_secret: user.authData.fitbit.access_token_secret

    fitbitClient.apiCall "GET", "/user/-/profile.json",
      token: token
    , (err, resp, userProfile) ->
      updateProfileDb userProfile, user  unless err

    i++


# Grab all users from DB
User.find {$where: () ->
  @authData and @authData.fitbit},
  (err, users) ->
    if err
      console.log "could not find users", err
      return err
    if users
      getActivities users
      getProfile users
    if not users.length
      console.log 'no users in your db man'
