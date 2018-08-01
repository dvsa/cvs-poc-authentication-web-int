var express = require("express");
var router = express.Router();
var config = require("../config");
var createHttpClient = require("../utils/httpClient");
var axios = require("axios");
var AWS = require("aws-sdk");
var signRequest = require("../utils/signedRequest");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  var isAuthorised = false;
  var idToken;
  if (req.cookies[config.cookies.auth]) {
    isLoggedIn = true;

    const requestConfig = {
      method: "GET",
      path: config.api.sites,
      host: config.api.host
    };

    const signedRequest = signRequest.get(requestConfig);

    const httpClient = createHttpClient(config.api.url, signedRequest.headers);

    try {
      const result = await httpClient.get(config.api.sites);
      sites = result.data;
      res.render("sites", {
        title: "Sites",
        sites: sites,
        isAuthorised: true
      });
    } catch (error) {
      this.error = error;

      res.render("sites", {
        title: "Sites",
        isAuthorised: isAuthorised,
        error: error
      });
    }
  }
});

module.exports = router;
