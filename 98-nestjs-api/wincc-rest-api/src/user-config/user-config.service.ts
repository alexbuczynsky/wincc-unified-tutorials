import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IUserConfig } from './user-config.interface';

import { merge } from 'lodash';
import { generateDefaultUserConfig } from './user-config.default';

@Injectable()
export class UserConfigService {

  public ReadConfigFile(username: string): Promise<IUserConfig> {

    return new Promise((resolve, reject) => {
      fs.readFile(`./${username}.config.json`, (error, buff) => {
        if (error) {
          return reject(error);
        }
        const text = buff.toString();
        const data = JSON.parse(text);
        return resolve(data);
      });
    });
  }

  public SaveConfigFile(username: string, config: IUserConfig): Promise<void> {

    return new Promise((resolve, reject) => {
      fs.writeFile(`./${username}.config.json`, JSON.stringify(config, null, 4), (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    });
  }

  public async ReadConfig(username: string): Promise<IUserConfig> {
    let config;
    try {
      config = await this.ReadConfigFile(username);
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        // file does not exist, save for the first time
        config = generateDefaultUserConfig(username);
        await this.SaveConfigFile(username, config);
      } else {
        throw err;
      }
    }

    return config;
  }

  public async UpdateConfig(username, newConfig: Partial<IUserConfig>) {
    const currentConfig = await this.ReadConfig(username);
    const mergedConfig = merge(newConfig, currentConfig);

    await this.SaveConfigFile(username, mergedConfig);
    return mergedConfig;
  }
}
