# auth tokens here, will replace with env variables
# will git ignore this once we all have a local copy
url = if process.env.HEROKU_URL
        "#{process.env.HEROKU_URL}/connect/fitbit/callback"
      else
        "http://localhost:3000/connect/fitbit/callback"

module.exports =
  fitbit:
    consumerKey: '6b8b28e0569a422e97a70b5ca671df32'
    consumerSecret: 'b351c1fea45d48ed9955a518f4e30e72'
    callbackURL: url