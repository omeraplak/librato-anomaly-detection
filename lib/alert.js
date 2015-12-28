var config = require('../config.js');

var alerts = {};

var alert = {
    check : function(dto){
        if(dto.alarm && alerts[dto.metricName] > config.alarmCount){
            delete alerts[dto.metricName];
            return true;
        }else if(dto.alarm){
            alerts[dto.metricName] = (alerts[dto.metricName] == undefined ? 0 : alerts[dto.metricName]) + 1 ;
            return false;
        }

        delete alerts[dto.metricName];
        return false;
    },
    alertsCheck : function(){

        return alerts;
    }
}


module.exports = alert;
