app = require './server'

###### TO-DO - CHANGE ALL INSTANCES OF COFFEE WITH JS ##########
port  = require('./app/coffee/config/serverConfig')['port']

app.listen port

console.log "I hears ya on #{port} breh!"