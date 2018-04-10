'use strict'
const router = require('express').Router()
const logger = require('../log')
const passport = require('passport')
const passportTwit = require('../passport/twitter')
const passportFb = require('../passport/facebook')
const passportGgl = require('../passport/google')
const User = require('../models/user')


router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log(req.user)
    }
    res.render('index')
})


router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

router.get('/logout', (req, res) => {
    
    if (req.isAuthenticated()) {
        User.update({_id: req.user._id}, {$set: {items: []}}).exec()
        req.logout()
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

// ====================TWITTER ROUTE
router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {successRedirect: '/single',
        failureRedirect: '/login'}))

// ====================FACEBOOK ROUTE
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/single',
        failureRedirect: '/login'}))

// ====================GOOGLE ROUTE
router.get('/auth/google', passport.authenticate('google', {scope: ['profile',
    'http://www.google.apis/com/auth/plus.profile.emails.red']}))
router.get('/auth/google/callback',
    passport.authenticate('google', {successRedirect: '/single',
        failureRedirect: '/login'}))






module.exports = router