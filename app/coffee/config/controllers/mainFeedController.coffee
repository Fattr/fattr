Stats                 = require '../../models/stat'
moment                = require 'moment'
{dateRange}           = require './helpers'


# fixme: refactor to use promises or async library here
# ASYNC hell down below!!!!!!!

module.exports =

  # get all users here for streams
  allUsersActivity: (req, res) ->
    # define query for search
    # this query option will find all users except current user
    # $ne = not equal
    query =
      user:
        $ne: req.user._id

    # check for from and to dates and add to query
    yesterday = moment().subtract('days', 1).format 'YYYY-MM-DD'
    dateRange  yesterday, yesterday, query

    # use .populate(), its fucking magic!
    # http://mongoosejs.com/docs/populate.html
    Stats.find(query).populate('user', 'pro username authData.fitbit.avatar')
    .exec (err, stats) ->
      if err
        throw new Error err, 'err users stream'
      else if stats
        res.json stats

  # ===========================
  # query DB to get single user
  # steps
  # ===========================



          # change this to somethig else, this is horrbile, but
          # front end will be looking for null right now

  compare: (req, res) ->
    # used to send back a comparison of current user
    # and any given user's data for 7 days
    # used to populate d3 graphs on back of cards
    compareUser = req.params.userid
    query =
      user: req.user._id

    to = moment().format 'YYYY-MM-DD'
    from = moment().subtract('days', 7).format 'YYYY-MM-DD'

    dateRange from, to, query

    returnJSON = []
    # get current users weeky data set
    Stats.find(query).sort(date: 1).exec (err, stat) ->
      if err
        throw new Error err, 'error gettig logged in user to compare'
      if stat
        data =
          username: req.user.username
          stat: stat
        # collect the current users weekly data
        # FIXME: find a better way to do this, promises
        returnJSON.push data

      query.user = compareUser
      Stats.find(query).populate('user', 'username').sort(date: 1)
      .exec (error, statt) ->
        if err
          throw new Error error, 'finding second user to compare'
        returnJSON.push statt
        res.json returnJSON

  # helper to delete current user





