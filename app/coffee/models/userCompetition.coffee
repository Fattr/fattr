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

  accepted: Boolean

  challenger:
    type: ObjectId
    required: true
    ref: 'User'

  opponent:
    type: ObjectId
    required: true
    ref: 'User'

  winner: String


UserCompetitionSchema.statics.makeNewChallenge = (options) ->
  UserComp  = mongoose.model 'UserComp'
  User      = mongoose.model 'User'
  defer     = Q.defer()

  User.findOne 'username':options.opponent, (err, user) ->
    defer.reject err if err
    newChallenge = new UserComp
      'name': options.name
      'start': options.start
      'end': options.end
      'metric': options.metric
      'opponent': user._id
      'challenger': options.challenger


    newChallenge.save (err, challenge) ->
      defer.reject err if err
      if challenge?
        User.findByIdAndUpdate challenge.challenger,
        {$push:{challenges: challenge._id}}, (err, person) ->
          defer.reject err if err?
          defer.resolve challenge

  defer.promise

UserCompetitionSchema.methods.emailOpponent =  ->
  UserComp  = mongoose.model 'UserComp'
  User      = mongoose.model 'User'
  defer     = Q.defer()

  opts =
    [ {path: 'opponent', select: 'email username'},
      {path: 'challenger', select: 'email username authData.fitbit.avatar'}
    ]

  UserComp.findById @_id, (err, comp) ->
    defer.reject err if err

    UserComp.populate comp, opts, (err, grudge) ->
      defer.reject err if err
      sender = mailer.smtpTransport 'GMAIL'
      console.log 'grudge!!!! ', grudge
      sendOps =
        email: grudge.opponent.email
        challenger: grudge.challenger.username
        opponent: grudge.opponent.username
        _id: grudge._id
        start: grudge.start
        end: grudge.end
        metric: grudge.metric
        pic: grudge.challenger.authData.fitbit.avatar

      mailOps = mailer.challengeRequest sendOps


      sender.sendMail mailOps, (error, res) ->
        defer.reject error if error
        defer.resolve res if res

  defer.promise




UserCompetitionSchema.statics.findByChallenger = (id) ->
  UserComp  = mongoose.model 'UserComp'
  defer     = Q.defer()

  UserComp.findOne 'challenger': id, (err, comp) ->
    defer.reject err if err
    defer.resolve comp if comp

  defer.promise

UserCompetitionSchema.statics.findByOpponent = (username) ->
  UserComp  = mongoose.model 'UserComp'
  defer     = Q.defer()

  UserComp.findOne 'opponent': opponent, (err, user) ->
    defer.reject err if err
    defer.resolve user if user

  defer.promise

UserCompetitionSchema.statics.verifyChallenge = (decision, id) ->
  UserComp  = mongoose.model 'UserComp'
  User      = mongoose.model 'User'
  defer     = Q.defer()
  UserComp.findByIdAndUpdate id, {'accepted': decision}, (err, comp) ->
    defer.reject err if err?
    console.log comp.opponent
    User.findByIdAndUpdate comp.opponent, {$push: challenges: comp._id},
    (error, user) ->
      defer.reject err if err?
      console.log 'opponent ', user
      defer.resolve comp if user?

  defer.promise


module.exports = mongoose.model 'UserComp', UserCompetitionSchema







