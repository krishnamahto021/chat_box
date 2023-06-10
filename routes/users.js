const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('../config/passport-local-strategy');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);

router.get('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-up' }), userController.createSession);
router.get('/profile',userController.userProfile);

router.get('/forgotten-password',userController.showUpdatePasswordForm);
router.post('/forgotten-password',userController.updatePasswordDataCollect);
router.get('/reset-password/:token',userController.resetPassword);
router.post('/reset-password',userController.updatePassword);


router.get('/destroy-session',userController.destroySession);
module.exports = router;