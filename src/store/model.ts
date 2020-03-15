export type CountryList = Map<string, number>;

export interface VpnModel {
  isLogin: boolean;
  isConnected: boolean;
  connecting: false;
  countryList: CountryList | undefined;
  currentCountry: string;
}

export type TrafficObject = {
  receive: number;
  transmit: number;
};
