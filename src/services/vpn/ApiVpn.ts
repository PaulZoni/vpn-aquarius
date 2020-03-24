import {NativeModules} from 'react-native';

export const vpnAndroid = NativeModules.VPNModule;

export interface VPN {
  startVpn: () => Promise<string>;
  startVpnWithCountry: (country: string) => Promise<string>;
  restartVpnWithNewCountry: (country: string) => Promise<string>;
  stopVpn: () => Promise<string>;
  getCountries: () => Promise<Object>;
}

export const Vpn: VPN = {
  startVpn: vpnAndroid.startVpn,
  startVpnWithCountry: vpnAndroid.startVpnWithCountry,
  restartVpnWithNewCountry: vpnAndroid.restartVpnWithNewCountry,
  stopVpn: vpnAndroid.stopVpn,
  getCountries: vpnAndroid.getCountries,
};
