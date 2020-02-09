import {View, Text, Animated, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Country} from '../../components';

interface Props {
  onClickListener: (countryName: string) => void;
  currentCountry: string;
  countryList: string[];
}

const CountriesView = ({
  onClickListener,
  currentCountry,
  countryList,
}: Props) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const isSelected = (country: string) => country === currentCountry;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
      }).start();
    };
  }, [fadeAnim]);

  return (
    <Container
      style={{
        backgroundColor: fadeAnim.interpolate({
          inputRange: [0, 0.8, 0.9, 1],
          outputRange: [
            'rgba(1, 1, 1, 0)',
            'rgba(1, 1, 1, 0.05)',
            'rgba(1, 1, 1, 0.2)',
            'rgba(1, 1, 1, 0.4)',
          ],
        }),
      }}>
      <Modal>
        <Header>
          <TextSelect>Choose country</TextSelect>
        </Header>
        <SeparateLane />
        <CountryLust
          keyExtractor={(item: string, _: number) => item}
          data={countryList}
          renderItem={({item}) => (
            <Country
              isSelected={isSelected(item)}
              onClick={onClickListener}
              text={item}
              key={item}
            />
          )}
        />
      </Modal>
    </Container>
  );
};

const Modal = styled(View)`
  width: 100%;
  height: 80%;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: white;
  overflow: hidden;
`;

const CountryLust = styled(FlatList as new () => FlatList<any>)`
  width: 100%;
  height: 100%;
  padding-top: 12px;
`;

const Header = styled(View)`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TextSelect = styled(Text)`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
`;

const SeparateLane = styled(View)`
  height: 2px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled(Animated.View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default CountriesView;
