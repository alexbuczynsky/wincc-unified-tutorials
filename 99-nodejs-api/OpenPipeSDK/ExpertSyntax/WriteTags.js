'use strict';

const readline = require('readline');

console.log('Start client');

var net = require('net');

const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

let client = net.connect(PIPE_PATH, function() {
    console.log('Client: on connection');
    var tagWriteCommand = `{"Message":"WriteTag","Params":{"Tags":[{"Name":"Tag_0","Value":"50"},{"Name":"Tag_1","Value":"40"}]},"ClientCookie":"CookieReadTags123"}\n`;
    client.write(tagWriteCommand);
    const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        let obj = JSON.parse(line);
        if (obj.Message == 'NotifyWriteTag') {
            printOnSuccess(obj.Params.Tags)
        }
        if (obj.Message == 'ErrorWriteTag') {
            printError(obj)
        }
    });
});

client.on('end', function() {
    console.log('on end');
});

function printError(data) {
    let message = data.Message;
    let errorCode = data.ErrorCode;
    let errorDescription = data.ErrorDescription;
    let clientCookie = data.ClientCookie;
    console.log("\nMessage:" + message + "\nClientCookie: " + clientCookie + "\n Error: " + errorCode + "\n Description: " + errorDescription);
}

function printOnSuccess(data) {
    for (var i = 0; i < data.length; i++) {
        let name = data[i].Name;
        let errorCode = data[i].ErrorCode;
        let errorDescription = data[i].ErrorDescription;
        console.log("\name: " + name + "\n Error: " + errorCode + "\n Description: " + errorDescription);
    }
}