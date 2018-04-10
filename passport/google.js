'use strict'

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const User = require('../models/user')

passport.use(new GoogleStrategy({
    consumerKey: '732141743441-p62jet1h000i0c6c6hr0puese5hqgh4n.apps.googleusercontent.com',
    consumerSecret: '2uk_uPfVFkNSk4U-KDOcD1LQ',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ 
        id: profile.id,
        name: profile.displayName,
        photo: profile.photos[0].value,
        email: profile.emails[0].value,
    }, 
    function (err, user) {
        return done(err, user)
    })
}
))