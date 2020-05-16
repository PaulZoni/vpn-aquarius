import React, {useEffect, useState} from 'react';
import MainView from './View';
import {useNavigation} from '../../navigation';
import {
  useCurrentCountry,
  useIsConnectedFlag,
  useIsConnectingFlag,
} from '../../store/selectors';
import {useDispatch} from 'react-redux';
import {Actions, vpnActionTurnOnIndicator} from '../../store/vpn/action';
import {DeviceEventEmitter} from 'react-native';
import {TrafficObject, VPNState, VPNStateObject} from '../../store/model';
import {DefaultState} from '../../store/vpn/state';
import {Vpn} from '../../services/vpn/ApiVpn';

const Controller = () => {
  const navigation = useNavigation();
  const currentCountry = useCurrentCountry();
  const isConnected = useIsConnectedFlag();
  const connecting = useIsConnectingFlag();
  const [indicatorIsActive, setIndicatorIsActive] = useState<boolean>(false);
  const [trafficObject, setTrafficObject] = useState<TrafficObject>({
    receive: 0,
    transmit: 0,
  });

  const [timerId, setTimerId] = useState();
  const dispatch = useDispatch();
  const clickOnCountryList = () => {
    navigation.navigate('Countries');
  };

  useEffect(() => {
    if (connecting) {
      const id = setInterval(() => {
        setIndicatorIsActive(indicator => !indicator);
      }, 500);
      setTimerId(id);
    } else {
      clearInterval(timerId);
      setIndicatorIsActive(isConnected);
    }
  }, [connecting, isConnected]);

  useEffect(() => {
    DeviceEventEmitter.addListener('trafficEvent', trafficEventListener);
    DeviceEventEmitter.addListener('VpnStateListener', vpnStateListener);
    return () => {
      DeviceEventEmitter.removeAllListeners('trafficEvent');
      DeviceEventEmitter.removeListener('VpnStateListener', vpnStateListener);
    };
  }, []);

  useEffect(() => {
    Vpn.getVpnState().then(state => {
      //alert(state)
      if ((state === VPNState.CONNECTED || state === VPNState.PAUSED) && !isConnected) {
        //alert('CONNECTED');
        dispatch(Actions.vpnActionTurnOnIndicator());
      }

      if (state === VPNState.IDLE && isConnected) {
        alert('IDLE');
      }
    });
  }, []);

  const trafficEventListener = (event: TrafficObject) => {
    setTrafficObject(event);
  };

  const vpnStateListener = (state: VPNStateObject) => {};

  const onPressStartButton = () => {
    if (isConnected) {
      dispatch(Actions.vpnActionStop());
    } else {
      if (currentCountry === DefaultState.CurrentCountry) {
        dispatch(Actions.vpnActionConnect());
      } else {
        dispatch(Actions.vpnActionConnectWithCountry());
      }
    }
  };

  return (
    <MainView
      trafficObject={trafficObject}
      disabled={connecting}
      indicatorIsActive={indicatorIsActive}
      isConnected={isConnected}
      onPressStartButton={onPressStartButton}
      currentCountry={currentCountry}
      clickOnCountryList={clickOnCountryList}
    />
  );
};

export default Controller;
