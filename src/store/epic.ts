import { combineEpics } from 'redux-observable';
import { stopVpn, connectVpn, getCountries } from './vpn/epic';

export default combineEpics(stopVpn, connectVpn, getCountries);
