'use strict'

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

let check = x => x === undefined ? 'empty' : x


passport.use(new FacebookStrategy({
    clientID: '2056309951257572',
    clientSecret: '407fa8a3b5aa1d2fe4fd1178bbeb8466',
    callbackURL: 'https://0516a333.ngrok.io/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
},
function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        id: profile.id,
        name: profile.displayName,
        photo: 'https://graph.facebook.com/'+profile.id+'/picture',
        email: check(profile._json.email),
    }, function (err, user) {
        return done(err, user)
    })
}
))





