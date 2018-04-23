import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import config from '../config';
import { Root } from "native-base";

import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base';
import { Title, Picker, Form, Item as FormItem } from "native-base";
import { ActionSheet } from "native-base";
import navigation, { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';
import Swipeable from 'react-native-swipeable';

import AlarmList from './AlarmListScreen';
import Gallery from './GalleryScreen';
import Info from './InfoScreen';
import Profile from './ProfileScreen';

const Item = Picker.Item;
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {index: 0}

    this.switchScreen = this.switchScreen.bind(this);
  }
  //Switch
  switchScreen(index) {
      this.setState({index: index})
   }

  render() {
    let AppComponent = AlarmList;
    console.log("AlarmList",this.props);
    if (this.state.index == 0) {
         AppComponent = AlarmList
      } else if (this.state.index == 1) {
         AppComponent = Gallery
      } else if (this.state.index == 2) {
         AppComponent = Profile
      } else{
        AppComponent = Info
      }

    return (
    <Container style={styles.container}>
    <AppComponent mainProps = {this.props}/>
    <Footer>
        <FooterTab>
          <Button vertical active={this.state.index === 0} onPress={() => this.switchScreen(0)}>
            <Icon active name="alarm" />
            <Text>Alarm</Text>
          </Button>
          <Button vertical active={this.state.index === 1} onPress={() => this.switchScreen(1)}>
            <Icon name="apps" />
            <Text>Gallery</Text>
          </Button>
          <Button vertical active={this.state.index === 2} onPress={() => this.switchScreen(2)}>
            <Icon name="person" />
            <Text>Profile</Text>
          </Button>
          <Button vertical active={this.state.index === 3} onPress={() => this.switchScreen(3)}>
            <Icon name="md-alert" />
            <Text>Info</Text>
          </Button>
        </FooterTab>
      </Footer>

  </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default MainScreen;
