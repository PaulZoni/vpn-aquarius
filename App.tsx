import React from 'react';
import {Provider} from 'react-redux';
import createStore from './src/store/createStore';
import createRootReducer from './src/store/reducer';
import {vpnInitialState} from './src/store/vpn/state';
import epic from './src/store/epic';
import NavigationStack from './src/navigation';
import {createServices} from './src/services';

const services = createServices({apiGatewayClient: {}, history: {}});
const App: React.FC = () => {
  const rootReducer = createRootReducer();
  const store = createStore({
    epic: epic,
    state: {vpn: vpnInitialState},
    services,
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <NavigationStack />
    </Provider>
  );
};

export default App;
