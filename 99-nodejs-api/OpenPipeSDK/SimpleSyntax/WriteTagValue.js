'use strict';

const net = require('net');
const readline = require('readline');

//open named pipe
let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {    
    const rl = readline.createInterface(
        {
            input: client,
            crlfDelay: Infinity
        });

        rl.on('line', function (line) {
            var tokens = line.split(/[\s,]+/);
            var cmd = tokens.shift();
            if('NotifyWriteTagValue'==cmd)
            {
                var tagName = tokens.shift();
                console.log("\ncommand:"+cmd+"\ntagName:"+tagName);
            }
            if('ErrorWriteTagValue'==cmd){
                console.log(line);
            }
    });
    client.on('end', function ()
     {
        console.log('on end');
    });
    
    client.write('WriteTagValue Tag_1 9\n');
  
});
