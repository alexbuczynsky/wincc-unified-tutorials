import * as uuid from 'uuid/v4';
import { interval } from 'rxjs';
import { CallbackEntry } from './CallbackEntry';

export type RuntimeCallback = (err: Error | null, res?: WinCC.OpenPipe.SuccessResponse) => void;

export class RuntimeCallbackQue {

  constructor() {
    this.checkTimeoutTimer.subscribe(this.onCheckTimeout.bind(this));
  }

  private requests = new Map<WinCC.OpenPipe.Cookie, CallbackEntry>();

  private checkTimeoutTimer = interval(100);

  private generateCookie() {
    return uuid();
  }

  public add(cb: RuntimeCallback, cookie?: string, timeout?: number) {
    cookie = cookie || this.generateCookie();

    if (this.requests.has(cookie)) {
      cb(new Error('COOKIE_STILL_IN_TRANSPORT'));
      return;
    }

    return this.requests.set(cookie, new CallbackEntry(cb, timeout));
  }

  public get(cookie: WinCC.OpenPipe.Cookie) {
    return this.requests.get(cookie);
  }

  public delete(cookie: WinCC.OpenPipe.Cookie) {
    return this.requests.delete(cookie);
  }

  private onCheckTimeout() {
    for (const [cookie, request] of this.requests) {
      if (request.hasExpired) {
        request.cb(new Error('TIMEOUT'));
        this.delete(cookie);
      }
    }
  }

}
