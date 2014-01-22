# routes for API and DB endpoints
helper = require './routeHelpers'

module.exports = (app, passport) ->
  app.get '/', helper.index
  app.get '/test/data', helper.testData

  app.post '/login', helper.login # passport here
  app.post '/logout', helper.logout #passport here

  app.get '/users', helper.getAll
  app.post '/signup', passport.authenticate('local-signup',
    successRedirect: '/profile' # redirect to the secure profile section
    failureRedirect: '/signup' # redirect to /signup if there is an error
    failureFlash: true # allow flash messages
  )

  #### TO-DO:  FIX THIS DUMMY ROUTE BELOW ####
  app.get '/profile', (req, res) ->
    res.send('ok')
  app.get '/users/:id', helper.getUser
  app.delete '/users/:id', helper.deleteUser
