 for API and DB endpoints
helper = require './routeHelpers'
isLoggedIn = require('./middleWare').isLoggedIn

module.exports = (app, passport) ->
  app.get '/', helper.index

  app.get '/test/data', helper.testData
  app.get '/users', helper.getAll

  app.post '/signup', passport.authenticate('local-signup'), (req, res) ->
    res.json 201, req.user

  app.post '/login', passport.authenticate('local-login'), (req, res) ->
    res.json req.user

  app.get '/logout', (req, res) ->
    req.logout()
    res.redirect '/'

## FITBIT AUTHORIZATION ###
  app.get '/connect/fitbit', isLoggedIn ,passport.authenticate('fitbit')
  app.get '/connect/fitbit/callback', isLoggedIn, passport.authenticate('fitbit',
    failureRedirect: '/login'
  ), (req, res) ->
    res.json req.user
    # Successful authentication, redirect home.
    # res.redirect '/'

  #### TO-DO:  FIX THIS DUMMY ROUTE BELOW ####
  app.get '/profile', isLoggedIn, (req, res) ->
    res.send('ok')
  
  app.get '/users/:id', helper.getUser
  app.delete '/users/:id', helper.deleteUser
