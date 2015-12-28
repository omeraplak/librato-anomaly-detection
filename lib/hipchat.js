var hipchat = require('node-hipchat');
var config = require('./../config.json');
var HC = new hipchat(config.hipchatToken);

var hipchatHelper = {
    send:function(message, notify, color){

        var params = {
            room: config.hipchatRoomId,
            from: config.hipchatSenderName,
            message: message,
            color: color,
            notify: notify,
            message_format: "text"
        };

        HC.postMessage(params, function(data) {
        });
    }
}

module.exports = hipchatHelper;