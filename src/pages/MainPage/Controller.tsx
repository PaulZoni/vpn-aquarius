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

const Controller = () => {
  const navigation = useNavigation();
  const currentCountry = useCurrentCountry();
  const isConnected = useIsConnectedFlag();
  const connecting = useIsConnectingFlag();
  const [indicatorIsActive, setIndicatorIsActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const clickOnCountryList = () => {
    navigation.navigate('Countries');
  };

  useEffect(() => {
    if (connecting) {
      setInterval(() => {
        setIndicatorIsActive(indicator => !indicator);
      }, 500);
    } else {
      setIndicatorIsActive(isConnected);
    }
  }, [connecting, isConnected]);

  const onPressStartButton = () => {
    if (isConnected) {
      dispatch(Actions.vpnActionStop());
    } else {
      dispatch(Actions.vpnActionConnect());
    }
  };

  return (
    <MainView
      indicatorIsActive={indicatorIsActive}
      isConnected={isConnected}
      onPressStartButton={onPressStartButton}
      currentCountry={currentCountry}
      clickOnCountryList={clickOnCountryList}
    />
  );
};

export default Controller;
