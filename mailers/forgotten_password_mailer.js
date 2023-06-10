const nodemailer = require('../config/nodemailer');

module.exports.forgottenPassword = function(user,token){
    let htmlString = nodemailer.renderTemplate({user:user,token:token},'/password/forgotten_password_mailer.ejs');
    nodemailer.transporter.sendMail({
        from:'krishn.coding.ninjas01@gmail.com',
        to:user.email,
        subject:'Reset Your password!',
        html:htmlString
    },function(err,info){
        if(err){
            console.log('error in sending forgotten password mail',err);
        }
        console.log('message sent',info);
    }
    )
}