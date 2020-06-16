import React, { Component } from 'react'
import { StatusBar, AsyncStorage, View, ImageBackground, Linking, Button, Alert, BackHandler, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import images from '../util/img';
import Styles from '../uistyles/Styles';
import { StackActions, NavigationActions } from 'react-navigation';




class SplashScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }
  static navigationOptions = {
    headerShown: false,




  };


  async getLocalData() {
    let userId = await AsyncStorage.getItem('userId');
    console.log('local userId' + userId);

    if (!userId) {
      this.finishPreviousScreens('LoginScreen');
    }
    else {
      this.finishPreviousScreens('DashboardScreen');

    }
  }
  
  componentDidMount() {
    SplashScreen.hide();
    StatusBar.setHidden(false);
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        console.log("initial" + url);
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    this.getLocalData();
    

  }
  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = (event) => { // D
    console.log("handle" + event.url);
    this.navigate(event.url);
  }
  navigate = (url) => { // E

    if (url) {
      const token = url.split('token=')[1];
      console.log("navigate" + "-----" + token);
      if (url.indexOf('tokenURL') !== -1) {
        var pushObj = {};
        pushObj.token = token;
        this.props.navigation.navigate('NewPasswordScreen', pushObj);
      }
    }

    
  }
  finishPreviousScreens(screen) {
    console.log('FINISH CALLED');
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: screen })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {

    return (
      <View style={Styles.container}>

        <ImageBackground
          style={Styles.imageStyle}
          source={images.splashScreen1}
        >
        </ImageBackground>
        {
          this.state.isLoading ? <View style={Styles.loading}>
            <ActivityIndicator size='large' color='white'>
            </ActivityIndicator>
          </View>
            : null
        }
      </View>
    )
  }




}
export default SplashScreen1;