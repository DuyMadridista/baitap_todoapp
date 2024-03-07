const router = require('express').Router();
const verifySignUp  = require('../middleware/authMiddleware');
const authController = require('../auth/auth');
router.post('/login', authController.login);
router.post('/logout',verifySignUp.verifyToken, authController.logout);
router.post('/refesh', authController.refeshToken);
router.post('/register',verifySignUp.checkDuplicateEmail, authController.register);
module.exports = router;
