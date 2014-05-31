var nodemailer = require("nodemailer");
var dotenv = require('dotenv'); // loads .env into process.env
dotenv.load();


// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Hotmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


module.exports = function(mailOptions) {
    // mailOptions.from = "Collage With Friends <collagewithfriends@hotmail.com>", // sender address
    mailOptions.from = process.env.EMAIL_FULL;
    console.log('hello!')

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });


}