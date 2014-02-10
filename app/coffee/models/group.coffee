'use strict'

mongoose = require 'mongoose'

GroupSchema = new mongoose.Schema(
  
  name:
    type: String
    unique: true
    required: true

  users:
    [{type: mongoose.Schema.ObjectId, ref: 'User', index: true}]

  admins:
    [{type: mongoose.Schema.ObjectId, ref: 'User', index: true}]
)

module.exports = mongoose.model 'Group', GroupSchema
