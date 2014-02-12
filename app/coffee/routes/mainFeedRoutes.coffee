main          = require '../controllers/mainFeedController'
{isLoggedIn}  = require '../config/middleWare'

module.exports = (app) ->

  app.get '/api/users/:from?/:to?', isLoggedIn, main.allUsersActivity

  app.get '/api/compare/:userid?', isLoggedIn, main.compare