import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {SelectCountryButton} from '../../components';

interface Props {
  clickOnCountryList: () => void;
  currentCountry: string;
}

const MainView = ({clickOnCountryList, currentCountry}: Props) => {
  StatusBar.setBarStyle('light-content');
  return (
    <RootContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HeaderContainer
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#A4D2FC', '#B9C8FA', '#C7BBFB']}>
        <Header
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={['#1db0e4', '#3f80e6', '#6350e8']}
        />
      </HeaderContainer>
      <BodyContainer>
        <SelectCountryButton
          currentCountry={currentCountry}
          onClick={clickOnCountryList}
        />
      </BodyContainer>
    </RootContainer>
  );
};

const RootContainer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const BodyContainer = styled(View)`
  height: 60%;
  width: 100%;
  padding: 0 28px 24px 28px;
  display: flex;
  justify-content: flex-end;
`;

const HeaderContainer = styled(LinearGradient)`
  height: 40%;
  width: 100%;
  border-bottom-right-radius: 200px;
  border-bottom-left-radius: 200px;
  transform: scaleX(1.5);
  background-color: aqua;
`;

const Header = styled(LinearGradient)`
  height: 90%;
  width: 100%;
  border-bottom-right-radius: 400px;
  border-bottom-left-radius: 400px;
  transform: scaleX(1);
  display: flex;
  justify-content: flex-end;
`;

export default MainView;
