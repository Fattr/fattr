# for API and DB endpoints
user                = require './controllers/userController'
mainFeed            = require './controllers/mainFeedController'
group               = require './controllers/groupController'
{isLoggedIn}        = require './middleWare'
{alreadyLoggedOut}  = require './middleWare'


module.exports = (app, passport) ->
  #=========================
  # Routes here!!
  #=========================

  # serves splash! Change splash to a real splash and not signup/sign in
  app.get '/', user.index

  # Signup new users route
  app.post '/signup', passport.authenticate('local-signup'), (req, res) ->
    res.json 201, req.user

  # log in returning users
  app.post '/login', passport.authenticate('local-login'), (req, res) ->
    res.json req.user

  # log current user out the session
  app.get '/logout', alreadyLoggedOut, user.logout

  # delete user out from app and DB, no comming back
  app.delete '/users/delete', isLoggedIn, user.deleteUser

  app.post '/user/forgot/password', user.forgotPassword

  app.get '/user/reset/:token?', user.resetPassword

  # app.post '/user/reset/:token?', user.updatePassword

  # users stream route
  app.get '/api/users/:from?/:to?', isLoggedIn, mainFeed.allUsersActivity

  # get current users stats
  app.get '/api/user/:from?/:to?', isLoggedIn, user.userActivity

  app.get '/api/compare/:userid?', isLoggedIn, mainFeed.compare

  app.get '/loggedin', user.loggedIn


  app.post '/group/new', group.newGroup

  app.post '/group/request', group.addToGroup

  app.get '/group/:name', group.findGroup

  app.get '/add/:group/:user', group.newMember


  # /api/user/2014-01-20
  #================================
  # fitbit api here
  #================================

  # auth with fitbit
  app.get '/connect/fitbit', isLoggedIn, passport.authorize 'fitbit',
  display: 'touch'

  # fitbit call back route/ authorize not authenticate here, small diff
  # must use (req, res) callback here for this to work prop with authorize
  app.get '/connect/fitbit/callback', isLoggedIn,
  passport.authorize('fitbit', failureRedirect: '/login'), (req, res) ->
    res.redirect '#/main/stream'




