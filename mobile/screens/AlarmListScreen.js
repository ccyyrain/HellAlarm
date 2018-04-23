import React from 'react';
import {
  ListView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  CameraRoll,
  Alert
} from 'react-native';
import config from '../config';
import { Root } from "native-base";
import bigInt  from "big-integer";
import { Ionicons } from '@expo/vector-icons';
import { Font,ImagePicker, Notifications} from 'expo';
import { List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button, Fab } from 'native-base';
import { Title, Picker, Form, Item as FormItem } from "native-base";
import { ActionSheet } from "native-base";
import navigation, { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';
import Swipeable from 'react-native-swipeable';

import AlarmAdd from './AlarmAdd';
import AlarmEdit from './AlarmEdit';
const Item = Picker.Item;

class AlarmListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state= {
      active:'false',
      basic: true,
      listViewData: {},
    }

    this._onAlarmStatusChange = this._onAlarmStatusChange.bind(this);
    this.getAlarm = this.getAlarm.bind(this);
  }

  getAlarm(){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log("I am repeat",this.state.repeat);
    let myRequest = new Request(`${config.API_BASE}/api/db/getAlarm`, {
      method: 'POST',
      // this header sends the user token from auth0
      headers: myHeaders,
      body: JSON.stringify(this.props.mainProps.screenProps.profile)
    });

    fetch(myRequest)
    .then(response => response.json())
    .then((res)=>{
      console.log("I have get the alarm!", res);
      var listViewData = {};
      res.alarmList.map((value, index) => {
        console.log(value);
        listViewData[value.id] = value;
      });

      console.log('datas:', listViewData);
      this.setState({listViewData: listViewData});
    })
    .catch(error => {
      console.error(error);
    });
  }

  componentDidMount(){
    this.getAlarm();
  }

  _wrapMapToArray(data) {
    var dataArray = [];
    Object.keys(data).map((key, indedx) => {
      dataArray.push(data[key]);
    })
    return dataArray;
  }

  deleteRow(secId, rowId, rowMap, alarmId) {
    console.log('alarmId:', alarmId);
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    //* delete data in DB
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let myRequest = new Request(`${config.API_BASE}/api/db/deleteAlarm`, {
      method: 'POST',
      // this header sends the user token from auth0
      headers: myHeaders,
      body: JSON.stringify({
        name: this.props.mainProps.screenProps.profile,
        id: alarmId
      })
    });

    fetch(myRequest)
    .then(response => response.json())
    .then(()=>{
      this.getAlarm()
    })
    .catch(error => {
      console.error(error);
    });
  }

  _onAlarmStatusChange(status, hour, minute,id,) {

    if(status){
      schedulingOptions = [];
      var cur = (new Date()).getTime();
      var curHour = (new Date()).getHours();
      var curMin = (new Date()).getMinutes();
      currentTime = cur + parseInt(hour) * 3600000 + parseInt(minute) * 60000 - parseInt(curHour) * 3600000 - parseInt(curMin) * 60000 - 30*1000;
      if( currentTime < cur){
        currentTime += 24 * 3600000;
      }
      console.log(cur, currentTime);
      localNotification = {
        title: "test notefication",
        body: "test body",
        sound: true,
        vibrate: true
      }
      for(i = 0; i < 20; i++){
        // if(i % 2 === 0) {
        //   // Expo.Notifications.dismissAllScheduledNotificationsAsync();
        // }
        Expo.Notifications.scheduleLocalNotificationAsync(localNotification,{
          time: currentTime + (i * 10000)
        })
      }
    }

    let newlistViewData = (oldData, status, id) => {
      var newData = {};
      Object.keys(oldData).map(function(key) {
        //console.log(key,':', oldData[key]);
        newData[key] = oldData[key];
      });
      newData[id].status = status;
      return newData;
    };

    this.setState({
      listViewData: newlistViewData(
        this.state.listViewData,
        status,
        id)
      });

    }

    render() {
      _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          // aspect: [4, 3],
          quality: 0.2,
          base64: true
        });
        if (!result.cancelled) {
          console.log("not cancelled!")
          testRequest = {
            "requests":[
              {
                "image":{
                  "content":result.base64
                },
                "features":[
                  {
                    "type":"LABEL_DETECTION",
                    "maxResults":20
                  }
                ]
              }
            ]
          }
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          let myRequest = new Request(`${config.API_BASE}/api/db/uploadPic`, {
            method: 'POST',
            // this header sends the user token from auth0
            headers: myHeaders,
            body: JSON.stringify({
              pic: result.base64,
              name: this.props.mainProps.screenProps.profile
            })
          });
          var success = 0;
          fetch(myRequest)
          .then(response => response.json())
          .then(()=>{console.log("I have fetched the database!!!!!!!!!!!!!!")})
          .catch(error => {
            console.error(error);
          });
          fetch("https://vision.googleapis.com/v1/images/:annotate?key=AIzaSyA-5dKeQx1FOuY4Gl8Vs_qhQangXdw8wYQ",{
            method:"POST",
            headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
            },
            body: JSON.stringify(testRequest)
          })
          .then((res) => JSON.parse(res._bodyInit))
          .then((responseJson) => {
            return responseJson;
          })
          .then(responseJson =>{
            var labels = responseJson.responses[0].labelAnnotations;
            var len = labels.length;
            // var success = 0;
            for(i = 0; i < len; i++){
              if(labels[i].description === "eye"){
                Expo.Notifications.cancelAllScheduledNotificationsAsync();
                success = 1;
                break;
              }
            }
            if(success !== 1 && success !==3){
              Alert.alert("Please Open Your Eyes and Try Again!");
              success === 3;
            }
          })
        }
        else{
          console.log("I am cancelled")
        }
      };
      //swipe
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      const repeatArray = ["No Repeat","Daily","Weekly"]


      let dataArray = this._wrapMapToArray(this.state.listViewData);

      return (
        <Container>
        <Header>
        <Body>
        <Title>Alarm Clock</Title>
        </Body>
        </Header>
        <Content>
        <List
        enableEmptySections={true}
        dataSource={this.ds.cloneWithRows(dataArray)}
        renderRow={data =>
          <ListItem icon key={data.id}>
          <Left>
            <Icon name="clock" />
          </Left>
          <TouchableNativeFeedback
              onPress={() => this.props.mainProps.navigation.navigate(
                'AlarmEdit',
                {
                  parentProps: this.props.mainProps.screenProps,
                  selectedAlarm: data,
                })}

              background={TouchableNativeFeedback.SelectableBackground()}>
          <Body>
            <Text style={styles.digitText}>{data.time[0]}:{data.time[1]} </Text>
            <Text style={styles.dayText} > {data.label}, {data.repeat}</Text>
          </Body>
       </TouchableNativeFeedback>
          <Right>
          <Switch
          onValueChange={(value) => this._onAlarmStatusChange(value, data.time[0],data.time[1],data.id)}
          value={data.status} />
          </Right>
          </ListItem>}

          renderLeftHiddenRow={
            (data) => {
              // console.log('row data', data);
              return (
                <Button full onPress={(data) => alert(data)}>
                <Icon active name="information-circle" />
                </Button>
              )
            }
          }  //left can be deleted! just for test
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={() => {
                  this.deleteRow(secId, rowId, rowMap, data.id)}
                }>
                <Icon active name="trash" />
                </Button>
            }
              leftOpenValue={60}
              rightOpenValue={-50}
              disableRightSwipe = {false}
              />

              </Content>
              <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}>
              <Icon name="md-build" />
              <Button onPress={_pickImage} style={{ backgroundColor: '#3B5998' }}>
              <Icon name="md-camera" />
              </Button>
              <Button onPress={() => this.props.mainProps.navigation.navigate(
                'AlarmAdd',
                {parentProps: this.props.mainProps.screenProps})}
                style={{ backgroundColor: '#DD5144' }}>
                <Icon name="md-alarm" />
                </Button>
                </Fab>

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
            list: {width: '100%', marginLeft: 0, marginRight: 0},
            listItem: {paddingTop: 10, paddingBottom: 10},
            row:{height:70},
            icon: {fontSize: 35},
            digitText: {fontSize: 20},
            dayText: {fontSize: 10},
            title: {
              fontSize: 20,
              textAlign: 'center',
              marginTop: 40,
            },
            spaced: {
              marginTop: 20,
            },
            addButton: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            rightSwipeItem: {
              flex: 1,
              justifyContent: 'center',
              paddingLeft: 5,
              backgroundColor:'red',
            },
          })

          export default AlarmListScreen;
