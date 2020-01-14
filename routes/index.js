var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    res.render('login', {layout: 'loginLayout', data:req.session.user });
  }else{
    res.redirect('/users/profile')
  }
});


module.exports = router;
