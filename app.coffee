app = require './server'
port  = require('./config/serverConfig')['port']

app.listen port

console.log "I hears ya on #{port} breh!"