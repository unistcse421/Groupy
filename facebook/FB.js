/**
 * Created by Taehyun on 2016-05-05.
 */

var
    request         = require('request'),
    url             = require('url'),
    queryString     = require('querystring'),
    FB              = require('fb'),
    config          = require('../config').fb;

FB.options(config);

request( url.format({
        protocol: "https:",
        host: "graph.facebook.com",
        pathname: "/oauth/access_token",
        method: "GET",
        query: {
            grant_type: "client_credentials",
            client_id: config.appId,
            client_secret: config.appSecret
        }
    }), function (err, header, body) {
        if (err) throw err;
        FB.setAccessToken(queryString.parse(body).access_token);
        console.log("Facebook: got Access Token");
    }
);

module.exports = FB;