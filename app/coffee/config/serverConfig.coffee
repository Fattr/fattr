port = process.env.PORT or 3000

module.exports =
  url: 'http://localhost:#{port}'
  port: port
