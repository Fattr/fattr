nodemailer   = require 'nodemailer'
{url}        = require './auth'

module.exports = {
  smtpTransport: (service) ->
    return nodemailer.createTransport(
      'SMTP', {service: service, auth: {
        user: 'willscottmoss@gmail.com'
        pass: 'ballin35'
        }
      }
    )

  groupRequest: (admin, group, user) ->
    body =
      'form': 'scottmoss35@gmail.com'
      'to': admin.email
      'subject': "SweatR #{group.name} request"
      'html': "<h1>Hello #{admin.username}</h1>" +
              "<p> This person, #{user} wants to join your group"+
              " #{group.name}.</p> <table cellpadding='0'"+
              "cellspacing='0' border='0'> <tr> <td bgcolor='#f02d37'"+
              "background='' height='100' width='300'"+
              "style='color:#FFFFFF; font-family:"+
              "Times New Roman, Times, serif;' align='center'"+
              "valign='middle'> <a href='http://"+
              "localhost:3000/group/add/#{group.name}/#{user}'"+
              "style='color:#FFFFFF; text-decoration:none;'>"+
              "Add user</a> </td> </tr> </table>"
    body

  resetPass: (user) ->
    body =
      'from': "scottmoss35@gmail.com"
      'to': user.email
      'subject': 'SweatR reset password'
      'html': "<h1> Hello #{user.username}!</h1>"+
              "<p> Here is the link to reset your password </p>" +
              "<a href=#{url}/#/reset/new/"+
              "#{user.reset.pass_reset} >Reset</a>"
    body

  challengeRequest: (comp) ->
    body =
      'from': "scottmoss35@gmail.com"
      'to': comp.email
      'subject': 'SweatR competition request'
      'html': "<h1>Yo, #{comp.opponent}!</h1>"+
              "<p>You have a new challenge request from "+
              "#{comp.challenger}! <img src='#{comp.pic}' /></p>"+
              "<h2>Here are "+
              "the details</h2><ul><li>Start: #{comp.start}</li>"+
              "<li>End: #{comp.end}</li><li>Stat: #{comp.metric}</li></ul>"+


              "<table cellpadding='0'"+
              "cellspacing='0' border='0'> <tr> <td bgcolor='#66cc33'"+
              "background='' height='40' width='80'"+
              "style='color:#FFFFFF; font-family:"+
              "Times New Roman, Times, serif;' align='center'"+
              "valign='middle'> <a href='http://"+
              "localhost:3000/competition/verify/#{comp._id}"+
              "/yes' style='color:#FFFFFF;"+
              "text-decoration:none;'>"+
              "Accept</a> </td> </tr> </table>"+


              "<table cellpadding='0'"+
              "cellspacing='0' border='0'> <tr> <td bgcolor='#da4f49'"+
              "background='' height='40' width='80'"+
              "style='color:#FFFFFF; font-family:"+
              "Times New Roman, Times, serif;' align='center'"+
              "valign='middle'> <a href='http://"+
              "localhost:3000/competition/verify/#{comp._id}"+
              "/no' style='color:#FFFFFF;"+
              "text-decoration:none;'>"+
              "Decline</a> </td> </tr> </table>"
    body
}