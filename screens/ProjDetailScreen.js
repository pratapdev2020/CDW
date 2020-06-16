import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator, TouchableOpacity, Image, Dimensions, FlatList, TouchableWithoutFeedback
} from 'react-native';

import images from '../util/img';
import Styles from '../uistyles/Styles';

import { projectDetailURL, baseURL } from '../util/AppConstants';

import Icon1 from 'react-native-vector-icons/FontAwesome';


class ProjDetailScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      dataSource: [],
      text: '',
      modalVisible: false,
      currentImage: '',
      name: '',
      status: '',

    }


  }

  componentDidMount() {
    StatusBar.setHidden(false);

    global.screen = 'ProjDetailScreen';
    const name = this.props.navigation.getParam('name', '');
    const status = this.props.navigation.getParam('status', '');
    const pid = this.props.navigation.getParam('pid', '');

    this.setState({
      name: name,
      status: status,
      pid: pid,

      loading: true,
      upperimg: '',

    });
    const response = fetch(
      projectDetailURL, {
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
      .then((response) => { return response.json() })
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

      }).then((response) => {
        this.setState({
          isLoading: false,


        });
        console.log(response);
        var path = response[0].path;
        console.log(path);
        for (var k = 0; k < response.length; k++) {
          if (k == 0) {
            var path = response[k].path;
            console.log(path);

            this.setState({
              upperimg: baseURL + path,


            });

          }
        }

      })
  }








  callExecution() {
    var pushObj = {};
    pushObj.pid = this.state.pid;
    this.props.navigation.navigate('ProjCatScreen', pushObj);

  }



  render() {
    const headerColor = 'white';

    let width = Dimensions.get('screen').width;

    return (

      <View style={[Styles.containerr]}>
        <StatusBar hidden={false} />

        <View style={{ backgroundColor: headerColor, height: 60 }}>
          <View style={{ flexDirection: 'row', height: 60, padding: 5, alignItems: 'center', borderWidth: 1, borderBottomColor: 'white', borderTopColor: headerColor, borderLeftColor: headerColor, borderRightColor: headerColor }}>
            <TouchableOpacity onPress={() => {
              console.log('dashhhh111');
              this.props.navigation.goBack();
            }
            }
            >
              <Icon1 style={{ marginLeft: 10 }} name="arrow-left" size={20} color="black" />


            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              <Image style={{ width: 80, height: 50 }} source={images.headerlogo} />
            </View>
          </View>

        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: 180, width: Dimensions.get('window').width - 20, marginTop: 40 }}
            resizeMode={'cover'}
            source={{ uri: this.state.upperimg }}

          >
          </Image>
          <Text style={{ marginTop: 20 }}>{this.state.name}</Text>
          <Text>{this.state.status}null</Text>
          <View style={{ flex: 1, lexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, flexWrap: "wrap" }}>
            <View style={{
              borderWidth: .5, alignContent: 'center', backgroundColor: '#eeeeee',
              borderColor: 'transparent', borderRadius: 10, marginRight: 2, height: 30
            }}>
              <Text style={{ fontSize: 10, paddingLeft: 8, paddingRight: 8, paddingBottom: 5, paddingTop: 5, }}>Approved Layouts</Text>
            </View>
            <View style={{
              borderWidth: .5,
              backgroundColor: '#eeeeee', borderColor: 'transparent', borderRadius: 10, marginLeft: 2, marginRight: 2, height: 30
            }}>
              <Text style={{ fontSize: 10, paddingLeft: 8, paddingRight: 8, paddingBottom: 5, paddingTop: 5 }}>Finishes</Text>
            </View>
            <View style={{
              borderWidth: .5,
              backgroundColor: '#eeeeee', borderColor: 'transparent', borderRadius: 10, marginLeft: 2, marginRight: 2, height: 30
            }}>
              <Text style={{ fontSize: 10, paddingLeft: 8, paddingRight: 8, paddingBottom: 5, paddingTop: 5 }}>Mooboard & 30</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.callExecution()}>

              <View style={{
                borderWidth: .5,
                backgroundColor: '#eeeeee', borderColor: 'transparent', borderRadius: 10, marginLeft: 2, marginRight: 2, height: 30
              }}>
                <Text style={{ fontSize: 10, paddingLeft: 8, paddingRight: 8, paddingBottom: 5, paddingTop: 5 }}>Execution</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Image style={{ height: 200, width: Dimensions.get('window').width, marginTop: 50 }}
            resizeMode={'cover'}
            source={images.plan}
          >
          </Image>
        </View>


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


}





export default ProjDetailScreen;
