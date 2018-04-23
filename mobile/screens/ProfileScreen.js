import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image
} from 'react-native';

import config from '../config';
import { Root } from "native-base";

import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button, Thumbnail } from 'native-base';
import { Title, Picker, Form, Item as FormItem } from "native-base";
import { ActionSheet } from "native-base";
import navigation, { StackNavigator } from 'react-navigation';
// import home from './HomeScreen';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const logout = this.props.mainProps.screenProps.logout;
    const name = this.props.mainProps.screenProps.profile.given_name;
    return (
      <Container>
      <Header>
        <Body>
        <Title>Profile</Title>
        </Body>
      </Header>
      <Content>
      <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Image style={{width: 200, height: 200, marginTop:30}}
      source={{uri:this.props.mainProps.screenProps.profile.picture}}/>
      <Text>{name}</Text>
      <Button
      style = {styles.button}
      onPress={() => {
        logout();
        this.props.mainProps.navigation.navigate('Home');
      }}>
            <Text>Log Out</Text>
      </Button>
      </View>
      </Content>
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
  button:{
    flex: 1,
    marginLeft: 140,
    marginTop:35,
  }
})

export default ProfileScreen
