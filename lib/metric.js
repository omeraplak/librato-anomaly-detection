var Q = require("q");
var _ = require('lodash');
var util = require('util');
var moment = require('moment');

var config = require('../config.json');
var times = require('../times.json');

var hipchat = require('./hipchat.js');
var webrequest = require('./webrequest.js');
var anomaly = require('./anomaly');
var alert = require('./alert');


var metric = {
    get: function (dto) {
        var deferred = Q.defer();

        var startTime, endTime;
        startTime = moment().subtract(times[dto.timeIndex].start, times[dto.timeIndex].subtractType);
        endTime = moment().subtract(times[dto.timeIndex].end, times[dto.timeIndex].subtractType);

        if (times[dto.timeIndex].diffHours) {
            startTime = startTime.subtract(times[dto.timeIndex].diffHours + 1, 'hours');
            endTime = endTime.subtract(times[dto.timeIndex].diffHours, 'hours');
        }

        var dto = {
            metric: dto.metricName,
            startTime: startTime.startOf('hour').unix(),
            endTime: endTime.startOf('hour').unix()
        };

        webrequest.get(dto).then(function(result){
            deferred.resolve(result);
        });

        return deferred.promise;
    },
    check : function(metricName){
        var calls = [];
        for(var i = 0; i < times.length; i++){
            calls.push(metric.makeTask(metricName, i));
        }
        Q.all(calls).then(function(results){

            var current = results[0];
            _.pullAt(results, 0)

            var startTime = moment.unix(current.startTime).format("HH:mm");
            var endTime = moment.unix(current.endTime).format("HH:mm");
            var trainSet =_.map(results , 'delta');

            var anomalyCalculator = anomaly.check({trainset : trainSet, testValue:current.delta});//isAnomaly(trainSet, current.delta);
            var notify = false;

            if(anomalyCalculator.result){
                var message = "";
                var color = "";

                if(current.delta > parseFloat(anomalyCalculator.upperBound.toFixed(2)) ){

                    var avarage = (((current.delta - anomalyCalculator.upperBound ) / anomalyCalculator.upperBound) * 100).toFixed(2);
                    color = "green";
                    message = util.format(config.upperMessageFormat,startTime,endTime, metricName,anomalyCalculator.upperBound.toFixed(2), avarage,current.delta)
                    alert.check({ metricName:metricName, alarm:false });
                    notify = false;

                }else{

                    var avarage = (((current.delta - anomalyCalculator.lowerBound ) / anomalyCalculator.lowerBound) * 100).toFixed(2);
                    color = "red";

                    message = util.format(config.lowerMessageFormat,startTime,endTime, metricName,anomalyCalculator.upperBound.toFixed(2), avarage,current.delta)
                    var alarmResult = alert.check({ metricName:metricName, alarm:true });
                    if(alarmResult){
                        message += " @all";
                        notify = true;
                    }
                }
                hipchat.send(message, notify, color)
            }else{
                alert.check({ metricName:metricName, alarm:false });
            }

        });
    },
    makeTask: function (metricName, i) {
        var deferred = Q.defer();
        metric.get({ metricName:metricName, timeIndex:i }).then(function(result){ deferred.resolve(result); });
        return deferred.promise;
    }
}

module.exports = metric;
