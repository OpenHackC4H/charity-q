var nodemailer = require('nodemailer');

var senderMail = 'ostronostus%40gmail.com'
var pass = 'bluemix123'
var transporter = nodemailer.createTransport(`smtps://${senderMail}:${pass}@smtp.gmail.com`);

var send = options => {
    transporter.sendMail(options, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = send

//************EXAMPLE****************

var options = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>',
    to: 'axel.ulmestig@gmail.com',
    subject: 'Hello ✔', 
    text: 'Hello world 🐴',
    html: '<b>pet nice horsie 🐴</b>'
};

send(options)
