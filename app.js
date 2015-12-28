var CronJob = require('cron').CronJob;
var metric = require('./lib/metric');
var metrics = require('./metrics.json');

function Do(){
  for(var i = 0; i < metrics.length; i++){
    metric.check(metrics[i]);
  }
}

new CronJob('* * */1 * *', function () {
  Do();
}, null, true);
