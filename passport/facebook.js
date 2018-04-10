'use strict'

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

let check = x => x === undefined ? 'empty' : x


passport.use(new FacebookStrategy({
    clientID: '1678146165603946',
    clientSecret: '04b740cb02fdb47236b2632d6f463fb6',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
},
function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        id: profile.id,
        name: profile.displayName,
        photo: 'https://graph.facebook.com/'+profile.id+'picture',
        email: check(profile._json.email),
    }, function (err, user) {
        return done(err, user)
    })
}
))


