import {NativeModules} from 'react-native';

export const vpnAndroid = NativeModules.VPNModule;

export interface VPN {
  startVpn: (response: string, error: string) => void;
  stopVpn: (response: string, error: string) => void;
}

export const Vpn: VPN = {
  startVpn: vpnAndroid.startVpn,
  stopVpn: vpnAndroid.stopVpn,
};
