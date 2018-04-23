import React from 'react';

import config from '../config';
import { Root } from "native-base";

import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button, Card, CardItem, } from 'native-base';
import { Title, Picker, Form, Item as FormItem } from "native-base";
import { ActionSheet } from "native-base";
import navigation, { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import BgAudio from 'react-native-background-audio'



class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Container>
      <Header>
      <Body>
      <Title>About</Title>
      </Body>
      </Header>
      <Content>
      <Text>A GreatFireWall Work</Text>
      <Text>Version: 0.0.1 </Text>
      <Card>
        <CardItem header>
          <Text>Step 1</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Set an alarm
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Text>Step 2</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Make sure it is active
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Text>Step 3</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              When the alarm ring...
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Text>Step 4</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Take the selfie
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Text>Step 5</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Cancel the Alarm By Selfie and Begin a brand new day!
            </Text>
          </Body>
        </CardItem>
      </Card>
      </Content>
      </Container>
    )
  }
}

// const audio_options = {
//   source:{local: require('./file1.mp3')}  //ex. require('./music/sample.mp3')
// }

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

export default InfoScreen
