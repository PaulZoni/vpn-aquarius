import {useContext} from 'react';
import {
  NavigationContext,
  NavigationRoute,
  NavigationScreenProp,
} from 'react-navigation';

export function useNavigation<Params>() {
  return useContext(NavigationContext) as NavigationScreenProp<
    NavigationRoute,
    Params
  >;
}
