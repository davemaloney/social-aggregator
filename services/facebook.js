const Oauth = require('oauth').OAuth2;
const clientSecrets = require('../config/secrets/client_secrets.json');

function Facebook() {
  const oauth = new Oauth(
    clientSecrets.facebook.app_id,
    clientSecrets.facebook.app_secret,
    'https://graph.facebook.com',
    null,
    'oauth2/token',
    null
  );

  function getImage(userKey, done) {
    oauth.get(
      'https://graph.facebook.com/v2.10/me/picture?redirect=false&type=large',
      userKey,
      (err, results) => {
        results = JSON.parse(results);
        done(results.data.url);
      }
    );
  }

  return {
    getImage,
  };
}

module.exports = Facebook;
