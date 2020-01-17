'use strict';
const readline = require('readline');
console.log('Start client');

var net = require('net');

const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

function StopSubscription() {
    var Unsubscribecommand = `{"Message":"UnsubscribeTag","ClientCookie":"mySubscription1"}\n`;
    client.write(Unsubscribecommand);
    console.log('Subscription Stopped');
}
let client = net.connect(PIPE_PATH, function() {
    console.log('Client: on connection');

    var Subscribecommand = `{"Message":"SubscribeTag","Params":{"Tags":["Tag_0","Tag_1"]},"ClientCookie":"mySubscription1"}\n`;
    client.write(Subscribecommand);
    setTimeout(StopSubscription, 5000);

    const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {

        let obj = JSON.parse(line);

        if (obj.Message == 'NotifySubscribeTag') {
            printOnSuccess(obj.Params.Tags);
        }
        if (obj.Message == 'ErrorSubscribeTag') {
            printError(obj)
        }
        if (obj.Message == 'NotifyUnsubscribeTag') {
            printSuccess(obj);
        }
        if (obj.Message == 'ErrorUnsubscribeTag') {
            printOnError(obj);
        }
    });
});
client.on('end', function() {
    console.log('on end');
});

function printSuccess(data) {
    let clientCookie = data.ClientCookie;
    let message = data.Message;
    console.log("\nMessage:" + message + "\nclientCookie: " + clientCookie);
}

function printOnError(data) {
    let message = data.Message;
    let errorCode = data.ErrorCode;
    let errorDescription = data.ErrorDescription;
    let clientCookie = data.ClientCookie;

    console.log("\nMessage" + message + "\n Error: " + errorCode + "\n Description: " + errorDescription + "\nclientCookie: " + clientCookie);
}

function printOnSuccess(data) {
    for (var i = 0; i < data.length; i++) {

        let tagName = data[i].Name;
        let value = data[i].Value;
        let qualityCode = data[i].QualityCode;
        let quality = data[i].Quality;
        let timeStamp = data[i].TimeStamp;
        let errorCode = data[i].ErrorCode;
        let errorDescription = data[i].ErrorDescription;

        console.log("\ntagName: " + tagName + "\n tagValue: " + value + "\nQualityCode: " + qualityCode + "\nQuality: " + quality + "\ntimeStamp: " + timeStamp + "\n Error: " + errorCode + "\n Description: " + errorDescription);
    }
}

function printError(data) {
    let message = data.Message;
    let errorCode = data.ErrorCode;
    let errorDescription = data.ErrorDescription;
    let clientCookie = data.ClientCookie;

    console.log("\nMessage" + message + "\nclientCookie: " + clientCookie + "\n Error: " + errorCode + "\n Description: " + errorDescription);
}