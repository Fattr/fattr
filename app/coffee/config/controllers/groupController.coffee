Groups = require '../../models/group'

module.exports =

  newGroup: (req, res) ->
    # FIXME: Change from req.body.id to req.user._id
    Groups.createGroup(req.body.id, req.body.gname)
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
