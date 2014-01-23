# call backs for the routes

User    = require '../models/user'
Stats   = require '../models/stat'
bcrypt  = require 'bcrypt-nodejs'
uuid    = require 'node-uuid'

module.exports =

  # TO-DO: DECIDE WHAT INDEX ROUTE SHOULD RETURN
  index: (req, res) ->
    # by default express will send index.html on  GET '/'
    res.sendfile('index.html')

  testData: (req, res) ->
    data = []
    users = [
      'fred'
      'scott'
      'david'
      'tony'
      'santiago'
      'mehul'
      'wayne'
      'douche'
    ]
    user = 0
    while user < users.length
      mock =
        username: users[user]
        date: new Date Date.now()
        steps: Math.floor Math.random() * (16000 - 2200 + 1) + 2200
      data.push mock
      user++
    res.json data

  signup: (req, res) ->

  login: (req, res) ->

  logout: (req, res) ->

  getUser: (req, res) ->

  getAll: (req, res) ->

  deleteUser: (req, res) ->


