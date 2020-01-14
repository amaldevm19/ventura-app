const express = require('express');
var session = require('express-session');
const Users = require('../model/users.model');
const db = require('../config/db.config');

exports.userCreate = function (req, res,next) {
    let isAdmin = false;
    if(req.body.pin == 9898){
        isAdmin = true;
    }
    let user = new Users(
        {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName.toUpperCase(),
            isAdmin:isAdmin,
        }
    );
    user.save(function (err) {
        if (err) {
            return next(err);
        }
    req.session.user = user;
    req.session.login = true;
    res.render('./user/userprofile',{data:user, userProfile:true});
    })
};

exports.userProfile = function (req,res){  
    if(!req.session.login){
        Users.findOne({email:req.body.email},(err,user)=>{
            if(err){throw err}
            if(user){
                user.comparePassword(req.body.password,function (err,isMatch){
                    if(err) throw err; 
                    if(isMatch){
                        req.session.user = user;

                        req.session.login = true;
                        res.render('./user/userprofile',{data:user, userProfile:true});
                    }else {
                        req.session = null;
                        res.redirect('/');
                    }
                })
            }else{
                res.redirect('/');
            }
        });
    }else{
        Users.findOne({email:req.session.user.email},(err,user)=>{
            if(err){throw err}
            res.render('./user/userprofile',{data:user, userProfile:true});
        });
    }
    
}

exports.userCreationPage = function(req,res){
    res.render('./user/register',{layout:'loginLayout.handlebars'});
}

exports.userLogout = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/');
    }
  }