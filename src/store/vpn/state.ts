import {VpnModel} from '../model';

export enum DefaultState {
  CurrentCountry = 'DefaultCountry',
}

export const vpnInitialState: VpnModel = {
  isLogin: false,
  isConnected: false,
  connecting: false,
  countryList: [],
  currentCountry: DefaultState.CurrentCountry,
};

export type State = typeof vpnInitialState;
