var Q = require("q");
var request = require('request');
var config = require('../config.json');
var moment = require('moment');


var webRequest = {
    get : function(dto){
        var deferred = Q.defer();

        var url = "https://" + config.libratoUsername + ":" + config.libratoPassword + "@metrics-api.librato.com/v1/metrics/" + dto.metric + "?resolution=3600&start_time=" + dto.startTime + "&end_time=" + dto.endTime;
        request({ url : url },
            function (error, response, body) {
                if(response.statusCode == 200){
                    var obj = JSON.parse(body);
                    var result = {};

                    result.metric = dto.metric;

                    if (typeof obj.measurements.siberalemapi != "undefined") {
                        var m = obj.measurements.siberalemapi[1];

                        result.delta = m.delta;
                        result.startTime = dto.startTime;
                        result.endTime = dto.endTime;
                        result.time = moment.unix(m.measure_time).format("dddd, MMMM Do YYYY, h:mm:ss a");
                    } else {
                        result.delta = null;
                        result.time = null;
                    }
                    deferred.resolve(result);
                }
                else{
                    deferred.reject(error);
                }
            }
        );

        return deferred.promise;
    }

}


module.exports = webRequest;
