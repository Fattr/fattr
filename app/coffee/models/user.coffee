'use strict'

mongoose = require 'mongoose'

UserSchema = new mongoose.Schema(

  username:
    type: String
    unique: true
    required: true

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
    [{type: mongoose.Schema.ObjectId, ref: 'Group'}]

  authData:

    fitbit:
      avatar: String
      access_token: String
      access_token_secret: String
)

module.exports = mongoose.model 'User', UserSchema