import {StateType} from 'typesafe-actions';
import createRootReducer from './reducer';

export {Actions as VpnActions} from './vpn/action';

export type State = StateType<ReturnType<typeof createRootReducer>>;
