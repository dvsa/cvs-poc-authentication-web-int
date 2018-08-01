# Authentication Proof of Concept - Web Internal
This PoC is to validate the authentication and authorisation solution for internal users accessing CVS resource via Azure AD Premium authentication.

## Getting Started
To get the projec working locally you'll need to install git secrets as this is used as a prepush check to mitigate the release of secrets into the public. For more information check the [Git Secrets Github Repo](https://github.com/awslabs/git-secrets).

Additionally, to use this PoC you need to add a `config.js` file to the root of the directory.  This file should be of the following format:

```javascript
const config = {
  auth: {
    clientId: "AWS Cognito Client ID",
    clientSecret: "AWS Cognito Client Secret",  
    cognitoUrl: "AWS Cognito User Pool URL", 
    region: "Region",
    identityProvider: "AWS Cognito Identity Provider - Links to Azure AD Application",
    userPoolId: "AWS Cognito User Pool Id",
    identityPoolId: "AWS Cognito Identity Pool Id",
    redirectUri: "Azure AD Redirect URI",
    logoutUri: "AWS Cognito Logout URI",
    responseType: "OAuth Response Type", 
    scope: "Required Authorization Scope",
    oAuthEndpoint: "oAuthEndpoint"
  },
  cookies: {
    auth: "cvs_auth_int",
    refresh: "cvs_refresh_ext"
  },
  jwt: {
    keysHost: "AWS Cognito Keys Host URI",
    keysPath: "AWS Cognito Keys Path (i.e. ends with jwks.json)"
  },
  api: {
    host: "Host for the test API (used to verify if the users role)",
    url: "URI for the test API",
    sites: "Sites resource of the test API"
  }
};

module.exports = config;

```

To run the application, use the command `npm start`