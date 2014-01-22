# requiring dependencies

express = require 'express'
mongoose = require 'mongoose'
cors = require './config/middleWare'
mongoConfig = require './config/dbconfig'

# connect to DB
mongoose.connect mongoConfig.url
app = express()

# app config
# express middleware for passport and sessions
app.set 'port', process.env.PORT || 3000
app.use express.logger('dev')

app.use cors.headers
app.use express.bodyParser()
app.use express.cookieParser()
app.use express.methodOverride()

# routes for api and DB endpoints
require('./config/routes')(app)

module.exports = app