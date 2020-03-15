import {RootState} from './types';
import {useSelector} from 'react-redux';
import {DefaultState} from './vpn/state';

const currentCountrySelector = (state: RootState) =>
  state.vpn ? state.vpn.currentCountry : DefaultState.CurrentCountry;

export const useCurrentCountry = () =>
  useSelector(currentCountrySelector) || DefaultState.CurrentCountry;

const isConnected = (state: RootState) => state.vpn && state.vpn.isConnected;

export const useIsConnectedFlag = () => useSelector(isConnected) || false;

const isConnecting = (state: RootState) => state.vpn && state.vpn.connecting;

export const useIsConnectingFlag = () => useSelector(isConnecting) || false;

const countryList = (state: RootState) => state.vpn && state.vpn.countryList;

export const useCountryList = () => useSelector(countryList) || undefined;
