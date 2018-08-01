var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/',
	function (req, res) {
		var url = config.auth.cognitoUrl + '/oauth2/authorize?identity_provider=' + config.auth.identityProvider + '&redirect_uri=' + encodeURIComponent(config.auth.redirectUri) + '&response_type=' + config.auth.responseType + '&client_id=' + config.auth.clientId + '&client_secret=' + config.auth.clientSecret + '&scope=' + config.auth.scope;
		console.log(url);
		res.redirect(url);
	}
)

module.exports = router;
