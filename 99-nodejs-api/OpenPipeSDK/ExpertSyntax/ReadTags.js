'use strict';

const readline = require('readline');
console.log('Start client');
var net = require('net');
const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

let client = net.connect(PIPE_PATH, function() {
    console.log('Client: on connection');
    var tagReadCommand = `{"Message":"ReadTag","Params":{"Tags":["Tag_1","Tag_0"]},"ClientCookie":"myReadTagRequest1"}\n`;
    client.write(tagReadCommand);

    const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {

        let obj = JSON.parse(line);

        if (obj.Message == 'NotifyReadTag') {
            printOnSuccess(obj.Params.Tags);
        }
        if (obj.Message == 'ErrorReadTag') {
            printError(obj)
        }
    });

});
client.on('end', function() {
    console.log('on end');

});

function printOnSuccess(data) {
    for (var i = 0; i < data.length; i++) {

        let tagName = data[i].Name;
        let value = data[i].Value;
        let quality = data[i].Quality;
        let qualityCode = data[i].QualityCode;
        let timeStamp = data[i].TimeStamp;
        let errorCode = data[i].ErrorCode;
        let errorDescription = data[i].ErrorDescription;

        console.log("\ntagName: " + tagName + "\n tagValue: " + value + "\nQualityCode: " + qualityCode + "\nQualityCode: " + quality + "\ntimeStamp: " + timeStamp + "\n Error: " + errorCode + "\n Description: " + errorDescription);
    }
}

function printError(data) {
    let message = data.Message;
    let errorCode = data.ErrorCode;
    let errorDescription = data.ErrorDescription;
    let clientCookie = data.ClientCookie;

    console.log("\nMessage" + message + "\nClientCookie: " + clientCookie + "\n Error: " + errorCode + "\n Description: " + errorDescription);
}