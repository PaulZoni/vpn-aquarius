import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  onClick: (countryName: string) => void;
  isSelected: boolean;
}

const Country = ({text, onClick, isSelected}: Props) => (
  <>
    <Container
      color={isSelected ? 'beige' : 'white'}
      onPress={() => onClick(text)}>
      <CountryImage
        source={{uri: `https://www.countryflags.io/${text}/shiny/64.png`}}
      />
      <CountryName>{text}</CountryName>
    </Container>
    <SeparateLine />
  </>
);

const Container = styled(TouchableOpacity as new () => TouchableOpacity)<{
  color: string;
}>`
  flex-direction: row;
  width: 100%;
  height: 54px;
  background-color: ${props => props.color};
  padding-left: 32px;
  align-items: center;
`;

const CountryImage = styled(Image)`
  width: 50px;
  height: 40px;
`;

const CountryName = styled(Text)`
  font-weight: 400;
  font-size: 22px;
  color: rgba(1, 1, 1, 0.7);
  margin-left: 16px;
  justify-content: center;
`;

const SeparateLine = styled(View)`
  background-color: lightgray;
  width: 100%;
  height: 1px;
  margin-left: 30px;
`;

export default Country;
