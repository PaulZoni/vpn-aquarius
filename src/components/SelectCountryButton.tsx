import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  currentCountry: string;
  onClick: () => void;
}

const SelectCountryButton = ({currentCountry, onClick}: Props) => (
  <Button onPress={onClick}>
    <FakeIcon
      source={{uri: `https://www.countryflags.io/${currentCountry}/shiny/64.png`}}
    />
    <CurrentCountry>{currentCountry}</CurrentCountry>
    <IconDown name="chevron-down" size={20} />
  </Button>
);

const Button = styled(TouchableOpacity)`
  display: flex;
  justify-content: space-between;
  align-self: center;
  flex-direction: row;
  width: 100%;
  height: 60px;
  border-radius: 32px;
  border: 3px rgba(43, 158, 231, 0.8);
  padding: 0 18px 0 18px;
`;

const CurrentCountry = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  align-self: center;
  color: rgba(1, 1, 1, 0.8);
`;

const FakeIcon = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: beige;
  align-self: center;
`;

const IconDown = styled(Icon)`
  align-self: center;
  color: rgba(1, 1, 1, 0.6);
`;

export default SelectCountryButton;
