const nodemailer = require('nodemailer');

const senderMail = 'ostronostus%40gmail.com'
const pass = 'bluemix123'
const transporter = nodemailer.createTransport(`smtps://${senderMail}:${pass}@smtp.gmail.com`);

const send = options => {
    transporter.sendMail(options, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

const shareStr = `<a href="http://www.facebook.com/dialog/feed?
app_id=1653549668276647&
link=http://rymdkraftverk.io&
name=Q-app&
caption=Sharing%20is%20caring!&
message=Hey,%20check%20this%out!&
redirect_uri=http://rymdkraftverk.io"><img src="https://www.seoclerk.com/pics/416269-3UZe8B1460123095.jpg"></img></a>`

const options = {
    from: '"Q" <q@app.org>',
    to: 'robert.barlin@gmail.com',
    subject: 'You\'ve just helped us out! - Org X',
    text: '',
    html: '<p>Hi! Did you know that you just helped Org X invest in peoples future... Share this to inspire others!</p><hr/>' + shareStr
}

module.exports = {
  send: send,
  defaultOpts: options
}
