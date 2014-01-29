app     = require './server'
{port}  = require './config/serverConfig'

app.listen port

console.log "I hears ya on #{port} breh!"