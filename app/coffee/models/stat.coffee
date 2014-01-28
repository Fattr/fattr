'use strict'

mongoose = require 'mongoose'

StatSchema = new mongoose.Schema(
  user: # use .populate on call time to fill in linked user info here
    type: mongoose.Schema.ObjectId
    ref: 'User'

  collectedFrom:
    type: mongoose.Schema.ObjectId
    ref: 'Service'

  date: String

  steps: Number
  veryActiveMinutes: Number
  distance: Number
)

module.exports = mongoose.model 'Stat', StatSchema