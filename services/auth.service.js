var Promise = require("promise");
var queryString = require("querystring");
var base64 = require("base-64");
var createHttpClient = require("../utils/httpClient");
var config = require("../config");
var AWS = require("aws-sdk");

var authService = {
  retrieveCredentials: tokenId => {
    const authenticator = `cognito-idp.${config.auth.region}.amazonaws.com/${
      config.auth.userPoolId
    }`;

    AWS.config.update({ region: config.auth.region });

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.auth.identityPoolId,
      Logins: {
        [authenticator]: tokenId
      }
    });

    return AWS.config.credentials.getPromise();
  },
  requestAccessToken: code => {
    const secret = base64.encode(`${config.auth.clientId}:${config.auth.clientSecret}`);
    const defaults = {
      headers: {
        Authorisation: `Basic ${secret}`
      }
    };

    var httpClient = createHttpClient(config.auth.cognitoUrl, defaults);

    var promise = new Promise((resolve, reject) => {
      const payload = {
        grant_type: "authorization_code",
        client_id: config.auth.clientId,
        client_secret: config.auth.clientSecret,
        redirect_uri: config.auth.redirectUri,
        code
      };

      httpClient
        .post(config.auth.oAuthEndpoint, queryString.stringify(payload))
        .then(result => {
          resolve(result.data);
        });
    });

    return promise;
  }
};

module.exports = authService;
