import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  onClick: (countryName: string) => void;
  isSelected: boolean;
}

const Country = ({text, onClick, isSelected}: Props) => (
  <Container
    color={isSelected ? 'beige' : 'white'}
    onPress={() => onClick(text)}>
    <CountryName>{text}</CountryName>
  </Container>
);

const Container = styled(TouchableOpacity as new () => TouchableOpacity)<{
  color: string;
}>`
  width: 100%;
  height: 54px;
  background-color: ${props => props.color};
  padding-left: 32px;
`;

const CountryName = styled(Text)`
  font-weight: 400;
  font-size: 22px;
  color: rgba(1, 1, 1, 0.7);
`;

export default Country;
