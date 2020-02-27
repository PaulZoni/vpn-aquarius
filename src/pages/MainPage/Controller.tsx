import React, {useEffect, useState} from 'react';
import MainView from './View';
import {useNavigation} from '../../navigation';
import {
  useCurrentCountry,
  useIsConnectedFlag,
  useIsConnectingFlag,
} from '../../store/selectors';
import {useDispatch} from 'react-redux';
import {Actions} from '../../store/vpn/action';
import {NativeModules} from 'react-native';

const vpnAndroid = NativeModules.VPNModule;

// @ts-ignore
const getCountries = async () => {
  const result = await vpnAndroid.getCountries();
  alert(JSON.stringify(result));
};

const Controller = () => {
  const navigation = useNavigation();
  const currentCountry = useCurrentCountry();
  const isConnected = useIsConnectedFlag();
  const connecting = useIsConnectingFlag();
  const [indicatorIsActive, setIndicatorIsActive] = useState<boolean>(false);
  const [timerId, setTimerId] = useState();
  const dispatch = useDispatch();
  const clickOnCountryList = () => {
    navigation.navigate('Countries');
  };

  useEffect(() => {
    setTimeout(() => {
      getCountries().then(() => alert('getCountries'));
      //vpnAndroid.getCountries();
    }, 3000);
  }, []);

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

  const onPressStartButton = () => {
    if (isConnected) {
      dispatch(Actions.vpnActionStop());
    } else {
      dispatch(Actions.vpnActionConnect());
      // todo жестокий костыль: не сробатывает с первого раза
      //  при первом старте
      setTimeout(() => dispatch(Actions.vpnActionConnect()), 2000);
    }
  };

  return (
    <MainView
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
