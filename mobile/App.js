import Expo from 'expo';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import navigation, { StackNavigator } from 'react-navigation';

import { withAuth } from './Auth';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import AlarmList from './screens/AlarmListScreen';
import Gallery from './screens/GalleryScreen';
import GalleryDeck from './screens/GalleryDeckScreen';
import Info from './screens/InfoScreen';
import Profile from './screens/ProfileScreen';
import AlarmAdd from './screens/AlarmAdd';
import AlarmEdit from './screens/AlarmEdit';


const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
       header: null
    },
  },


  MainScreen:{
    screen: MainScreen,
    navigationOptions: {
      headerTitle: 'HellAlarm',
      headerLeft:null,
    },
  },

  AlarmList:{
    screen: AlarmList,
    navigationOptions: {
      headerTitle: 'Alarm',
      headerLeft:null,
    },
  },

  Gallery:{
    screen: Gallery,
    navigationOptions: {
      headerTitle: 'Gallery',
    },
  },

  GalleryDeck:{
    screen: GalleryDeck,
    navigationOptions: {
      headerTitle: 'Gallery Deck',
    },
  },

  Info:{
    screen: Info,
    navigationOptions: {
      headerTitle: 'Info',
    },
  },

  Profile:{
    screen: Profile,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },

  AlarmAdd: {
    screen: AlarmAdd,
    navigationOptions: {
      headerTitle: 'Add Alarm',
    },
  },

  AlarmEdit: {
    screen: AlarmEdit,
    navigationOptions: {
      headerTitle: 'Edit Alarm',
    },
  }

});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    // screenProps is one way to pass props to a navigator
    // https://reactnavigation.org/docs/navigators/navigation-options#Two-Ways-to-specify-each-option
    return <RootNavigator screenProps={this.props} />
  }

}

Expo.registerRootComponent(withAuth(App));
