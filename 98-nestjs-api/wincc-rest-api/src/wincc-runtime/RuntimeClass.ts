import * as net from 'net';
import * as readline from 'readline';
import { Observable, Subject, fromEvent, interval, queueScheduler } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { DelayQueue } from 'rx-queue';
import * as uuid from 'uuid/v4';
import { RuntimeCallbackQue, RuntimeCallback } from './RuntimeCallbackQue';
import * as os from 'os';
import { EXIT_CODES } from 'src/exit-codes';

function get_pipe_name() {
  if (os.platform() === 'win32') {
    return '\\\\.\\pipe\\HmiRuntime';
  } else {
    return os.tmpdir() + '/HmiRuntime';
  }
}

const MAX_REQUESTS_PER_SECOND = 20;

const QUEUE_DELAY_VALUE = Math.ceil(1000 / MAX_REQUESTS_PER_SECOND);

export class RuntimeClass {

  static SOCKET_ADDRESS = get_pipe_name();

  private socket: net.Socket;
  private rl: readline.Interface;

  private que = new RuntimeCallbackQue();

  public readonly onLineData: Observable<string>;
  public readonly onSocketEnd: Observable<string>;
  public readonly onSocketError: Observable<Error>;
  public readonly onSocketTimeout: Observable<string>;
  public readonly onSocketConnect: Observable<string>;

  public readonly onSuccess = new Subject<WinCC.OpenPipe.SuccessResponse>();
  public readonly onError = new Subject<WinCC.OpenPipe.ErrorResponse>();

  private readonly writeLineQueue = new DelayQueue<string>(50);

  public allowReconnect: boolean = true;

  constructor(private readonly path = RuntimeClass.SOCKET_ADDRESS) {
    this.socket = net.connect(path);
    this.rl = readline.createInterface({
      input: this.socket,
      crlfDelay: Infinity,
    });
    this.onLineData = fromEvent(this.rl, 'line');
    this.onLineData.subscribe(this.onDataHandler.bind(this));

    this.onSocketEnd = fromEvent(this.socket, 'end');
    this.onSocketError = fromEvent(this.socket, 'error');
    this.onSocketTimeout = fromEvent(this.socket, 'timeout');

    this.onSocketConnect = fromEvent(this.socket, 'connect');
    this.onSocketEnd.subscribe(() => this.reconnect());
    this.onSocketError.pipe(
      throttle(event => interval(1000)),
    ).subscribe((err) => {
      console.log(err);

      if (err.message.includes('has been ended by the other party')) {
        console.log('WINCC RUN TIME RESTARTED... EXITING WITH CODE ' + EXIT_CODES.WINCC_BANNED_ME);
        process.exit(EXIT_CODES.WINCC_BANNED_ME);
      }
    });

    this.onSocketTimeout.subscribe(() => this.reconnect());

    this.onSocketConnect.subscribe(() => console.log('=====>>>>> CONNECTED'));
    this.onSocketEnd.subscribe(() => console.log('=====>>>>> END'));
    this.onSocketError.subscribe(console.log);

    this.writeLineQueue.subscribe((line) => this.socket.write(line));
  }

  private reconnect() {
    if (this.allowReconnect) {
      console.log('Attempting to Reconnect...');
      try {
        // this.socket.end();
        // this.socket.connect(this.path);
      } catch (err) {
        console.error(err);
      }
    }
  }

  private onDataHandler(line: string) {
    const body: WinCC.OpenPipe.Response = JSON.parse(line);
    this.process(body);
  }

  private generateCookie() {
    return uuid();
  }

  private sendMsg(msg: WinCC.OpenPipe.Request, cb?: RuntimeCallback) {
    if (cb) {
      this.que.add(cb, msg.ClientCookie);
    }
    this.writeLineQueue.next(JSON.stringify(msg) + '\n');
  }

  public SubscribeTag(tags: string[], cb?: RuntimeCallback, cookie = this.generateCookie()) {
    this.sendMsg({
      Message: 'SubscribeTag',
      ClientCookie: cookie,
      Params: {
        Tags: tags,
      },
    }, cb);
  }

  public ReadTag(tags: string[], cb?: RuntimeCallback, cookie = this.generateCookie()) {
    this.sendMsg({
      Message: 'ReadTag',
      Params: {
        Tags: tags,
      },
      ClientCookie: cookie,
    }, cb);
  }

  public WriteTag(tags: WinCC.OpenPipe.Actions.WriteTag['Request']['Params']['Tags'], cb?: RuntimeCallback, cookie = this.generateCookie()) {
    this.sendMsg({
      Message: 'WriteTag',
      Params: {
        Tags: tags,
      },
      ClientCookie: cookie,
    }, cb);
  }

  public UnsubscribeTag(cb?: RuntimeCallback, cookie = this.generateCookie()) {
    this.sendMsg({
      Message: 'UnsubscribeTag',
      ClientCookie: cookie,
    }, cb);
  }

  public SubscribeAlarm(
    systemNames: string[] = [], filter: string = '', language: WinCC.Language = 1033, cb?: RuntimeCallback, cookie = this.generateCookie(),
  ) {
    this.sendMsg({
      Message: 'SubscribeAlarm',
      Params: {
        SystemNames: systemNames,
        Filter: filter,
        LanguageId: language,
      },
      ClientCookie: cookie,
    }, cb);
  }

  public UnsubscribeAlarm(cb?: RuntimeCallback, cookie = this.generateCookie()) {
    this.sendMsg({
      Message: 'UnsubscribeAlarm',
      ClientCookie: cookie,
    }, cb);
  }

  public ReadAlarm(
    systemNames: string[] = [], filter: string = '', language: WinCC.Language = 1033, cb?: RuntimeCallback, cookie = this.generateCookie(),
  ) {
    this.sendMsg({
      Message: 'ReadAlarm',
      Params: {
        SystemNames: systemNames,
        Filter: filter,
        LanguageId: language,
      },
      ClientCookie: cookie,
    }, cb);
  }

  private process(res: WinCC.OpenPipe.Response) {

    const cookie = res.ClientCookie;

    const request = this.que.get(cookie);

    if (!request) {
      return;
    } else {
      // remove callback entry from que
      this.que.delete(cookie);
    }

    const cb = request.cb;

    switch (res.Message) {
      case 'NotifySubscribeTag':
      case 'NotifyUnsubscribeTag':
      case 'NotifyReadTag':
      case 'NotifyWriteTag':
      case 'NotifySubscribeAlarm':
      case 'NotifyUnsubscribeAlarm':
      case 'NotifyReadAlarm':
        cb(null, res);
        break;
      case 'ErrorWriteTag':
      case 'ErrorSubscribeAlarm':
      case 'ErrorReadAlarm':
      case 'ErrorSubscribeTag':
      case 'ErrorUnsubscribeTag':
      case 'ErrorReadTag':
      case 'ErrorUnsubscribeAlarm':
        const err = new Error(res.ErrorDescription);
        cb(err);
        break;
    }
  }
}
