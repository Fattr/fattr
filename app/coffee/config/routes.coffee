# for API and DB endpoints
helper = require './routeHelpers'
isLoggedIn = require('./middleWare').isLoggedIn
alreadyLoggedOut = require('./middleWare').alreadyLoggedOut

module.exports = (app, passport) ->
  app.get '/', helper.index

  app.get '/test/data', helper.testData

  app.post '/signup', passport.authenticate('local-signup'), (req, res) ->
    res.json 201, req.user

  app.post '/login', passport.authenticate('local-login'), (req, res) ->
    res.json req.user

  app.get '/logout', alreadyLoggedOut, helper.logout

## FITBIT AUTHORIZATION ###
  app.get '/connect/fitbit', isLoggedIn ,passport.authenticate('fitbit')
  app.get '/connect/fitbit/callback', isLoggedIn,
  passport.authenticate('fitbit',
    failureRedirect: '/login'
    successRedirect: '#/connect-devices'
  )

  app.get '/users', isLoggedIn, helper.getAll
  app.get '/users/:id', isLoggedIn, helper.getUser
  app.delete '/users/:id', isLoggedIn, helper.deleteUser
  app.get '/users/:id/fitbit/steps', isLoggedIn, helper.fitbitSteps


  app.post '/fitbitUpdate', helper.fitbitSubscriptionHandler
