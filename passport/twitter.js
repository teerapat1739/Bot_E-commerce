'use strict'


const passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user')


passport.use(new TwitterStrategy({
    consumerKey: '5L8o0rqXvSLSXAVb43QBSVddy',
    consumerSecret: 'YuTnN22Gfd3yBFY9eUNd4El7l8vaeTFWdOYmIpan5wufc2StYI',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    includeEmail: true
},
function (token, tokenSecret, profile, done) {
    console.log(profile.profile_image_url)
    User.findOrCreate({
        id: profile.id,
        name: profile.displayName,
        // photo: profile.photos[0].value,
        // email: profile.emails[0].value
    }, function (err, user) {
        return done(err, user)
    })
}
))