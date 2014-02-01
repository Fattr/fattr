{port}  = require './config/serverConfig'
app     = require './server'

app.listen port

console.log "Listening on port #{port}"