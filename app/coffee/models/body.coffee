  'use strict'

mongoose = require 'mongoose'

BodySchema = new mongoose.Schema(
  user:
    type: Schema.ObjectId
    ref: 'User'

  collectedFrom:
    type: Schema.ObjectId
    ref: 'Service'

  date:
    type: Date
    default: Date.now

  bicep: Number
  bmi: Number
  calf: Number
  chest: Number
  fat: Number
  forearm: Number
  hips: Number
  neck: Number
  thigh: Number
  waist: Number
  weight: Number
)

module.exports = mongoose.model 'Body', BodySchema