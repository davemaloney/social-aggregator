const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../../models/userModel');
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
      const query = {
        'linkedin.id': profile.id,
      };
      User.findOne(query, (error, user) => {
        if (user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          const newUser = new User();
          newUser.displayName = profile.displayName;
          // newUser.image = profile._json.pictureUrl;

          newUser.linkedin = {};
          newUser.linkedin.id = profile.id;
          newUser.linkedin.token = accessToken;

          newUser.save();
          done(null, newUser);
        }
      });
    }
  ));
}

module.exports = passportLinkedIn;
