import React from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Container, Header, Content, Button, Text, Icon } from 'native-base';
import config from '../config';

import { KeepAwake } from 'expo';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.createDB = this.createDB.bind(this);
  }

    createDB(){
      // const {getAuthorizationHeader} = this.props.screenProps;
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
        let myRequest = new Request(`${config.API_BASE}/api/db/login`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(this.props.screenProps.profile)
        });

        fetch(myRequest)
          .then(response => {
            if (!response.ok) {
            }
            return response;
          })
          .catch(function (error) {
            console.error(error);
          });
    }

  render() {
     const {profile, login, logout, getAuthorizationHeader} = this.props.screenProps;
     const {navigate} = this.props.navigation;
     const msg = (!profile) ? <Text>Hi!</Text> : <Text>Hello {profile.name}!</Text>
     if(this.props.screenProps.profile.sub){
       this.createDB();
       return (
         <Container style={styles.container}>
         <Image
         style={{
         flex: 1,
         position: 'absolute',
         width: '100%',
         height: '100%',
         justifyContent: 'center',
       }}
       source={ require( './background/bg1.jpg') }
     />
             <Button
               onPress={() => this.props.navigation.navigate('MainScreen')}
               info
               rounded
               style={styles.button}
             >
             <Icon name='md-alarm' />
             <Text>Hell Alarm</Text>
             </Button>

           <KeepAwake />
         </Container>
       )
     }
     else{
       return (
           <Container style={styles.container}>
           <Image
           style={{
           flex: 1,
           position: 'absolute',
           width: '100%',
           height: '100%',
           justifyContent: 'center',
         }}
         source={ require( './background/bg1.jpg') }
       />
             <Button
             info
             rounded
             style={styles.button}
             onPress={login} >
             <Text>Login with Auth0</Text>
             </Button>
           <KeepAwake />
         </Container>
       )
     }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  spaced: {
    marginTop: 20,
  },
  button:{
    flex: 1,
    position: 'absolute',
    marginLeft: 40,
  }
});

export default HomeScreen;
