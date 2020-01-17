const net = require('net');
const readline = require('readline');
const { EventEmitter } = require('events');

const SOCKET_ADDRESS = '\\\\.\\pipe\\HmiRuntime';

const TOPICS = {
  READ_TAG: 'ReadTagValue',
  WRITE_TAG: 'WriteTagValue',
}

function generateResponseTopics(topic) {
  return {
    error: `Error${topic}`,
    done: `Notify${topic}`,
  };
}

class WinCCUnifiedAPI extends EventEmitter {
  

  constructor() {
    super();
    this.client = net.connect(SOCKET_ADDRESS)
    this.rl = readline.createInterface({
      input: this.client,
      crlfDelay: Infinity
    });

    this.client.on('connect', () => this.emit('connect'))
    this.client.on('end', () => this.emit('end'))

    this.rl.on('line', this.rlOnData.bind(this))
  }

  write(msg){
    console.log(`SENDING: ${msg}`)
    this.client.write(`${msg}`);
  }

  async request(topic, payload, eol = ' \n'){
    const topics = generateResponseTopics(topic);

    this.write(`${topic} ${payload}${eol}`);

    return new Promise((resolve, reject) => {
      this.once(topics.done, resolve)
      this.once(topics.error, reject)
    })
  }

  rlOnData(line){
    const tokens = line.split(/[\s,]+/);
    const cmd = tokens.shift();

    console.log(`RECEIVED: ${line}`)
    this.emit(cmd, tokens)

    // switch(cmd){
    //     case 'NotifyReadTagValue':
    //         const tagName = tokens.shift();
    //         const quality = tokens.shift();
    //         const value = tokens.shift();
    //         console.log("\ntagName: " + tagName + "\ntagValue: " + value + "\nQuality: " + quality);
    //         break;
    //     case 'ErrorReadTagValue':
    //         console.log(line);
    //         break;
    //     default:
    //         console.log(cmd)
    // }
  }

  async ReadTagValue(tagName) {
    const [name, quality, value] = await this.request(TOPICS.READ_TAG, tagName)

    return {
      name,
      quality,
      value,
    }
  }

  async WriteTagValue(tagName, newValue) {
    const [name, quality, value] = await this.request(TOPICS.WRITE_TAG, `${tagName} ${newValue}`, '\n')

    return {
      name,
      quality,
      value,
    }
  }
  
}

exports.WinCCUnifiedAPI = WinCCUnifiedAPI;