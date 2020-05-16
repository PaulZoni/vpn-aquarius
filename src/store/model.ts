export type CountryList = Map<string, number>;

export interface VpnModel {
  isLogin: boolean;
  isConnected: boolean;
  connecting: boolean;
  countryList: CountryList | undefined;
  currentCountry: string;
}

export type TrafficObject = {
  receive: number;
  transmit: number;
};

export type VPNStateObject = {
  vpnState: VPNState;
};

export enum VPNState {
  CONNECTED = 'CONNECTED',
  IDLE = 'IDLE',
  PAUSED = 'PAUSED',
}
