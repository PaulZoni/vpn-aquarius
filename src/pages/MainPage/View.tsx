import React from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {SelectCountryButton, ButtonConnect} from '../../components';

const windowHeight = Dimensions.get('window').height;
const gradientArea = (windowHeight / 100) * 40;

interface Props {
  clickOnCountryList: () => void;
  currentCountry: string;
  onPressStartButton: () => void;
  isConnected: boolean;
  indicatorIsActive: boolean;
  disabled: boolean;
}

const MainView = ({
  clickOnCountryList,
  currentCountry,
  onPressStartButton,
  isConnected,
  indicatorIsActive,
  disabled,
}: Props) => {
  StatusBar.setBarStyle('light-content');
  return (
    <RootContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HeaderBody>
        <ContentBody>
          <TextVPN>VPN</TextVPN>
          <ButtonConnectWrapper>
            <ButtonConnect
              disabled={disabled}
              isConnected={isConnected}
              onPress={onPressStartButton}
            />
          </ButtonConnectWrapper>
          <ConnectIndicatorView>
            <Indicator isActive={indicatorIsActive} />
            <ConnectedText>Connected</ConnectedText>
          </ConnectIndicatorView>
        </ContentBody>
      </HeaderBody>
      <HeaderExternalGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#A4D2FC', '#B9C8FA', '#C7BBFB']}>
        <HeaderInnerGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={['#1db0e4', '#3f80e6', '#6350e8']}
        />
      </HeaderExternalGradient>
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

const HeaderExternalGradient = styled(LinearGradient)`
  height: ${gradientArea}px;
  width: 100%;
  border-bottom-right-radius: 200px;
  border-bottom-left-radius: 200px;
  transform: scaleX(1.5);
  background-color: aqua;
`;

const HeaderInnerGradient = styled(LinearGradient)`
  height: 90%;
  width: 100%;
  border-bottom-right-radius: 400px;
  border-bottom-left-radius: 400px;
  transform: scaleX(1);
  display: flex;
`;

const TextVPN = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const HeaderBody = styled(View)`
  width: 100%;
  height: ${gradientArea}px;
  position: absolute;
  top: 0;
  z-index: 999;
  justify-content: center;
  flex-direction: row;
`;

const ContentBody = styled(View)`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 22px;
`;

const ButtonConnectWrapper = styled(View)`
  margin-top: 22px;
`;

const ConnectedText = styled(Text)`
  font-size: 18px;
  font-weight: 400;
  color: white;
  margin-left: 3px;
  align-self: center;
`;

const ConnectIndicatorView = styled(View)`
  flex-direction: row;
  height: ${gradientArea / 6}px;
`;

const Indicator = styled(View)<{isActive: boolean}>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({isActive}) => (isActive ? '#6bf24e' : '#465443')};
  align-self: center;
  elevation: 6;
`;

export default MainView;
