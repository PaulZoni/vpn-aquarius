import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MainView from './View';
import {useNavigation} from '../../navigation';
import {useCurrentCountry} from '../../store/selectors';

const Controller = () => {
  const navigation = useNavigation();
  const currentCountry = useCurrentCountry();
  const clickOnCountryList = () => {
    navigation.navigate('Countries');
  };
  return (
    <MainView
      currentCountry={currentCountry}
      clickOnCountryList={clickOnCountryList}
    />
  );
};

export default Controller;
