import { Injectable } from '@nestjs/common';
import { RuntimeClass } from './RuntimeClass';

@Injectable()
export class WinccRuntimeService {

  private readonly runtime = new RuntimeClass();

  public async ReadTag(tags: string[]): Promise<WinCC.OpenPipe.Actions.ReadTag['OnSuccess']> {

    return new Promise((resolve, reject) => {
      this.runtime.ReadTag(tags, (err, res) => {
        if (err) {
          return reject(err);
        }

        if (res && res.Message === 'NotifyReadTag') {
          return resolve(res);
        }
      });
    });
  }

}
