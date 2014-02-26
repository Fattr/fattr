'use strict'

Q           = require 'q'
mailer      = require '../config/mail'
mongoose    = require 'mongoose'
Schema      = mongoose.Schema
ObjectId    = Schema.ObjectId


UserCompetitionSchema = new Schema
  name: String

  start: String

  end: String

  metric: String

  accpeted: Boolean

  challenger:
    type: ObjectId
    required: true
    ref: 'User'

  opponent: String

  winner: String


UserCompetitionSchema.statics.makeNewChallenge = (options, username) ->
  UserComp = mongoose.model 'UserComp'
  defer = Q.defer()

  newChallenge = new UserComp
    'name': options.name
    'start': options.start
    'end': options.end
    'metric': options.metric

  newChallenge.save (err, challenge) ->
    defer.reject err if err
    defer.resolve if challenge

  defer.promise

UserCompetitionSchema.statics.findByChallenger = (id) ->
  UserComp = mongoose.model 'UserComp'
  defer = Q.defer()

  UserComp.findOne 'challenger': id, (err, comp) ->
    defer.reject err if err
    defer.resolve comp if comp

  defer.promise

UserCompetitionSchema.statics.findByOpponent = (username) ->
  UserComp = mongoose.model 'UserComp'
  defer = Q.defer()

  UserComp.findOne 'opponent': opponent, (err, user) ->
    defer.reject err if err
    defer.resolve user if user

  defer.promise

UserCompetitionSchema.methods.verifyChallenge = (decision) ->
  UserComp = mongoose.model 'UserComp'
  defer = Q.defer()

  UserComp.findByIdAndUpdate @_id, {'accpeted': value}, (err, user) ->
    defer.reject err if err
    defer.resolve user if user

  defer.promise










