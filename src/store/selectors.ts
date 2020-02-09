import {RootState} from './types';
import {useSelector} from 'react-redux';
import {DefaultState} from './vpn/state';

const loginSelector = (state: RootState) => state.vpn.isLogin;

const currentCountrySelector = (state: RootState) =>
  state.vpn ? state.vpn.currentCountry : DefaultState.CurrentCountry;

export const useCurrentCountry = () =>
  useSelector(currentCountrySelector) || DefaultState.CurrentCountry;
