 app    = require './server'
{port}  = require './config/serverConfig'
console.log 'app', app
app.listen port

console.log "I hears ya on #{port} breh!"