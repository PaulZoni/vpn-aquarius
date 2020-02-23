export interface VpnModel {
  isLogin: boolean;
  isConnected: boolean;
  connecting: false;
  countryList: string[];
  currentCountry: string;
}
