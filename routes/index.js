var express = require("express");
var router = express.Router();
var config = require("../config");
var jwt = require("../services/jwt.service");
var authService = require("../services/auth.service");

/* GET home page. */
router.get("/", async function (req, res, next) {
  // handle code returned to index url
  if (req.query.code) {
    var code = req.query.code;
    logError = req.query.error_description;
    status = code ? "logging in" : "";

    authService
      .requestAccessToken(code)
      .then(async token => {
        res.cookie(
          config.cookies.auth,
          { accessToken: token.access_token, idToken: token.id_token },
          { maxAge: token.expires_in * 1000, httpOnly: true }
        );
        res.cookie(
          config.cookies.refresh,
          { refreshToken: token.refresh_token },
          { maxAge: 2592000000, httpOnly: true }
        );
        try {
          await authService.retrieveCredentials(token.id_token);
        } catch (error) {
          console.log(error);
          res.render("index", {
            error: error
          });
        }

        res.redirect("/");
      })
      .catch(error => {
        console.log(error);
        res.render("index", {
          error: error
        });
      });
  } else {
    // Would also implement strategies to handle use of refresh token to get another auth token. But these are out
    // of scope for this PoC.
    var isLoggedIn = false;
    var accessToken, accessTokenInfo, idToken, idTokenInfo;

    if (req.cookies[config.cookies.auth]) {
      isLoggedIn = true;
      accessToken = req.cookies[config.cookies.auth].accessToken;
      idToken = req.cookies[config.cookies.auth].idToken;

      // Validate JWT tokens.
      var getAccessTokenInfoPromise = jwt.validateJWTToken(accessToken);
      var getIdTokenInfoPromise = jwt.validateJWTToken(idToken);

      try {
        const [accessTokenInfo, idTokenInfo] = [
          await getAccessTokenInfoPromise,
          await getIdTokenInfoPromise
        ];

        res.render("index", {
          title: "Authentication PoC - Web - Internal",
          isLoggedIn,
          accessToken,
          accessTokenInfo,
          idToken,
          idTokenInfo
        });
      } catch (error) {
        res.render("index", {
          error
        });
      }
    } else {
      res.render("index", {
        title: "Authentication PoC - Web - Internal",
        isLoggedIn,
        accessToken,
        accessTokenValidity: accessTokenInfo,
        idToken,
        idTokenValidity: idTokenInfo
      });
    }
  }
});

module.exports = router;
