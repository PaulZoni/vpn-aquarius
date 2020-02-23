import {NativeModules} from 'react-native';

export const vpnAndroid = NativeModules.VPNModule;

interface VPNCallback {
  call: (response: (res: string) => void, error: (err: string) => void) => void;
}

export interface VPN {
  startVpn: () => void;
  stopVpn: () => void;
}

export const Vpn: VPN = {
  startVpn: vpnAndroid.startVpn,
  stopVpn: vpnAndroid.stopVpn,
};
