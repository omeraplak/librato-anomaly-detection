var config = require('../config.json');
var gauss = require('gauss');


var anomaly = {
    check : function(dto){
        var set = new gauss.Vector(dto.trainset);
        var mean= set.mean();

        if(mean <= config.mean){
            return {
                result : false
            };
        }
        var stdev = set.stdev();

        var upperbound = mean + 3 * stdev;
        var lowerbound = mean - 3 * stdev;

        var result = false;
        if (dto.testvalue >= upperbound || dto.testvalue <= lowerbound){
            result = true;
        }

        return {
            result : result,
            upperBound:upperbound,
            lowerBound: lowerbound
        };
    }
}


module.exports = anomaly;
