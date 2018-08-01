var axios = require("axios");

var createInstance = (baseURL, headers) =>
  axios.create({
    baseURL,
    headers
  });

module.exports = createInstance;
