import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import config from '../config';
import { Root } from "native-base";

import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base';
import { Title, Picker, Form, Item as FormItem } from "native-base";
import navigation, { StackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
// import {WheelPicker, DatePicker, TimePicker} from 'react-native-wheel-picker-android'



const Item = Picker.Item;


class AlarmEdit extends React.Component {

  constructor(props) {
    super(props);

    console.log('params',this.props.navigation.state.params.selectedAlarm);

    this.state = {
      id: this.props.navigation.state.params.selectedAlarm.id,
      text: 'Alarm',
      status: this.props.navigation.state.params.selectedAlarm.status,
      hour: this.props.navigation.state.params.selectedAlarm.time[0],
      minute: this.props.navigation.state.params.selectedAlarm.time[1],
      repeat: this.props.navigation.state.params.selectedAlarm.repeat,
      visibleModal: null,
    };

    this._onStateChange = this._onStateChange.bind(this);
    this._editAlarm = this._editAlarm.bind(this);
  }

  _onStateChange(newState) {
    this.setState(newState);
  }

  _editAlarm() {
    //TODO: update the collections
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log("I am repeat",this.state.repeat);
    let myRequest = new Request(`${config.API_BASE}/api/db/updateAlarm`, {
      method: 'POST',
      // this header sends the user token from auth0
      headers: myHeaders,
      body: JSON.stringify({
        name: this.props.navigation.state.params.parentProps.profile,
        id: this.state.id,
        hour: this.state.hour,
        minute: this.state.minute,
        repeat: this.state.repeat,
        status: this.state.status,
        label: this.state.text
      })
    });

    fetch(myRequest)
      .then(response => response.json())
      .then(()=>{
        console.log("I have edited the alarm!!!!!!!!!!!!!!")
        this.props.navigation.navigate('MainScreen');
      })
      .catch(error => {
        console.error(error);
      });
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button1}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );


  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Label</Text>
      <TextInput
      style={{ width: 130, height: 50}}
      onChangeText={(text) => this.setState({text})}
      value={this.state.text}
    />

      <View style={{flexDirection: 'row'}}>
        <View style = {{width: 170, height: 50}}>
          {this._renderButton('Save', () => this.setState({ visibleModal: null }))}
        </View>
        <View style = {{width: 170, height: 50}}>
          {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
      </View>
    </View>
  );

  render() {
    return (
    <Container style={styles.container}>
    <Image
      style={styles.bg}
    source={ require( './background/alarmadd.png') }
    />
      <List>
      <ListItem icon>
        <Left>
          <Icon name="md-clock" />
        </Left>
        <Body>
          <Text>Alarm</Text>
        </Body>
        <Right >
            <Picker
              style={{ width: 100 }}
              selectedValue={this.state.hour}
              onValueChange={(selectedValue) => this._onStateChange({hour: selectedValue})}
            >
              <Item label="01" value="01" />
              <Item label="02" value="02" />
              <Item label="03" value="03" />
              <Item label="04" value="04" />
              <Item label="05" value="05" />
              <Item label="06" value="06" />
              <Item label="07" value="07" />
              <Item label="08" value="08" />
              <Item label="09" value="09" />
              <Item label="10" value="10" />
              <Item label="11" value="11" />
              <Item label="12" value="12" />
              <Item label="13" value="13" />
              <Item label="14" value="14" />
              <Item label="15" value="15" />
              <Item label="16" value="16" />
              <Item label="17" value="17" />
              <Item label="18" value="18" />
              <Item label="19" value="19" />
              <Item label="20" value="20" />
              <Item label="21" value="21" />
              <Item label="22" value="22" />
              <Item label="23" value="23" />

            </Picker>
            <Text> : </Text>
            <Picker
              style={{ width: 100 }}
              selectedValue={this.state.minute}
              onValueChange={(selectedValue) => this._onStateChange({minute: selectedValue})}
              itemStyle={{height:5,width:10}}
            >
            <Item label = "00" value = "00" />
            <Item label="01" value="01" />
            <Item label="02" value="02" />
            <Item label="03" value="03" />
            <Item label="04" value="04" />
            <Item label = "05" value = "05" />
            <Item label="06" value="06" />
            <Item label="07" value="07" />
            <Item label="08" value="08" />
            <Item label="09" value="09" />
            <Item label = "10" value = "10" />
            <Item label="11" value="11" />
            <Item label="12" value="12" />
            <Item label="13" value="13" />
            <Item label="14" value="14" />
            <Item label = "15" value = "15" />
            <Item label="16" value="16" />
            <Item label="17" value="17" />
            <Item label="18" value="18" />
            <Item label="19" value="19" />
            <Item label = "20" value = "20" />
            <Item label="21" value="21" />
            <Item label="22" value="22" />
            <Item label="23" value="23" />
            <Item label="24" value="24" />
            <Item label = "25" value = "25" />
            <Item label="26" value="26" />
            <Item label="27" value="27" />
            <Item label="28" value="28" />
            <Item label="29" value="29" />
              <Item label = "30" value = "30" />
              <Item label="31" value="31" />
              <Item label="32" value="32" />
              <Item label="33" value="33" />
              <Item label="34" value="34" />
              <Item label = "35" value = "35" />
              <Item label="36" value="36" />
              <Item label="37" value="37" />
              <Item label="38" value="38" />
              <Item label="39" value="39" />
              <Item label = "40" value = "40" />
              <Item label="41" value="41" />
              <Item label="42" value="42" />
              <Item label="43" value="43" />
              <Item label="44" value="44" />
              <Item label = "45" value = "45" />
              <Item label="46" value="46" />
              <Item label="47" value="47" />
              <Item label="48" value="48" />
              <Item label="49" value="49" />
              <Item label="50" value="50" />
              <Item label="51" value="51" />
              <Item label="52" value="52" />
              <Item label="53" value="53" />
              <Item label="54" value="54" />
              <Item label="55" value="55" />
              <Item label="56" value="56" />
              <Item label="57" value="57" />
              <Item label="58" value="58" />
              <Item label="59" value="59" />
            </Picker>

      </Right>
      </ListItem>
        <ListItem icon>
          <Left>
            <Icon name="md-list-box" />
          </Left>
          <Body>
            <Text>Note</Text>
          </Body>
          <Right>
                <TouchableNativeFeedback
                    onPress={() => this.setState({ visibleModal: 1 })}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                <Text>{this.state.text}</Text>
                </TouchableNativeFeedback>
              <Modal isVisible={this.state.visibleModal === 1}>
                {this._renderModalContent()}
              </Modal>
          </Right>
        </ListItem>

        <ListItem icon>
          <Left>
            <Icon name="md-repeat" />
          </Left>
          <Body>
            <Text>Repeat</Text>
          </Body>
          <Right >
              <Picker
                style={{ width: 110 }}
                selectedValue={this.state.repeat}
                onValueChange={(selectedValue) => this._onStateChange({repeat: selectedValue})}
              >
                <Item label="Never" value="Never" />
                <Item label="Daily" value="Daily" />
                <Item label="Weekly" value="Weekly" />
              </Picker>
        </Right>
        </ListItem>
      </List>

      <Button bordered dark rounded
      style={styles.button}
        onPress={this._editAlarm}
      >
        <Text>Done</Text>
      </Button>

      <Content />
  </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
  },

  rightButton:{
    flex: 1,
    backgroundColor: '#fff',
    // textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  black: {
    // flex: 1,
    color: 'rgb(0,0,0)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    padding: 12,
    marginTop:30,
    marginLeft: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button1: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin:15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bg: {
    width: 300,
    height: 300,
    marginLeft: 35,
    marginTop: 5,
  },
})

// export default ClockSetting;

export default AlarmEdit;
