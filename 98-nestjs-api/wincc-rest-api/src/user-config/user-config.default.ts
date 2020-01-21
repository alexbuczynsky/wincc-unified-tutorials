import { IUserConfig } from './user-config.interface';

export function generateDefaultUserConfig(username: string): IUserConfig {
  return {
    username,
    dashboard: {
      widgets: [
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
        {
          type: 'BreakerStatus',
          meta: {
            id: 0,
          },
        },
      ],
    },
  };
}
