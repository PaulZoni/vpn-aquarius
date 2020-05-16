import {
  View,
  Text,
  Animated,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Country} from '../../components';

const styles = StyleSheet.create({
  countryLustContainer: {paddingBottom: 60},
});

interface Props {
  onClickListener: (countryName: string) => void;
  currentCountry: string;
  countryList: string[] | undefined;
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

  const renderItem = ({item}: {item: string}) => (
    <Country
      isSelected={isSelected(item)}
      onClick={onClickListener}
      text={item}
      key={item}
    />
  );

  const renderList = () => {
    if (countryList && countryList.length === 0) {
      return (
        <EmptyContainer>
          <EmptyCountry>No Country</EmptyCountry>
        </EmptyContainer>
      );
    } else {
      return (
        <CountryLust
          contentContainerStyle={styles.countryLustContainer}
          keyExtractor={(item: string, _: number) => item}
          data={countryList}
          renderItem={renderItem}
        />
      );
    }
  };

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
        {countryList ? (
          renderList()
        ) : (
          <EmptyContainer>
            <ActivityIndicator size="large" color="#1db0e4" />
          </EmptyContainer>
        )}
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

const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

const EmptyCountry = styled(Text)`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
`;

export default CountriesView;
