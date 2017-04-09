const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const facebookSecret = require('../secrets/facebook_client_secret.json');

function passportFacebook() {
  passport.use(new FacebookStrategy(
    {
      clientID: facebookSecret.app_id,
      clientSecret: facebookSecret.app_secret,
      callbackURL: facebookSecret.callback_url,
      passReqToCallback: true,
      profileURL: 'https://graph.facebook.com/v2.8/me',
      authorizationURL: 'https://www.facebook.com/v2.8/dialog/oauth',
      tokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token'
    },
    (req, accessToken, refreshToken, profile, done) => {
      var user = {};
      // user.email = profile.emails[0].value;
      // user.image = profile._json.profile_image_url;
      user.displayName = profile.displayName;

      user.facebook = {};
      user.facebook.id = profile.id;
      user.facebook.token = accessToken;

      done(null, user);
    }
  ));
}

module.exports = passportFacebook;
