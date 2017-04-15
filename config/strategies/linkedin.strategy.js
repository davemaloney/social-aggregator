const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const linkedinSecret = require('../secrets/linkedin_client_secret.json');

function passportLinkedIn() {
  passport.use(new LinkedInStrategy(
    {
      clientID: linkedinSecret.client_id,
      clientSecret: linkedinSecret.client_secret,
      callbackURL: linkedinSecret.callback_url,
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      var user = {};
      user.displayName = profile.displayName;
      // user.image = profile._json.pictureUrl;

      user.linkedin = {};
      user.linkedin.id = profile.id;
      user.linkedin.token = accessToken;

      done(null, user);
    }
  ));
}

module.exports = passportLinkedIn;
