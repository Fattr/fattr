User                  = require '../models/user'
Stats                 = require '../models/stat'
moment                = require 'moment'
crypto                = require '../config/crypto'
UserComp              = require '../models/userCompetition'
{getDailyActivities}  = require './helpers'
{saveStats}           = require './helpers'
{dateRange}           = require './helpers'


module.exports =

  #==========================
  # static assets
  #==========================

  index: (req, res) ->
    # by default express will send index.html on  GET '/'
    # so this is just optional
    # send back splash/landing instead
    # of jsut login/signup
    res.sendfile 'index.html'

  #==========================
  # CRUD ops
  #==========================

  # logout helper
  logout: (req, res) ->
    id = req.user._id
    User.findById id, (err, user) ->
      if err
        throw new Error err, ' cannot find user to log'
      if user
        user.lastLoggedIn = Date.now()
        user.save (err) ->
          throw new Error err if err
      req.logout()
      res.redirect '/'

  # get curent user on the fly if need it, should not need this, security issue
  getUser: (req, res) ->
    id = req.params.id
    res.send 401 if id isnt String req.user._id # can only get logged in user
    User.findById id, (err, user) ->
      if err
        throw new Error err, 'User.findOne error '

      if not user
        # user isn't in the db
        res.send 204
      if user
        res.json user

  # method to retrieve forgotten password. User posts email
  # generate access-token (should expire), email user link
  # to update password, access token is attached as param to
  # link. Check the access-token, if valid, then accept the
  # new password and redirect somewhere
  forgotPassword: (req, res) ->
    email = req.body.email

    User.findByEmail(email)
    .then(User.resetPassword)
    .then(User.emailPassword)
    .then (response) ->
      console.log 'sent message', response
      res.send 200
    .fail (err) ->
      console.log 'err somewhere in reset pass', err
      res.send 500

  resetPassword: (req, res) ->
    # send a redirect to an angular template instead of a pure html file
    # this will allow for proper design and control over the password rest form
    res.redirect '#/reset/password/password'

  updatePassword: (req, res) ->
    # take in new password and update the user
    token = req.params.token
    password = req.body.password
    crypto.getSalt(10)
    .then (salt) ->
      crypto.getHash(password, salt)
      .then (hash) ->
        secured =
          salt: salt
          password: password
          token: token
        User.findByTokenAndUpdate(secured)
        .then (user) ->
          console.log "password has been updated for #{user.email}"
          res.send 201
        .fail (err) ->
          throw new Error err





  userActivity: (req, res) ->
    # define the DB query to get results
    today = moment().subtract('days', 1).format 'YYYY-MM-DD'
    query = user: req.user._id
    dateRange today, today, query
    Stats.find query, (err, stats) ->
      if err
        throw new Error err, 'error getting api/user data'
      else if stats.length
      # if stats, send back reqested range of stats along with user data
        data =
          username: req.user.username
          pic: req.user.authData.fitbit.avatar
          stats: stats[0]
        res.json data
      else if !stats.length
        # if no stats in db, go to fitbit and get 7 days
        # worth of stats and save to db
        date = moment().subtract('days', 7)

        toDate = moment().subtract('days', 1)
        query =
          'user': query.user
          'date': today


        while date <= toDate
          # helper function that goes to fitbit and gets a weeks data set
          getDailyActivities req, res, date.format('YYYY-MM-DD'), saveStats
          date = date.add 'days', 1

  deleteUser: (req, res) ->
    id = req.user._id
    User.findById id, (err, user) ->
      if err
        throw new Error err, 'could not find user to delete'
      if not user
        # user is not in DB anyways..
        res.send 204
      else
        user.remove (err, user) -> # remove user record
          if err
            throw new Error err, 'could not delete user'
          req.logout()
          res.redirect '/'

  # helper to protect angular routes on client
  loggedIn: (req, res) ->
    res.send if req.isAuthenticated() then req.user else "0"

  groups: (req,res) ->
    email =
      if req.params.email
        "#{req.params.email}.com"
      else if req.user.email
        req.user.email

    User.findByEmail(email)
    .then (user) ->
      user.findGroups()
      .then (groups) ->
        console.log '%s groups', groups
        res.json groups
      .fail (err) ->
        console.log '%s err getting groups', err
        throw new Error err
    .fail (err) ->
      console.log '%s err finding user by email', err
      throw new Error err

  newChallenge: (req, res) ->

    ops =
      name: req.body.name
      start: req.body.start
      end: req.body.end
      metric: req.body.metric
      opponent: req.body.opponent
      challenger: req.body.user

    UserComp.makeNewChallenge(ops)
    .then (comp) ->
      comp.emailOpponent()
      .then (message) ->
        console.log 'email %s ', message
        res.send 201
      .fail (err) ->
        throw new Error err
    .fail (err) ->
      throw new Error err

  verifyChallenge: (req, res) ->
    compId      = req.params.comp
    decision    = req.params.decision is 'yes' ? true : false

    console.log decision

    UserComp.verifyChallenge(decision, compId)
    .then (comp) ->
      console.log "verified #{comp.name} decision is #{decision}"
      res.send 200
    .fail (err) ->
      throw new Error err

    # User.findByUsername(opponent)
    # .then (user) ->
    #   UserComp.findByIdAndUpdate compId, {accepted: decision},
    #   (err, comp) ->
    #     throw new Error if err?
    #     console.log 'verify comp: ', comp
    #     res.send 200 if comp?

  getChallenges: (req, res) ->
    _id    = req.user._id


