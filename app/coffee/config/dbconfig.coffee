# CHANGE WHEN WE HAVE CLOUD DB SERVER
module.exports =
  'url': process.env.MONGOHQ_URL || 'mongodb://localhost/app'