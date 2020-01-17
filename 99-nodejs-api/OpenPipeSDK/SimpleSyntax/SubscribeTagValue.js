'use strict';

console.log('Start client');

var net = require('net');

const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";
function StopSubscription()
{
	 client.write('UnsubscribeTagValue Tag_1\n');
	 console.log('Subscribtion Stopped');
}
let client = net.connect(PIPE_PATH, function () {
    console.log('Client: on connection');
    
    client.write('SubscribeTagValue Tag_1\n');
	setTimeout(StopSubscription, 5000);	 
});

client.on('data', function (data) {
    let strdata = data.toString();
    var tokens = strdata.split(/[\s,]+/);
    var cmd = tokens.shift();
    if ('NotifySubscribeTagValue' == cmd){
        var tagName = tokens.shift();
        var quality = tokens.shift();
        var value=tokens.shift();
        console.log("\ntagName: " + tagName + "\ntagValue: " + value + "\nQuality: " + quality);
       }
       if('ErrorNotifyTagValue'==cmd){   
            console.log(strdata);
       }
       if('ErrorSubscribeTagValue'==cmd){

        console.log(strdata);
       }
       if('NotifyUnsubscribeTagValue'==cmd){
        var tagName = tokens.shift();
          console.log("\ncommand:"+cmd+"\ntagName:"+tagName);
       }
       if('ErrorUnsubscribeTagValue'==cmd){
        console.log(strdata);
       }
});

client.on('end', function () {
    console.log('on end');
});

client.on('error', function (err) {
    console.log('connection error: ' + err);
});
