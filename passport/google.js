'use strict'

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const User = require('../models/user')

passport.use(new GoogleStrategy({
    consumerKey: '',
    consumerSecret: '',
    callbackURL: ''
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({}, function (err, user) {
        return done(err, user);
      });
  }
));