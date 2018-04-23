import React from 'react';
import PhotoGrid from 'react-native-photo-grid';
import navigation, { StackNavigator } from 'react-navigation';
import { List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Container, Header, Content, Footer, FooterTab, Button, Fab } from 'native-base';
import {
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  Image,
  ScrollView
} from 'react-native';

import config from '../config'
import devModeOverrides from '../config'

class GalleryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      picArray : []
    }
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, itemSiz) {

    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSiz, height: itemSiz }}
        onPress = { () => this.props.mainProps.navigation.navigate(
          'GalleryDeck',
          {
            id: item.id,
            items: this.state.picArray,
            pic: this.props.mainProps.screenProps.profile.picture,
            nickname: this.props.mainProps.screenProps.profile.given_name
          }
        )}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )

  }

  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    // console.log("look here!!!!!",this.props.screenProps.screenProps.profile.nickname);
    // var fd = new FormData();
    // fd.append('ajaxfile', result.base64);
    let myRequest = new Request(`${config.API_BASE}/api/db/getData`, {
      method: 'POST',
      // this header sends the user token from auth0
      headers: myHeaders,
      body: JSON.stringify(this.props.mainProps.screenProps.profile)
    });

    fetch(myRequest)
      .then(response =>
        response.json())
        .then(res => {
        this.setState({
          picArray : res.pic.map((v, i) => {
            return { id: i, src: 'data:image/png;base64,' + v.pic}
          })
        });
      })
  }

  render() {
    if(this.state.picArray.length !== 0){
      let items = this.state.picArray
      return(
        <Container>
          <PhotoGrid
            data = { items }
            itemsPerRow = { 3 }
            itemMargin = { 1 }
            renderItem = { this.renderItem }
          />
        </Container>
        );
    }
    else{
      return(
        <Container>
        </Container>
      );
    }
  }
}

export default GalleryScreen;
