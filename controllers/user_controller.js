const User = require('../models/user');
const userSignUpMailer = require('../mailers/sign_up_mailer');
// to render sign up page
module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        title:'Create Account'
    })
}

// to fetch data from the user
module.exports.create = async function(req,res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    const user = await User.findOne({email:req.body.email});
    if(user){//if user already exists
        return res.redirect('/');

    }else{
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });
        // console.log(newUser);
        userSignUpMailer.signUP(newUser);
        return res.redirect('/');
    }
}

module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.userProfile = function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    });
};

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error in loging out!');
        }
        return res.redirect('/');
    })
}