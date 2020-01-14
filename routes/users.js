var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller')

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next(); 
    }else {
        res.redirect('/');     
    }    
};
router.get('/register', userController.userCreationPage);
router.post('/registerUser',userController.userCreate)
router.post('/userLogin',userController.userProfile);
router.get('/profile',sessionChecker,userController.userProfile);
router.get('/logout', userController.userLogout);
module.exports = router;
