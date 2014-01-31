'use strict'

mongoose = require 'mongoose'

StatSchema = new mongoose.Schema(
  user: # use .populate on call time to fill in linked user info here
    type: mongoose.Schema.ObjectId
    ref: 'User'

  date: String

  steps: Number
  veryActiveMinutes: Number
  distance: Number
)

module.exports = mongoose.model 'Stat', StatSchema