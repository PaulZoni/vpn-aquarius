import {NativeModules} from 'react-native';

export const vpnAndroid = NativeModules.VPNModule;

export interface VPN {
  startVpn: () => Promise<string>;
  stopVpn: () => Promise<string>;
  getCountries: () => Promise<Object>;
}

export const Vpn: VPN = {
  startVpn: vpnAndroid.startVpn,
  stopVpn: vpnAndroid.stopVpn,
  getCountries: vpnAndroid.getCountries,
};
