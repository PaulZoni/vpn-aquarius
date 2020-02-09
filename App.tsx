import React from 'react';
// import {Text, StatusBar, View, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
// import styled from 'styled-components';
import createStore from './src/store/createStore';
import createRootReducer from './src/store/reducer';
import {vpnInitialState} from './src/store/vpn/state';
import epic from './src/store/epic';
// import {useDispatch, useSelector} from 'react-redux';
// import {loginSelector} from './src/store/selectors';
// import {VpnActions} from './src/store/index';
// import { createServices } from './src/services';
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
