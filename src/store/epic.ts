import { combineEpics } from 'redux-observable';
import { startVpn, connectVpn } from './vpn/epic';

export default combineEpics(startVpn, connectVpn);
