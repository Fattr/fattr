# requiring dependencies

express     = require 'express'
mongoose    = require 'mongoose'
passport    = require 'passport'
cors        = require './config/middleWare'
mongoConfig = require './config/dbconfig'
{port}      = require './config/serverConfig'
{error}     = require './config/serverConfig'


# connect to DB
mongoose.connect mongoConfig.url

# Populate passport object with strategies
require('./config/passport')(passport)

app = express()
app.set 'port', port

# Middleware
app.use express.logger('dev')
app.use cors.headers
app.use express.favicon()
app.use express.cookieParser()
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.session secret: 'superfit'
app.use passport.initialize()
app.use passport.session()
app.use app.router
app.use error

app.use express.static __dirname + '/../../public'

# routes for api and DB endpoints
require('./routes/userRoutes')(app, passport)
require('./routes/groupRoutes')(app, passport)
require('./routes/mainFeedRoutes')(app)


console.log 'here!!!!!!', process.env.CONSUMER_KEY,
process.env.CONSUMER_SECRET


module.exports = app

