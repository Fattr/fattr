nodemailer = require 'nodemailer'


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
      'from': @from
      'to': user.email
      'subject': 'SweatR reset password'
      'html': "<h1> Hello #{user.username}!</h1>"+
              "<p> Here is the link to reset your password </p>" +
              "<a href=http://localhost:3000/user/reset/"+
              "#{user.reset.pass_reset} >Reset</a>"
    body
}