import { RuntimeCallback } from './RuntimeCallbackQue';

export class CallbackEntry {

  public readonly createdAt = Date.now();

  constructor(public readonly cb: RuntimeCallback, public readonly timeout = 500) { }

  public get expiresAt() {
    return this.createdAt + this.timeout;
  }

  public get hasExpired() {
    return Date.now() > this.expiresAt;
  }
}
