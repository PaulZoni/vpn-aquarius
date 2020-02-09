import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import View from './View';
import {useDispatch} from 'react-redux';
import {Actions} from '../../store/vpn/action';
import {useCurrentCountry} from '../../store/selectors';
import {useNavigation} from '../../navigation';

const fakeCountry = [...Array(20)].map((_, index, __) => `country: ${index}`);

const Controller = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentCountry = useCurrentCountry();
  const selectCountry = (countryName: string) => {
    navigation.goBack();
    dispatch(Actions.vpnActionSelectCountry(countryName));
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <View
      countryList={fakeCountry}
      onClickListener={selectCountry}
      currentCountry={currentCountry}
    />
  );
};

export default Controller;
