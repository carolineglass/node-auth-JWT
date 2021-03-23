const { Router } = require('express');
const authController = require('../controllers/authController');

//create new instance of a Router from express
const router = Router();

//methods on the auth router 
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;