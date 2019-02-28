var config = require('../config.js');
const request = require('request');

var slack = {
    send: function (message, notify, color) {
        var params = {
            text: message
        };

        request.post(config.slackWebHookURL, {
            json: params
        }, function(error, response, body){});
    }
}

module.exports = slack;
