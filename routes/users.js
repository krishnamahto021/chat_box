const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('../config/passport-local-strategy');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);

router.get('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-up' }), userController.createSession);
router.get('/profile',userController.userProfile);

router.get('/destroy-session',userController.destroySession);
module.exports = router;