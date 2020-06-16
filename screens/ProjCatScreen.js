import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity, Image, ActivityIndicator, StatusBar, FlatList, ImageBackground, Dimensions, Linking, Modal, TouchableWithoutFeedback
} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Styles from '../uistyles/Styles';
import { projectCatURL, baseURL } from '../util/AppConstants';
import images from '../util/img';

export default class ProjCatScreen extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      data: [],
      dataSource: [],
      text: '',
      modalVisible: false,
      currentImage: '',
      slideEnable: true,
    }

  }

  componentDidMount() {
    StatusBar.setHidden(false);
    global.screen = 'ProjCatScreen';
    const pid = this.props.navigation.getParam('pid', 'nothing sent');
    console.log("ON CAT SCREEN" + "PROJID" + pid);

    this.setState({
      isLoading: true,
    })

    return fetch(
      projectCatURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: 1,
        limit: 10,
        projectId: pid,

      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.result);
        this.setState({
          isLoading: false,
        }, function () {
          var arr = [];


          for (var i = 0; i < responseJson.length; i++) {
            var pushObj = {};

            if (responseJson[i].locationDesc != null) {
              pushObj.text = responseJson[i].locationDesc.name;
            }
            if (responseJson[i].locationDetails != null) {
              pushObj.locationId = responseJson[i].locationDetails.locationId;
              pushObj.projId = responseJson[i].locationDetails.projectId;

            }
            if (responseJson[i].images.length > 0) {
              pushObj.img = baseURL + responseJson[i].images[0].path;
              console.log("IMAGE", pushObj.img);
            }
            arr.push(pushObj);

          }


          this.setState({
            data: arr,
            dataSource: arr,

          });
        });
      })
      .catch((error) => {
        const err = '' + error;
        if (err.includes('Network')) {

          alert('Please connect to internet.');
          this.setState({
            isLoading: false,

          })
            .catch(error => console.log(error));
        }
        else {
          console.log(err);

        }

      });

  }


  actionOnRow(item, index) {
    var pushObj = {};
    pushObj.pid = item.projId;
    pushObj.locid = item.locationId;
    pushObj.head = item.text;

    this.props.navigation.navigate('ProjCatImagesScreen', pushObj);


  }
  render() {

    let width = Dimensions.get('screen').width / 2;
    const headerColor = 'white';

    return (

      <View style={[Styles.containerr, { backgroundColor: 'white' }]}>
        <StatusBar hidden={false} />
        <View style={{ backgroundColor: headerColor, height: 60 }}>
          <View style={{ flexDirection: 'row', height: 60, padding: 5, alignItems: 'center', borderWidth: 1, borderBottomColor: headerColor, borderTopColor: headerColor, borderLeftColor: headerColor, borderRightColor: headerColor }}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack();

            }
            }
            >

              <Icon1 style={{ marginLeft: 10 }} name="arrow-left" size={20} color="black" />

            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginLeft: 5 }}>
              <Image style={{ width: 80, height: 50 }} source={images.headerlogo} />
            </View>
          </View>

        </View>

        <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 17 }}>Categories</Text>
        <FlatList
          style={{ padding: 10, backgroundColor: 'white' }}
          horizontal={false}
          data={this.state.dataSource}
          keyExtractor={item => item.text}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          renderItem={({ item, index }) =>
            <TouchableWithoutFeedback onPress={() => this.actionOnRow(item, index)}>

              <View style={{
                backgroundColor: 'white', width: width - 20, height: 250, marginTop: 5, marginRight: 10
              }}>

                <Image style={{ height: 200, width: width - 20, borderRadius: 10 }}
                  resizeMode={'cover'}
                  source={{ uri: item.img }}

                ></Image>

                <Text style={{
                  marginTop: 5, justifyContent: 'center', alignSelf: 'center', textAlign: 'center'
                }} >{item.text}</Text>


              </View>
            </TouchableWithoutFeedback>

          }

        />
        {
          this.state.isLoading ? <View style={Styles.loading}>
            <ActivityIndicator size='large' color="#D45739">
            </ActivityIndicator>
          </View>
            : null
        }

      </View>

    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          marginTop: 10,
          marginLeft: 10,
          marginRight: 20,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
}


