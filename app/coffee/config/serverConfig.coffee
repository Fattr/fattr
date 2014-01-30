
module.exports =
  url: 'http://localhost:#{@port}'
  port: process.env.PORT or 3000

  # default error handler for allroutes
  error: (err, req, res, next) ->
    console.error err.stack
    res.send 500
