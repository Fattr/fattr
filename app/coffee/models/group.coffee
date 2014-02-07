'use strict'

mongoose = require 'mongoose'

GroupSchema = new mongoose.Schema(
  
  groupname:
    type: String
    unique: true

  users:
    [{type: mongoose.Schema.ObjectId, ref: 'User', index: true}]
)

module.exports = mongoose.model 'Group', GroupSchema
