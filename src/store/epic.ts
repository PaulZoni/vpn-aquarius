import {combineEpics} from 'redux-observable';
import {
  stopVpn,
  connectVpn,
  getCountries,
  connectVpnWithCountry,
  restartVpnWithCountry,
} from './vpn/epic';

export default combineEpics(
  stopVpn,
  connectVpn,
  getCountries,
  connectVpnWithCountry,
  restartVpnWithCountry,
);
