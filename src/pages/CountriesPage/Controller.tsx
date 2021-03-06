import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import View from './View';
import {useDispatch} from 'react-redux';
import {Actions} from '../../store/vpn/action';
import {
  useCurrentCountry,
  useCountryList,
  useIsConnectedFlag,
} from '../../store/selectors';
import {useNavigation} from '../../navigation';

const Controller = () => {
  const countryList = useCountryList();
  const isVpnConnected = useIsConnectedFlag();
  const [countryNameList, setCountryNameList] = useState<string[] | undefined>(
    undefined,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentCountry = useCurrentCountry();
  const selectCountry = (countryName: string) => {
    navigation.goBack();
    dispatch(Actions.vpnActionSelectCountry(countryName));
    if (isVpnConnected) dispatch(Actions.vpnActionRestartWithCountry());
    else dispatch(Actions.vpnActionConnectWithCountry());
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    dispatch(Actions.vpnActionGetCountries());
  }, []);

  useEffect(() => {
    if (countryList) {
      setCountryNameList(Array.from(countryList.keys()));
    }
  }, [countryList]);

  return (
    <View
      countryList={countryNameList}
      onClickListener={selectCountry}
      currentCountry={currentCountry}
    />
  );
};

export default Controller;
