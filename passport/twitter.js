'use strict'


const passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user')


passport.use(new TwitterStrategy({
    consumerKey: '',
    consumerSecret: '',
    callbackURL: '',
    includeEmail: true
},
function (token, tokenSecret, profile, done) {
    User.findOrCreate({}, function (err, user) {
        return done(err, user)
    });
}
));