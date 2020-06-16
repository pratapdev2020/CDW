import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator, TouchableOpacity, Image, Dimensions, FlatList, TouchableWithoutFeedback
} from 'react-native';
import { projectListingURL, baseURL } from '../util/AppConstants';
import Styles from '../uistyles/Styles';
import styles1 from '../uistyles/styles1';
import images from '../util/img';
class DashboardScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      dataSource: [],
      text: '',
      modalVisible: false,
      currentImage: '',
      slideEnable: true,
      fetching_from_server: false,

    };
    this.offset = 1;



  }

  componentDidMount() {
    StatusBar.setHidden(false);

    global.screen = 'DashboardScreen';

    this.setState({
      isLoading: true,
    })
    return fetch(
      projectListingURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: this.offset,
        limit: 10

      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].details);
        this.setState({
          isLoading: false,
        }, function () {
          var arr = [];
          for (var i = 0; i < responseJson.length; i++) {
            var pushObj = {};
            if (responseJson[i].details != null) {
              pushObj.status = responseJson[i].details.projectStatus;

              pushObj.text = responseJson[i].details.projectName;

              pushObj.pid = responseJson[i].details.id;

            }
            if (responseJson[i].images.length > 0) {
              pushObj.img = baseURL + responseJson[i].images[0].path;
              console.log('Image' + pushObj.img);
            }


            arr.push(pushObj);
          }

          this.offset = this.offset + 1;

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
            // });      
            // }
          })
            .catch(error => console.log(error));
        }
        else {
          console.log(err);

        }

      });
  }


  loadMoreData = () => {
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {
      fetch(projectListingURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: this.offset,
          limit: 10

        }),
      })


        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
          }, function () {
            var arr = [];


            for (var i = 0; i < responseJson.length; i++) {
              var pushObj = {};


              if (responseJson[i].details != null) {
                pushObj.status = responseJson[i].details.projectStatus;
                pushObj.pid = responseJson[i].details.id;

                pushObj.text = responseJson[i].details.projectName;
              }

              if (responseJson[i].images.size > 0) {
                pushObj.img = baseURL + responseJson[i].images[0].thumbPath;

              }
              arr.push(pushObj);

            }

            this.offset = this.offset + 1;

            this.setState({
              data: arr,
              dataSource: [...this.state.dataSource, ...arr],
              fetching_from_server: false,

            });
          });
        })
        .catch((error) => {
          const err = '' + error;
          if (err.includes('Network')) {
            alert('Please connect to internet.');
            this.setState({
              isLoading: false,
              // });      
              // }
            })
              .catch(error => console.log(error));
          }
          else {
            console.log(err);

          }

        });
    });
  };


  renderFooter() {
    return (
      //Footer View with Load More button
      <View style={styles1.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          style={styles1.loadMoreBtn}>
          <Text style={styles1.btnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }


  actionOnRow(item) {
    console.log('open proj detail screen');
    var pushObj = {};
    pushObj.name = item.text;
    pushObj.status = item.status;
    pushObj.pid = item.pid;

    console.log("SINDING" + item.pid);
    this.props.navigation.navigate('ProjDetailScreen', pushObj);

  }
  render() {

    let width = Dimensions.get('screen').width;
    const headerColor = 'white';

    return (

      <View style={[Styles.container, { backgroundColor: 'white' }]}>
        <StatusBar hidden={false} />
        <View style={{ backgroundColor: headerColor, height: 60 }}>
          <View style={{ flexDirection: 'row', height: 60, padding: 5, alignItems: 'center', borderWidth: 1, borderBottomColor: 'white', borderTopColor: headerColor, borderLeftColor: headerColor, borderRightColor: headerColor }}>

            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              <Image style={{ width: 80, height: 50 }} source={images.headerlogo} />
            </View>
          </View>

        </View>
        <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 17 }}>Projects</Text>

        <FlatList

          data={this.state.dataSource}
          keyExtractor={item => item.text}
          horizontal={false}
          renderItem={({ item, index }) =>
            index % 2 == 0 ?
              <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                <View style={{
                  backgroundColor: 'white', margin: 10, flexDirection: 'row', alignItems: 'center'
                }}>

                  <Image style={{
                    height: 120, width: 200, flex: 1
                  }}

                    source={{ uri: item.img }}

                    resizeMode={'cover'}
                  // source={images.pdetail}

                  ></Image>
                  <View style={{ flexDirection: 'column', flex: 1, marginLeft: 5, marginRight: 5 }}>
                    <Text style={{
                      marginTop: 10, marginLeft: 10,
                    }} >{item.text}</Text>
                    <Text style={{
                      marginLeft: 10,
                    }} >{item.status}null</Text>

                  </View>

                </View>
              </TouchableWithoutFeedback> :
              <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                <View style={{
                  backgroundColor: 'white', margin: 10, flexDirection: 'row', alignItems: 'center'
                }}>
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={{
                      marginTop: 10, marginLeft: 10,
                    }} >HELLO HELLO HELLO</Text>
                    <Text style={{
                      marginLeft: 10,
                    }} >IN Progress</Text>
                  </View>
                  <Image style={{
                    height: 100, flex: 1, width: 300
                  }}
                    resizeMode={'contain'}
                    source={{ uri: item.img }}

                  ></Image>

                </View>
              </TouchableWithoutFeedback>

          }

          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={.2}
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
  onEndReached = ({ distanceFromEnd }) => {
    if (distanceFromEnd < 0) return;
    else {
      this.loadMoreData();
    }
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





export default DashboardScreen;
