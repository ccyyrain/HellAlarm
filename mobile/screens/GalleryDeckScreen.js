import React from 'react';
import {
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

class GalleryDeckScreen extends React.Component {

  constructor(props) {
    super(props)

    this._reorderItems = this._reorderItems.bind(this);
  }

  _reorderItems(id, items) {
    var itemLen = items.length;
    var counter = 0;

    var reorderedItems = []
    while(counter < itemLen) {
      reorderedItems.push(items[(id + counter)%itemLen])
      counter++;
    }

    //console.log('reorderedItems', reorderedItems);
    return reorderedItems;
  }
  render() {
    //console.log(this.props.navigation.state.params.id,"--",this.props.navigation.state.params.items);
    let photos = this._reorderItems(
      this.props.navigation.state.params.id,
      this.props.navigation.state.params.items
    );

    return (
      <Container>
        <View>
          <DeckSwiper
            dataSource={photos}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: this.props.navigation.state.params.pic}} />
                    <Body>
                      <Text>{this.props.navigation.state.params.nickname}</Text>
                      <Text note></Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{uri:item.src}} />
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}

export default GalleryDeckScreen;
