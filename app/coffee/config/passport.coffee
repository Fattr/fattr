LocalStrategy = require('passport-local').Strategy
FitbitStrategy = require('passport-fitbit').Strategy
User    = require '../models/user'
apiUrl  = require('./serverConfig')['url']
bcrypt  = require 'bcrypt-nodejs'
config = require("./auth").fitbit

module.exports = (passport) ->

  # =========================================================================
  # passport session setup ==================================================
  # =========================================================================
  # required for persistent login sessions
  # passport needs ability to serialize and unserialize users out of session

  # used to serialize the user for the session

  passport.serializeUser (user, done) ->
    done null, user._id

  # used to deserialize the user

  passport.deserializeUser (id, done) ->
    User.findById id, (err, user) ->
      # don't send the entire user here
      done err, user

  # =========================================================================
  # LOCAL SIGNUP ============================================================
  # =========================================================================
  # Using named strategies since we have one for login and one for signup
  # by default, if there was no name, it would just be called 'local'

  passport.use "local-signup", new LocalStrategy(

    # by default, local strategy uses username/password, override with email

    usernameField: "username"
    passwordField: "password"
    passReqToCallback: true # pass back the entire req to the callback

  , (req, username, password, done) ->

    # find a user whose email is the same as the forms email
    # we are checking to see if the user trying to login already exists

    User.findOne
      "username": username
    , (err, user) ->

      # if there are any errors, return the error
      if err
        return done err
      # check to see if theres already a user with that email
      if user
        return done null, false
      else
        # if there is no user with that email, create new user
        newUser = new User()
        newUser.username = username
        newUser.email = req.body.email
        # generate password salt
        bcrypt.genSalt 10, (err, salt) ->
          if err
            console.error 'bcrypt.genSalt error: ', err
            return done err
          # hash password with salt
          bcrypt.hash password, salt, null, (err, hash) ->
            if err
              console.error 'bcrypt.hash error: ', err
              return done err
            newUser.password = hash
            newUser.salt = salt
            newUser.save (err) ->
              if err
                console.error 'error - could not save user ', err
                return done err
              return done null, newUser
  )

  # =========================================================================
  # LOCAL LOGIN =============================================================
  # =========================================================================
  # we are using named strategies since we have one for login and one for signup
  # by default, if there was no name, it would just be called 'local'

  passport.use "local-login", new LocalStrategy(
    usernameField: "username"
    passwordField: "password"
    passReqToCallback: true # pass back the entire request to the callback
  , (req, username, password, done) ->

    # find a user whose email is the same as the forms email
    # we are checking to see if the user trying to login already exists

    User.findOne
      "username": username
    , (err, user) ->
      if err
        return done err
      # if wrong email or password
      if not user
        return done null, false
      # all is well, return successful user
      else
        bcrypt.compare password, user.password, (err, same) ->
          if err
            console.error 'bcrypt.compare error ', err
            return done err
          else if not same
            # password is incorrect
            return done null, false
          else
            # found a user in the db
            done null, user
  )

  passport.use new FitbitStrategy(
    consumerKey: config.consumerKey
    consumerSecret: config.consumerSecret
    callbackURL: config.callbackURL
    passReqToCallback : true
  , (req, token, tokenSecret, profile, done) ->

    # asynchronous
    # process.nextTick () ->
    # check if the user is already logged in

    process.nextTick () ->
      if not req.user
        done null, false
      else # user already exists and is logged in, we have to link accounts
        user = req.user # pull the user out of the session

        # update the current user's fitbit credentials

        user.authData.fitbit.access_token = token
        user.authData.fitbit.access_token_secret = tokenSecret
        user.authData.fitbit.avatar = profile._json.user.avatar
        user.updatedAt = new Date()

        # save the user

        console.log 'new user here', user
        user.save (err) ->
          console.error err  if err
          done null, user
  )
