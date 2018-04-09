'use strict'

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user')


passport.use(new FacebookStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    profileFields: ['id', 'displayName', 'photos', 'email']
},
function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({}, function (err, user) {
        return done(err, user)
    });
}
));