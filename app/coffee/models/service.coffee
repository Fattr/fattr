'use strict'

mongoose = require 'mongoose'

ServiceSchema = new mongoose.Schema(
  name: String
)

module.exports = mongoose.model 'Service', ServiceSchema