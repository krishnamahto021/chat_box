const User = require('../models/user');
const userSignUpMailer = require('../mailers/sign_up_mailer');
const forgottenPasswordMailer = require('../mailers/forgotten_password_mailer');
const crypto = require('crypto');
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


// to show update password form
module.exports.showUpdatePasswordForm = function(req,res){
    return res.render('reset_password',{
        title:'Reset Password'
    });
};

// to collect data from update password form
module.exports.updatePasswordDataCollect = async function(req,res){
    const user = await User.findOne({email:req.body.email});
    if(user){//send mail
        const token = crypto.randomBytes(20).toString('hex');
        user.token = token;
        await user.save();
        forgottenPasswordMailer.forgottenPassword(user,token);

        return res.redirect('/');

    }else{
        return res.redirect('/');
    }

}

// to render reset password form
module.exports.resetPassword = async function(req,res){
    const user = await User.findOne({token:req.params.token});
    if(user){
        return res.render('update_password',{
            title:'Reset password',
            user_id:user._id
        })
    }else{
        return res.redirect('/');
    }
}

// to update password
module.exports.updatePassword = async function(req,res){
    const user = await User.findById(req.body.user_id);
    if(user){
        user.password = req.body.password;
        await user.save();
        return res.redirect('/');
    }else{
        return res.redirect('/');
    }

}





module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error in loging out!');
        }
        return res.redirect('/');
    })
}