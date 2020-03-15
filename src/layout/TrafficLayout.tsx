import React from 'react';
import styled from 'styled-components';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  transmit: number;
  receive: number;
}

export default ({receive, transmit}: Props) => (
  <Container>
    <TitleView>
      <TitleText>Speed</TitleText>
    </TitleView>
    <TrafficView>
      <TrafficContainer>
        <ImageLeft color="#1db0e4" name="angle-double-down" size={30} />
        <MDPS>{receive}</MDPS>
        <MDPSText>mbps</MDPSText>
      </TrafficContainer>
      <SeparateLine />
      <TrafficContainer>
        <ImageLeft color="#6350e8" name="angle-double-up" size={30} />
        <MDPS>{transmit}</MDPS>
        <MDPSText>mbps</MDPSText>
      </TrafficContainer>
    </TrafficView>
  </Container>
);

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const TitleText = styled(Text)`
  color: gray;
  font-weight: bold;
`;

const TrafficView = styled(View)`
  flex-direction: row;
  flex: 0.6;
`;

const TitleView = styled(View)`
  flex: 0.4;
  align-items: center;
  justify-content: center;
`;

const TrafficContainer = styled(View)`
  flex: 1;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
`;

const ImageLeft = styled(Icon)`
  width: 30px;
  height: 30px;
`;

const MDPS = styled(Text)`
  font-weight: bold;
  font-size: 20px;
`;

const MDPSText = styled(Text)`
  font-weight: bold;
  font-size: 15px;
  color: gray;
`;

const SeparateLine = styled(View)`
  width: 2px;
  height: 100%;
  background-color: lightgray;
`;
