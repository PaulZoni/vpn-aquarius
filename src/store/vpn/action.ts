import {createAction, createAsyncAction} from 'typesafe-actions';
// <Record<string, VpnModel>>
export const vpnAction = createAction('vpn/login_REQUEST')();
export const vpnActionSelectCountry = createAction(
  'vpn/select_country_REQUEST',
)<string>();

export const vpnActionConnect = createAsyncAction(
  'vpn/connect_REQUEST',
  'vpn/connect_SUCCESS',
  'vpn/connect_FAILURE',
)<undefined, undefined>();

export const Actions = {
  vpnAction: vpnAction,
  vpnActionConnect: vpnActionConnect.request,
  vpnActionSelectCountry,
};

export type Action =
  | typeof vpnAction
  | typeof vpnActionConnect
  | typeof vpnActionSelectCountry;
