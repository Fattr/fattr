'use strict'

mongoose = require 'mongoose'

UserSchema = new mongoose.Schema(

  name: String

  email:
    type: String
    unique: true

  password: String

  createdAt:
    type: Date
    default: Date.now

  updatedAt:
    type: Date
    default: Date.now

  authData:

    fitbit:
      id: String
      access_token: String
      access_token_secret: String

    facebook:
      id: String
      access_token: String
      expiration_date: Date
    
    twitter:
      id: String
      screen_name: String
      auth_token: String
      auth_token_secret: String
      # TO-DO: FIGURE OUT IF WE NEED TO STORE BELOW ON USER
      #consumer_key: your applications consumer key,
      #consumer_secret: your applications consumer secret,

  services:[{
    type: mongoose.Schema.ObjectId
    ref: 'Service'
  }]
)

module.exports = mongoose.model 'User', UserSchema