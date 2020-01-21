type WidgetTypes = 'BreakerStatus';

export interface IWidgetConfig {
  type: WidgetTypes;
  meta: {
    id?: number;
  };
}

export interface IDashboardConfig {
  widgets: IWidgetConfig[];
}

export interface IUserConfig {
  username: string;
  dashboard: IDashboardConfig;
}
