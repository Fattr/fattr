Q = require 'q'

module.exports =
  map: (arr, fn) ->
    promises = arr.map (el) ->
      fn el
    Q.all promises

