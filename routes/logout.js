var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.clearCookie(config.cookies.auth);
    res.clearCookie(config.cookies.refresh);
    res.redirect(`${config.auth.cognitoUrl}/logout?client_id=${config.auth.clientId}&logout_uri=${encodeURIComponent(config.auth.logoutUri)}`);
});

module.exports = router;
