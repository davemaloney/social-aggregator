const OAuth = require('OAuth').OAuth2;
const clientSecrets = require('../config/secrets/client_secrets.json');

var Facebook = function() {
  const oauth = new OAuth(
    clientSecrets.facebook.app_id,
    clientSecrets.facebook.app_secret,
    'https://graph.facebook.com',
    null,
    'oauth2/token',
    null
  );

  var getImage = function(userKey, done) {
    oauth.get(
      'https://graph.facebook.com/v2.10/me/picture?redirect=false&type=large',
      userKey,
      function(err, results, res) {
        results = JSON.parse(results);
        done(results.data.url)
      }
    )
  }

  return {
    getImage: getImage,
  }
}

module.exports = Facebook;
