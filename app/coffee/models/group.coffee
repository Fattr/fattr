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

# Group schema static methods. The 'Group' model has access to these methods
# They all return promisises ad expect promise resolutions as arguments with
# 'findByName' being an exception. Some may not be needed. Mostly used to
# handle group request, invitations, users, and admins
# Should be able to remove users too.

# check if user already brelongs to group
GroupSchema.statics.checkGroup = (party) ->
  group = party.group
  user = party.user
  defer = Q.defer()
  console.log 'check group here'
  group.users.forEach (id) ->
    if id is user then defer.reject user

  defer.resolve party
  defer.promise

# will take one admin and email them a request from user to join a group
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

  # FIXME: export this out and make reusable
  # ex: mailOptions = require('./mail')(admin, user, group)
  # or mail = mailOptions(admin, user, group)
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

# send all admins from a group and send them one by one to 'askAdmin'
# to email request uses Q.all to resolve an array of promises at one time.
# 'askAdmin' returns a promise for every admin
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

# when admin acepts request in email, this will add user to group
# FIXME: this operation is non-atomic!!! It does not push to the original
# user's array for the group! might have to do this operation inside a
#'findByName' opertaion or something like that, or an update query might work
GroupSchema.statics.addToGroup = (party) ->
  defer = Q.defer()

  group = party.group
  length = group.users.length

  user = party.user
  group.users.push user

  if group.users.length <= length then defer.reject user
  defer.resolve user
  defer.promise


# when a user creates a group, this is fired, user automatically becomes admin
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


# find group by name. pass in optional boolean third argument if you want
# to populate the groups admins array with the admins' emails and usernames,
# us this option when sending admins email request should add feature to
# optioanlly populate the users array as well
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


# does not currently populate anything
# GroupSchema.statics.memberRequest = (party) ->
#   group = party.group
#   defer = Q.defer()

#   group.populate 'users.user', (err, admins) ->
#     if err then defer.reject err
#     console.log '%s admins %s'
#     party.admins = admins
#     if admins then defer.resolve party
#   defer.promise


# this fucntion is a wrapper for some of the above functions
# it will populate the group with the admins, them email them all with a
# request to join the group from the user
GroupSchema.statics.getAdmins = (name, user) ->

  Group = mongoose.model 'Group'
  Group.findByName(name, user, true)
  .then (Group.emailAdmins)


module.exports = mongoose.model 'Group', GroupSchema
