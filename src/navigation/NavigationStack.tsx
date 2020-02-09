import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {MainViewController, CountriesViewController} from '../pages';

const RootNavigationStack = createStackNavigator(
  {
    Main: MainViewController,
    Countries: CountriesViewController,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: 'modal',
    //cardStyle: { opacity: 1 },
    transparentCard: true,
  },
);

export default createAppContainer(RootNavigationStack);
