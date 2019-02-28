[![NPM](https://nodei.co/npm/librato-anomaly-detection.png?compact=true)](https://npmjs.org/package/librato-anomaly-detection)

# Librato Anomaly Detection
Librato metrics Anomaly Detection - Proactive

## Requirements

* node.js
* npm

## Install

### For local installing

1. Clone or download this repository.
- `npm install`

### For global installing

1. `npm install -g librato-anomaly-detection`

## Usage

If you use this module as local, you need to modify this config with your config.

#### Sample Config

```javascript
{
    "libratoUsername" : "xxx%40xxx.com", //Librato username
    "libratoPassword" : "xxxx", //Librato api password
    "slackWebHookURL" : "xxxx", //slack webhook url
    "mean": 2,
    "alarmCount" : 2, //Alarm Count
    "upperMessageFormat" : "%s-%s aralığında %s ölçümü normal üst sınır olan %d değerinin % %d üzerinde %d olarak kaydedilmiştir.", //Slack alarm text
    "lowerMessageFormat" : "%s-%s aralığında %s ölçümü normal alt sınır olan %d değerinin % %d altında %d olarak kaydedilmiştir." //Slack alarm text
}
```

If you use this module as global, you can pass external config to this command via CLI.

`librato-anomaly-detection --config ./configFile.json`
