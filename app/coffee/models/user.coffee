'use strict'

mongoose = require 'mongoose'

UserSchema = new mongoose.Schema(

  username:
    type: String
    unique: true

  pass_reset:
    type: String

  password: String

  salt: String

  createdAt:
    type: Date
    default: Date.now

  updatedAt:
    type: Date
    default: Date.now

  lastLoggedIn: Date

  pro: Boolean

  authData:

    fitbit:
      avatar: String
      access_token: String
      access_token_secret: String

    facebook:
      id: String
      access_token: String
      expiration_date: Date
      displayName: String

    twitter:
      id: String
      screen_name: String
      auth_token: String
      auth_token_secret: String

)

module.exports = mongoose.model 'User', UserSchema