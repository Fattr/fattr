# auth tokens here, will replace with env variables
# will git ignore this once we all have a local copyreq


{port} = require './serverConfig'
url =
  if process.env.HEROKU_URL
    "#{process.env.HEROKU_URL}/connect/fitbit/callback"
  else
    "http://localhost:#{port}/connect/fitbit/callback"

module.exports =
  fitbit:
    consumerKey: process.env.CONSUMER_KEY
    consumerSecret: process.env.CONSUMER_SECRET
    callbackURL: url

  url: url
