bcrypt = require 'bcrypt'
q      = require 'q'

module.exports = {
  getSalt: (n) ->
    defer = q.defer()
    bcrypt.genSalt n, (err, salt) ->
      defer.reject err if err
      defer.resolve salt if salt

  getHash: (password, salt) ->
    defer = q.defer()
    bcrypt.hash password, salt, null, (err, hash) ->
      defer.reject err if err
      defer.resolve hash if hash
    defer.promise
}