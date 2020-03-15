import {createReducer} from 'typesafe-actions';
import {vpnInitialState} from './state';
import {
  vpnAction,
  vpnActionConnect,
  vpnActionGetCountries,
  vpnActionSelectCountry,
  vpnActionStop,
} from './action';
import {VpnModel} from '../model';

export const vpnReducer = createReducer(vpnInitialState)
  .handleAction(vpnAction, (state: VpnModel) => {
    return {
      ...state,
      isLogin: true,
    };
  })
  .handleAction(vpnActionConnect.request, (state: VpnModel) => ({
    ...state,
    connecting: true,
  }))
  .handleAction(vpnActionConnect.success, (state: VpnModel) => ({
    ...state,
    isConnected: true,
    connecting: false,
  }))
  .handleAction(vpnActionSelectCountry, (state: VpnModel, action) => ({
    ...state,
    currentCountry: action.payload,
  }))
  .handleAction(vpnActionStop.success, (state: VpnModel, action) => ({
    ...state,
    isConnected: false,
    connecting: false,
  }))
  .handleAction(vpnActionStop.request, (state: VpnModel, action) => ({
    ...state,
    connecting: true,
  }))
  .handleAction(
    vpnActionGetCountries.success,
    (state: VpnModel, action): VpnModel => ({
      ...state,
      countryList: action.payload,
    }),
  );
