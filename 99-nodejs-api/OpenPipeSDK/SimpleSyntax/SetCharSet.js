'use strict';

console.log('Start client');

var iconv = require('iconv-lite');

function Encode(command, encoding) {
    // Check if encoding is supported
    if (true === iconv.encodingExists(encoding)) {
        var encodedData = iconv.encode(command, encoding);
        return encodedData;
    }
}

var net = require('net');

const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

let client = net.connect(PIPE_PATH, function () {

    client.write('SetCharSet cp850\n');
    var command1 = 'ReadTagValue Tag_ß\n';
    client.write(Encode(command1, 'cp850'));
});


client.on('data', function (data) {
    var chunks = [];
    chunks.push(data);
    let strdata = iconv.decode(Buffer.concat(chunks), 'cp850');
    let str = strdata.toString();
    console.log('on data:\n', strdata.toString());
});

client.on('end', function () {
    console.log('on end');
});

client.on('error', function (err) {
    console.log('connection error: ' + err);
});
