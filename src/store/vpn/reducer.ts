import {createReducer} from 'typesafe-actions';
import {vpnInitialState} from './state';
import {
  vpnAction,
  vpnActionConnect,
  vpnActionGetCountries,
  vpnActionSelectCountry,
  vpnActionStop,
  vpnActionConnectWithCountry,
  vpnActionRestartWithCountry,
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
  )
  .handleAction(
    vpnActionConnectWithCountry.request,
    (state: VpnModel): VpnModel => ({
      ...state,
      connecting: true,
    }),
  )
  .handleAction(
    vpnActionConnectWithCountry.success,
    (state: VpnModel): VpnModel => ({
      ...state,
      isConnected: true,
      connecting: false,
    }),
  )
  .handleAction(
    vpnActionRestartWithCountry.request,
    (state: VpnModel): VpnModel => ({
      ...state,
      connecting: true,
      isConnected: false,
    }),
  )
  .handleAction(
    vpnActionRestartWithCountry.success,
    (state: VpnModel): VpnModel => ({
      ...state,
      isConnected: true,
      connecting: false,
    }),
  );
