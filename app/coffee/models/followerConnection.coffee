'use strict'

mongoose = require 'mongoose'

FollowerConnectionSchema = new mongoose.Schema(
  
  followee:
    type: mongoose.Schema.ObjectId
    ref: 'User'

  follower:
    type: mongoose.Schema.ObjectId
    ref: 'User'

  start:
    type: Date
    default: Date.now

  last:
    type: Date
    default: Date.now
  
  end: Date
)

module.exports = mongoose.model 'FollowerConnection', FollowerConnectionSchema