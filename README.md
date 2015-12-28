# Librato Anomaly Detection
Librato metrics Anomaly Detection - Proactive

## Requirements

* node.js

## Install

* npm install

# Sample Config

```json
{
    "libratoUsername" : "xxx%40xxx.com", // librato username
    "libratoPassword" : "xxxx", //librato api password
    "hipchatToken" : "xxxx", //Hipchat Token
    "hipchatRoomId" : -1, // Hipchat Room Id
    "mean": 2,
    "alarmCount" : 2, // Alarm Count
    "hipchatSenderName" : "xxx", // Hipchat Sender Name
    "upperMessageFormat" : "%s-%s aralığında %s ölçümü normal üst sınır olan %d değerinin % %d üzerinde %d olarak kaydedilmiştir.", // Hipchat alarm text
    "lowerMessageFormat" : "%s-%s aralığında %s ölçümü normal alt sınır olan %d değerinin % %d altında %d olarak kaydedilmiştir." // Hipchat alarm text
}
```
