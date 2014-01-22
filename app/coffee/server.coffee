# requiring dependencies

express = require 'express'
mongoose = require 'mongoose'
cors = require './config/middleWare'
mongoConfig = require './config/dbconfig'
passport = require 'passport'

# connect to DB

mongoose.connect mongoConfig.url
require('./config/passport')(passport)
app = express()

# app config
# express middleware for passport and sessions

app.set 'port', process.env.PORT || 3000
app.use express.logger('dev')

app.use cors.headers
app.use express.favicon()
app.use express.bodyParser()
app.use express.cookieParser()
app.use express.methodOverride()
app.use express.session secret: 'superfit'
app.use passport.initialize()
app.use passport.session()
app.use app.router()
app.use express.static __dirname + '/public'

# routes for api and DB endpoints

require('./config/routes')(app, passport)

module.exports = app