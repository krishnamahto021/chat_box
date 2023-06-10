const nodemailer = require('../config/nodemailer');

module.exports.signUP = function(user){
    let htmlString = nodemailer.renderTemplate({user:user},'/user_sign_up/sign_up_mailer.ejs');
    nodemailer.transporter.sendMail({
        from:'krishna.coding.ninjas01@gmail.com',
        to:user.email,
        subject:"let's connect World!!",
        html:htmlString,
    },function(err,info){
        if(err){
            console.log('errror in sending mails',err);
        }
        // console.log('message Sent ',info);
    }
    )
}