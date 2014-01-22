CoffeeScript = require "coffee-script"
fs = require "fs"

fs.readFile "tmp.coffee", "utf-8", (error, data) ->
    throw error if error
    console.log JSON.stringify CoffeeScript.nodes(data).expressions, null, "  "



