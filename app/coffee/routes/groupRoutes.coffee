group         = require '../controllers/groupController'
{isLoggedIn}  = require '../config/middleWare'

module.exports = (app, passport) ->

  # Make a new group
  app.post '/group/new', isLoggedIn, group.newGroup

  # delete group
  #app.delete '/group/:name/delete', isLoggedIn, group.deleteGroup

  # update group with name or something
  #app.put '/group/:name/update', isLoggedIn, group.updateGroup

  # request to join a group
  app.post '/group/request', isLoggedIn, group.addToGroup

  # find a group by name
  app.get '/group/:name', isLoggedIn, group.findGroup

  # admin aprove user request through email
  app.get '/group/add/:group/:user', isLoggedIn, group.newMember

  # get all admins that belong to a group
  #app.get '/group/admins', isLoggedIn, group.getAdmins

  # get all users that belong to group
  #app.get '/group/users', isLoggedIn, group.getUsers