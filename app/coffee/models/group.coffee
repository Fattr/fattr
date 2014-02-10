'use strict'

Q           = require 'q'
nodemailer  = require 'nodemailer'
mongoose    = require 'mongoose'


GroupSchema = new mongoose.Schema(

  name:
    type: String
    unique: true
    required: true

  admins:
    [
      admin:
        type: mongoose.Schema.ObjectId
        ref: 'User'
    ]

  users:
    [
      user:
        type: mongoose.Schema.ObjectId
        ref: 'User'
    ]
)

# GroupSchema.statics.addToGroup = (group, user) ->
#   Group = mongoose.model 'Group'
#   defer = Q.derfer()

#   group.admins.forEach (admin) ->



GroupSchema.statics.createGroup = (user, groupName) ->
  defer = Q.defer()
  Group = mongoose.model 'Group'
  newGroup = new Group
  newGroup.name = groupName

  newGroup.save (err) ->
    if err then defer.reject err
  newGroup.admins.push _id: user
  newGroup.users.push _id: user
  defer.resolve newGroup
  defer.promise


GroupSchema.statics.findByName = (name) ->
  Group = mongoose.model 'Group'
  defer = Q.defer()
  Group.findOne 'name': name, (err, group) ->
    if err then defer.reject err
    if group then defer.resolve group
  defer.promise

GroupSchema.statics.memberRequest = (group, user) ->
  defer = Q.defer()
  group.populate('admins.admin', 'name email').exec (err, admins) ->
    if err then defer.reject err
    if admins then defer.resolve admins
  derfer.promise



module.exports = mongoose.model 'Group', GroupSchema
