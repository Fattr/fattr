# routes for API and DB endpoints
helper = require './routeHelpers'

module.exports = (app, passport) ->
  app.get '/', helper.index
  app.get '/test/data', helper.testData

  app.post '/login', helper.login # passport here
  app.post '/logout', helper.logout #passport here

  app.get '/users', helper.getAll
  app.post '/users', helper.signup # passport here




