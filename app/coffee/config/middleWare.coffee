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

  # route middleware to make sure a user is logged in
  isLoggedIn: (req, res, next) ->
    # if user is authenticated in the session, carry on 
    return next()  if req.isAuthenticated()
    
    # if they aren't redirect them to the home page
    res.redirect "/"