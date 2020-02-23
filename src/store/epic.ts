import { combineEpics } from 'redux-observable';
import { stopVpn, connectVpn } from './vpn/epic';

export default combineEpics(stopVpn, connectVpn);
