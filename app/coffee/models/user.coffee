'use strict'

Q           = require 'q'
mongoose    = require 'mongoose'
mailer      = require '../config/mail'
uuid        = require 'node-uuid'

UserSchema = new mongoose.Schema(

  username:
    type: String
    unique: true
    required: true

  email:
    type: String
    unique: true
    required: true

  # Should make seperate schema for token here and associate it with the user
  # this will allow us to have an expiring reset token for
  pass_reset:
    type: String

  password:
    type: String
    required: true

  salt: String

  createdAt:
    type: Date
    default: Date.now

  updatedAt:
    type: Date
    default: Date.now

  pro: Boolean

  groups:
    [{type: mongoose.Schema.ObjectId, ref: 'Group', index: true}]

  authData:

    fitbit:
      avatar: String
      access_token: String
      access_token_secret: String
)

###
  User instance methods
###
  # find all groups for this user
UserSchema.methods.findGroups = ->
  defer = Q.defer()
  options =
    path: 'groups'
    select: 'name'

  @populate options, (err, user) ->
    if err then defer.reject err
    if user
      defer.resolve user.groups
  defer.promise

###
  Static methods to increase flow and tedious queries
###

# Find user by email, mainly used in password reset but not soley
UserSchema.statics.findByEmail = (email) ->
  User = mongoose.model 'User'
  defer = Q.defer()
  User.findOne 'email': email, (err, user) ->
    if err then defer.reject err
    if user then defer.resolve user
    # FIXME
    if not user then console.log 'no user by that email'
  defer.promise

UserSchema.statics.resetPassword = (user) ->
  User = mongoose.model 'User'
  defer = Q.defer()
  # get set up the given user's _id to search
  id = user._id

  # define what fields will be updated and with what values
  update =
    pass_reset: uuid.v4() # genrates a v4 random uuid

  # define options on the query, this one will return the reset
  # token that was just updated
  options =
    select:
      'pass_reset': true

  console.log 'id', id, 'update', update, 'options', options

  User.findByIdAndUpdate id, update, options, (err, reset_token) ->
    if err then defer.reject err
    if reset_token
      userAndEmail =
        email: user.email
        reset: reset_token
        username: user.username

      defer.resolve userAndEmail
    if not reset_token then console.log 'could not get reset_token'
  defer.promise

UserSchema.statics.emailPassword = (user) ->
  # create a reusable transport method with nodemailer
  defer = Q.defer()
  sender = mailer.smtpTransport 'GMAIL'

  console.log 'reset', user.reset.pass_reset
  # setup email options to be sent can HTML if need be, All Unicode
  mailOptions = mailer.resetPass user

  sender.sendMail mailOptions, (err, response) ->
    if err then defer.reject err
    if response then defer.resolve response

  defer.promise

module.exports = mongoose.model 'User', UserSchema
