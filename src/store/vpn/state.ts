import {VpnModel} from '../model';

export enum DefaultState {
  CurrentCountry = '',
}

export const DefaultCountryList: Map<string, number> = new Map();
DefaultCountryList.set('in', 37);

export const vpnInitialState: VpnModel = {
  isLogin: false,
  isConnected: false,
  connecting: false,
  countryList: undefined,
  currentCountry: DefaultState.CurrentCountry,
};

export type State = typeof vpnInitialState;
