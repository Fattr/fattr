# routes for API and DB endpoints
helper = require './routeHelpers'
checkAPIKey = require('./apiConfig')['checkApiKey']
checkSessionToken = require('./apiConfig')['checkSessionToken']

module.exports = (app) ->
  app.get '/', helper.index
  app.get '/test/data', helper.testData

  app.post '/login', checkAPIKey, helper.login
  app.post '/logout', checkAPIKey, helper.logout

  app.get '/users', checkAPIKey, helper.getAll
  app.post '/users', checkAPIKey, helper.signup

  app.get '/users/:id', checkAPIKey, checkSessionToken, helper.getUser
  app.delete '/users/:id', checkAPIKey, checkSessionToken, helper.deleteUser
  app.put '/users/:id', checkAPIKey, checkSessionToken, helper.linkUserWithAuth


  app.get '/fitbit', helper.fitbitTokens
  app.get '/auth/fitbit/callback', helper.fitbitCallback


