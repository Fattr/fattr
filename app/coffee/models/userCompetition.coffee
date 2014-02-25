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

  challenger:
    required: true
    type: String

  opponent: String

  winner: String



UserCompetitionSchema.statics.newChallengeReqesut = (options, username) ->
  UserComp = mongoose.model 'UserComp'
  defer = Q.defer()

  newChallenge = new UserComp
    'name': options.name
    'start': options.start
    'end': options.end
    'challenger': options.challenger

  newChallenge.save (err, challenge) ->
    defer.reject err if err
    defer.resolve if challenge





