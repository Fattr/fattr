Groups = require '../models/group'

module.exports =

  newGroup: (req, res) ->
    # FIXME: Change from req.body.id to req.user._id
    Groups.createGroup(req.body.id, req.body.group)
    .then (group) ->
      console.log group
      res.send 201
    .fail (err) ->
      console.log 'err in new group', err
      res.send 500

  findGroup: (req, res) ->
    Groups.findByName(req.params.name)
    .then (group) ->
      console.log group
      res.send group
    .fail (err) ->
      console.log err
      res.send 500

  addToGroup: (req, res) ->
    name = req.body.group
    # FIXME: Use req.user intead of req.body.user
    user = req.body.user
    Groups.getAdmins(name, user)
    .then (promises) ->
      console.log 'addToGroup promises', promises
      res.send 201
    # .then(Groups.memberRequest)
    # .then(Groups.emailAdmins)
    # .then (stuff) ->
    #   console.log 'here?%', stuff
    #   res.send 201
    # .fail (err) ->
    #   console.log 'error adding to group%', err
    #   res.send 500

  newMember: (req, res) ->
    group = req.params.group
    user = req.params.user
    Groups.findByName(group, user)
    .then(Groups.addToGroup)
    .then (user) ->
      console.log 'Added user', user
      res.send 200
    .fail (err) ->
      console.log 'error adding user', err
      res.send 500

