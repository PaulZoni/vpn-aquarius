import {createStore, applyMiddleware, DeepPartial} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
//import { State, StartState } from './reducer';
import {EpicMiddleware, RootState, RootReducer, Epic, Services} from './types';
import {CreateServices} from '../services';

export default ({
  reducer,
  state,
  epic,
  services,
}: {
  reducer: RootReducer;
  epic: Epic;
  state: DeepPartial<RootState>;
  services: Services;
}) => {
  const epicMiddleware: EpicMiddleware = createEpicMiddleware({
    dependencies: services,
  });
  const middleWares = [epicMiddleware];

  const store = createStore(reducer, state, applyMiddleware(...middleWares));

  epicMiddleware.run(epic);
  return store;
};
