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
      type: mongoose.Schema.ObjectId
      ref: 'User'
    ]

  users:
    [
      type: mongoose.Schema.ObjectId
      ref: 'User'
    ]
)

GroupSchema.statics.checkGroup = (party) ->
  group = party.group
  user = party.user
  defer = Q.defer()
  console.log 'check group here'
  group.users.forEach (id) ->
    if id is user then defer.reject user

  defer.resolve party
  defer.promise

GroupSchema.statics.askAdmin = (admin, group, user) ->
  defer = Q.defer()
  console.log 'askAdmin here', group
  smtpTransport = nodemailer.createTransport(
    'SMTP', {service: 'Gmail', auth: {
      user: 'willscottmoss@gmail.com'
      pass: 'ballin35'
      }
    }
  )

  # export this out and make reusable
  mailOptions =
    'from': 'Scott Moss <scottmoss35@gmail.com>'
    'to': admin.email
    'subject': "SweatR -- #{group.name} request"
    'html': "<h1>Hello #{admin.username}</h1>" +
            "<p> This person, #{user} wants to join your group"+
            " #{group.name}.</p> <table cellpadding='0'"+
            "cellspacing='0' border='0'> <tr> <td bgcolor='#f02d37'"+
            "background='' height='100' width='300'"+
            "style='color:#FFFFFF; font-family:"+
            "Times New Roman, Times, serif;' align='center'"+
            "valign='middle'> <a href='http://"+
            "localhost:3000/add/#{group.name}/#{user}'"+
            "style='color:#FFFFFF; text-decoration:none;'>"+
            "Add user</a> </td> </tr> </table>"

  smtpTransport.sendMail mailOptions, (err, response) ->
    if err then defer.reject err
    if response then defer.resolve response

  defer.promise

GroupSchema.statics.emailAdmins = (party) ->
  Group = mongoose.model 'Group'
  group = party.group
  user = party.user

  defer = Q.defer()
  admins = party.group.admins
  promises = []

  admins.forEach (admin) ->
    promise = Group.askAdmin(admin, group, user)
    promise.then (response) ->
      console.log 'emailed admin'

    promises.push promise

  Q.all(promises)


GroupSchema.statics.addToGroup = (party) ->
  defer = Q.defer()

  group = party.group
  length = group.users.length

  user = party.user
  group.users.push user

  if group.users.length <= length then defer.reject user
  defer.resolve user
  defer.promise


GroupSchema.statics.createGroup = (user, groupName) ->
  defer = Q.defer()
  Group = mongoose.model 'Group'
  newGroup = new Group
  newGroup.name = groupName

  newGroup.save (err) ->
    if err then defer.reject err
  newGroup.admins.push user
  newGroup.users.push user
  defer.resolve newGroup
  defer.promise


GroupSchema.statics.findByName = (name, user, pop) ->

  Group = mongoose.model 'Group'
  defer = Q.defer()
  if not pop
    Group.findOne 'name': name, (err, group) ->
      if err then defer.reject err
      party =
        'user': user
        'group': group

      if group then defer.resolve party
  else if pop
    Group.findOne('name': name).populate('admins', 'username email')
    .exec (err, group) ->
      if err then defer.reject err
      party =
        'user': user
        'group': group

      if group then defer.resolve party
  defer.promise


# GroupSchema.statics.memberRequest = (party) ->
#   group = party.group
#   defer = Q.defer()

#   group.populate 'users.user', (err, admins) ->
#     if err then defer.reject err
#     console.log '%s admins %s'
#     party.admins = admins
#     if admins then defer.resolve party
#   defer.promise

GroupSchema.statics.getAdmins = (name, user) ->

  Group = mongoose.model 'Group'
  Group.findByName(name, user, true)
  .then (Group.emailAdmins)


module.exports = mongoose.model 'Group', GroupSchema
