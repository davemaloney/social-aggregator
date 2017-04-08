const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleSecret = require('../secrets/google_client_secret.json');

function passportGoogle() {
  passport.use(new GoogleStrategy(
    {
      clientID: googleSecret.web.client_id,
      clientSecret: googleSecret.web.client_secret,
      callbackURL: googleSecret.web.redirect_uris[0]
    },
    (req, accessToken, refreshToken, profile, done) => {
      const user = {};
      user.email = profile.emails[0].value;
      user.image = profile._json.image.url;
      user.displayName = profile.displayName;

      user.google = {};
      user.google.id = profile.id;
      user.google.token = accessToken;

      done(null, user);
    }
  ));
}

module.exports = passportGoogle;
