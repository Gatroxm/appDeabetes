export interface ConfigurationTopBar {
    menu?: IConfig;
    back?: IConfig;
    background?: IConfig;
    title: IConfig;
  }
  export interface IConfig {
    value?: string;
    visible?: boolean;
    link?: string;
    disable?: boolean;
    params?: any;
  }