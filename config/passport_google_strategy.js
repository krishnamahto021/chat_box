const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:'1083188073438-ndekfdn136sf7mlil72vl8c45vnhsvnb.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://127.0.0.1:8000/users/auth/google/callback'
},
async function (accessToken,refreshToken,profile,done){
    try{
        const user = await User.findOne({email:profile.emails[0].value}).exec();
        if(user){
            return done(null,user);
        }else{
            const newUser = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
    
            })
            return done(null,newUser);
        }

    }catch(err){
        console.log('errror in authentication using google Strategy',err);

    }
}
))

module.exports = googleStrategy;