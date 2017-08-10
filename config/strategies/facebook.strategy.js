const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/userModel');
const facebookSecret = require('../secrets/facebook_client_secret.json');

function passportFacebook() {
  passport.use(new FacebookStrategy(
    {
      clientID: facebookSecret.app_id,
      clientSecret: facebookSecret.app_secret,
      callbackURL: facebookSecret.callback_url,
      passReqToCallback: true,
      // in order to use this line, /node_modules/passport-facebook/lib/strategy.js
      //   must turn off this._convertProfileFields call in line 149
      // profileFields: ['id', 'email', 'name', 'picture{url}'],
      profileURL: 'https://graph.facebook.com/v2.8/me',
      authorizationURL: 'https://www.facebook.com/v2.8/dialog/oauth',
      tokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    },
    (req, accessToken, refreshToken, profile, done) => {
      const query = {
        'facebook.id': profile.id,
      };
      User.findOne(query, (error, user) => {
        if (user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          const newUser = new User();
          // newUser.email = profile.emails[0].value;
          // newUser.image = profile.photos[0].value;
          newUser.displayName = profile.displayName;

          newUser.facebook = {};
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;

          newUser.save();
          done(null, newUser);
        }
      });
    }
  ));
}

module.exports = passportFacebook;
