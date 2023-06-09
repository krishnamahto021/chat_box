const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

// serializing user to decide which key is to be set in the cookie
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserailizing user from cookie
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error in finding user --->passport',err);
        return done(err);
    }
});


// authentication using passport
passport.use(new LocalStrategy(
    {   
        usernameField: 'email',
    },
    async function(email,password,done){
        try{
            const user = await User.findOne({email:email});
            // console.log(user);
            let isMatch;
            if(user){
                isMatch = await bcrypt.compare(password,user.password)
            }
            if(!user){
                return done(null,false);
            }else if(!isMatch){
                return done(null,false);
            }else{
                return done(null,user);
            }

        }catch(err){
            console.log('error in creating session by passport',err);
        }
    }
));

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/');
    }
}

// set the authenticated user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;