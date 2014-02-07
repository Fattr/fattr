'use strict'

mongoose = require 'mongoose'

GroupSchema = new mongoose.Schema(
  
  groupname:
    type: String
    unique: true
    required: true

  createdAt:
    type: Date
    default: Date.now

  users:
    [{type: mongoose.Schema.ObjectId, ref: 'User'}]
)

module.exports = mongoose.model 'Group', GroupSchema