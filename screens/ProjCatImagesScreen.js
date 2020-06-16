import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity, Image, ActivityIndicator, StatusBar, FlatList, ImageBackground, Dimensions, Linking, Modal, TouchableWithoutFeedback
} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper';

import { BackHandler } from 'react-native';

import images from '../util/img';
import Styles from '../uistyles/Styles';
import { projectCatImgsURL, baseURL, projectImgAcceptRejectURL } from '../util/AppConstants';

export default class ProjCatImagesScreen extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      data: [],
      dataSource: [],
      text: '',
      swiperVisible: false,
      currentImage: '',
      slideEnable: true,
      showsButtonss: false,
      acceptrejectbutton: true,

      header: '',
      locimgId: '',
      status: false

    }

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => {
    console.log('STATE' + this.state.swiperVisible);
    if (this.state.swiperVisible == true) {
      this.setState({
        swiperVisible: false,
      });
      return true;
    }
    else {
      return false;
    }
  }


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    StatusBar.setHidden(false);
    global.screen = 'ProjCatScreen';
    const pid = this.props.navigation.getParam('pid', 'nothing sent');
    const locid = this.props.navigation.getParam('locid', 'nothing sent');
    const head = this.props.navigation.getParam('head', 'nothing sent');

    console.log("ON CAT SCREEN" + "PROJID" + pid + "LOC ID" + locid + "HEADER" + head);

    this.setState({
      isLoading: true,
      header: head,
    })

    return fetch(
      projectCatImgsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: 1,
        limit: 10,
        projectId: pid,
        locationId: locid,
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
            pushObj.img = baseURL + responseJson[i].path;
            pushObj.text = '';
            pushObj.locimgid = responseJson[i].id;



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

  calllAcceptRejectAPI = async (text) => {



    this.setState({
      isLoading: true
    });



    const response = await fetch(
      projectImgAcceptRejectURL + this.state.locimgId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        projectLocationImageId: this.state.locimgId,
        approve: text,


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
        }
        else {
          console.log(err);

        }

      }).then((response) => {
        if (response != undefined) {
          if (response.approved != null) {
            this.setState({
              isLoading: false,
              acceptrejectbutton: false


            });
            if (response.approved == 1) {
              alert("Image accepted successfully");
            }
            else {
              alert("Image rejected successfully");

            }
          }
        }

      })



  }
  actionOnRow(item, index) {
    global.pos = Number(index);
    global.images = this.state.dataSource;

    console.log('current position   ' + global.pos);
            if (global.images.length > 1) {
      this.setState({
        data: global.images,
        pos: global.pos,
        swiperVisible: true,
        showsButtonss: true,
        locimgId: item.locimgid,
      });
    }
    else {
      this.setState({
        data: global.images,
        pos: global.pos,
        swiperVisible: true,
        showsButtonss: true,
        locimgId: item.locimgid,


      });
    }


  }
  render() {
    var sliderArr = this.state.data;
    console.log('images' + sliderArr.length);
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

        <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 17 }}>{this.state.header}</Text>
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




              </View>
            </TouchableWithoutFeedback>

          }

        />

        {
          this.state.swiperVisible ?
            <View style={Styles.loading}>
              <View style={{
                justifyContent: 'center',
                height: 550, width: Dimensions.get('window').width, alignSelf: 'center', alignContent: 'center', alignItems: 'center',
              }}>
                <Swiper
                  removeClippedSubviews={false}
                  showsButtons={this.state.showsButtonss}
                  showsPagination={false}
                  nextButton={<Image source={images.right} resizeMode={'contain'} style={[Styles.buttonText1, { color: 'white', height: 50, width: 60 }]}></Image>}
                  prevButton={<Image source={images.left} resizeMode={'contain'} style={[Styles.buttonText1, { color: 'white', height: 50, width: 60 }]}></Image>}
                  buttonWrapperStyle={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 0,
                    justifyContent: 'space-between', alignItems: 'center'
                  }}
                  index={this.state.pos}
                  // loop
                  scrollEnabled
                >
                  {

                    sliderArr.map(item =>
                      <View key={item.img} style={{ justifyContent: 'center', height: 550, width: Dimensions.get('window').width - 20, marginLeft: 10, marginRight: 10, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <ImageBackground style={{ height: 500, width: Dimensions.get('window').width - 20 }}
                          resizeMode={'cover'}
                          source={{ uri: item.img }}
                        >
                          {
                            this.state.acceptrejectbutton ?
                              <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 10, alignItems: 'center', alignSelf: 'center' }}>

                                <TouchableOpacity style={{
                                  flex: 1, borderWidth: .5, justifyContent: 'center',
                                  borderColor: 'black', borderRadius: 5, marginRight: 10, height: 40, backgroundColor: 'white', marginLeft: 10
                                }} onPress={() => {
                                  console.log('Accept clicked' + this.state.locimgId);


                                  this.calllAcceptRejectAPI(true);

                                }
                                }
                                >
                                  <View >
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>Accept</Text>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                  flex: 1, borderWidth: .5, alignContent: 'center', marginRight: 10, justifyContent: 'center',
                                  borderColor: 'black', borderRadius: 5, height: 40, backgroundColor: 'white'
                                }} onPress={() => {
                                  console.log('Reject clicked' + this.state.locimgId);

                                  this.calllAcceptRejectAPI(false);
                                }
                                }
                                >

                                  <View >
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>Reject</Text>
                                  </View>
                                </TouchableOpacity>

                              </View> : null
                          }
                        </ImageBackground>
                      </View>
                    )
                  }
                </Swiper>
              </View></View>

            : null
        }


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


