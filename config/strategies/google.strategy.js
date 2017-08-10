const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/userModel');
const googleSecret = require('../secrets/google_client_secret.json');

function passportGoogle() {
  passport.use(new GoogleStrategy(
    {
      clientID: googleSecret.web.client_id,
      clientSecret: googleSecret.web.client_secret,
      callbackURL: googleSecret.web.redirect_uris[0],
    },
    (req, accessToken, refreshToken, profile, done) => {
      const query = {
        'google.id': profile.id,
      };
      User.findOne(query, (error, user) => {
        if (user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          const newUser = new User();
          newUser.email = profile.emails[0].value;
          newUser.image = profile._json.image.url;
          newUser.displayName = profile.displayName;

          newUser.google = {};
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;

          newUser.save();
          done(null, newUser);
        }
      });
    }
  ));
}

module.exports = passportGoogle;
