var AWS = require("aws-sdk");
var aws4 = require("aws4");

const signRequest = {
  get: ({ method, path, host }) => {
    const {
      accessKeyId,
      secretAccessKey,
      sessionToken
    } = AWS.config.credentials;

    //configure request
    const request = {
      host,
      method,
      url: `https://${host}${path}`,
      path,
      headers: {
        "content-type": "application/json"
      }
    };

    // generate signed request
    const newSignedRequest = aws4.sign(request, {
      accessKeyId,
      secretAccessKey,
      sessionToken
    });

    delete newSignedRequest.headers["Host"];
    delete newSignedRequest.headers["Content-Length"];

    return newSignedRequest;
  }
};

module.exports = signRequest;
