import {combineReducers, DeepPartial} from 'redux';
import {vpnReducer} from './vpn/reducer';
import {VpnModel} from './model';

export type StateInput = DeepPartial<{vpn: VpnModel}>;
// export type StateInput = DeepPartial<CombinedState<{ vpn: VpnModel }>>

const createRootReducer = () =>
  combineReducers<StateInput>({
    vpn: vpnReducer,
  });

export default createRootReducer;
