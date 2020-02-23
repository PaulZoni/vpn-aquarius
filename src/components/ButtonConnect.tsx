import React from 'react';
import styled from 'styled-components';
import {Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;
const buttonSize = windowHeight / 6;

interface Props {
  onPress: () => void;
  isConnected: boolean;
}

// pause / play
const ButtonConnect = ({onPress, isConnected}: Props) => (
  <Container onPress={onPress}>
    {isConnected ? (
      <Icon name="pause" size={30} color="#4675E8" />
    ) : (
      <Icon name="play" size={30} color="#4675E8" />
    )}
  </Container>
);

const Container = styled(TouchableOpacity)`
  background-color: white;
  height: ${buttonSize}px;
  width: ${buttonSize}px;
  border-radius: 200px;
  justify-content: center;
  align-items: center;
  border: #cdd7e9 8px;
`;

export default ButtonConnect;
