import {createAction, createAsyncAction} from 'typesafe-actions';
import {CountryList} from '../model';
// <Record<string, VpnModel>>
export const vpnAction = createAction('vpn/login_REQUEST')();

export const vpnActionSelectCountry = createAction(
  'vpn/select_country_REQUEST',
)<string>();

export const vpnActionTurnOffIndicator = createAction('vpn/TurnOffIndicator')();

export const vpnActionTurnOnIndicator = createAction('vpn/TurnOnIndicator')();

export const vpnActionConnect = createAsyncAction(
  'vpn/connect_REQUEST',
  'vpn/connect_SUCCESS',
  'vpn/connect_FAILURE',
)<undefined, undefined, undefined>();

export const vpnActionConnectWithCountry = createAsyncAction(
  'vpn/connectWithCountry_REQUEST',
  'vpn/connectWithCountry_SUCCESS',
  'vpn/connectWithCountry_FAILURE',
)<undefined, undefined, undefined>();

export const vpnActionRestartWithCountry = createAsyncAction(
  'vpn/restartWithCountry_REQUEST',
  'vpn/restartWithCountry_SUCCESS',
  'vpn/restartWithCountry_FAILURE',
)<undefined, undefined, undefined>();

export const vpnActionStop = createAsyncAction(
  'vpn/stop_REQUEST',
  'vpn/stop_SUCCESS',
  'vpn/stop_FAILURE',
)<undefined, undefined>();

export const vpnActionGetCountries = createAsyncAction(
  'vpn/GetCountries_REQUEST',
  'vpn/GetCountries_SUCCESS',
  'vpn/GetCountries_FAILURE',
)<undefined, CountryList, undefined>();

export const Actions = {
  vpnAction: vpnAction,
  vpnActionConnect: vpnActionConnect.request,
  vpnActionConnectWithCountry: vpnActionConnectWithCountry.request,
  vpnActionStop: vpnActionStop.request,
  vpnActionSelectCountry,
  vpnActionGetCountries: vpnActionGetCountries.request,
  vpnActionRestartWithCountry: vpnActionRestartWithCountry.request,
  vpnActionTurnOnIndicator,
  vpnActionTurnOffIndicator,
};

export type Action =
  | typeof vpnAction
  | typeof vpnActionConnect
  | typeof vpnActionStop
  | typeof vpnActionGetCountries
  | typeof vpnActionConnectWithCountry
  | typeof vpnActionRestartWithCountry
  | typeof vpnActionTurnOffIndicator
  | typeof vpnActionTurnOnIndicator
  | typeof vpnActionSelectCountry;
