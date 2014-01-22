module.exports =
  headers: (req, res, next)->
    res.header 'Access-Control-Allow-Origin', '*'
    res.header 'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS'
    res.header 'Access-Control-Allow-Headers',
                'Content-Type,Authorization, Content-Length,
                X-Requested-With'
                # this is for CORS preflight checks
    if req.method is 'OPTIONS' then res.send 200 else next()