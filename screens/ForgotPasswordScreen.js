import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, View, ImageBackground, Text, Keyboard, Alert, BackHandler, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import images from '../util/img';
import Styles from '../uistyles/Styles';
import { StackActions, NavigationActions } from 'react-navigation';


import { loginheaderColor, forgotURL } from '../util/AppConstants';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      pwd: '',
    }
  }
  static navigationOptions = {
    headerShown: false,
    drawerLockMode: 'locked-closed',
    gestureEnabled: false,



  };






  componentDidMount() {

    StatusBar.setHidden(false);


  }
  handleemail = (text) => {
    this.setState({ email: text })
  }

  proceed = (email) => {
    if (email == '') {
      alert('Enter your registered email ID');
    }



    else {
      Keyboard.dismiss();

      this.callForgotAPI();

    }
  }
  callForgotAPI = async () => {


    this.setState({
      isLoading: true
    });



    const response = await fetch(
      forgotURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: this.state.email,



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
        this.setState({
          isLoading: false,


        });
        console.log(response);
        if (response.message != undefined) {
          Alert.alert(
            'Alert', response.message,
            [
              {
                text: 'OK', onPress: () => {
                  this.props.navigation.goBack();
                }
              },

            ]

          )

        }

        else {

        }





      })



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
          source={images.background}
        >

          <Image style={{ height: 130, width: Dimensions.get('window').width, marginTop: 40 }}
            resizeMode={'contain'}
            source={images.logo_login}

          >
          </Image>

          <View style={{ flexDirection: "column", alignSelf: 'center', marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Forgot Password</Text>
            <View style={{ backgroundColor: '#F85862', width: 50, height: 2, marginTop: 8 }}>
            </View>
          </View>

          <View style={{
            height: 50,
            marginLeft: 10,
            marginRight: 10,
            width: '90%',
            alignSelf: 'center',
            marginTop: 60, 
          }}>
            <View style={Styles.background} />

            <TextInput
              ref='email'
              style={Styles.textInput}
              keyboardType="email-address"
              value={this.state.email}

              onChangeText={this.handleemail}
              placeholder="Enter Email ID"
              placeholderTextColor={loginheaderColor}
              underlineColorAndroid="transparent"
              returnKeyType="done"
              blurOnSubmit={false}


            />
          </View>


          <TouchableOpacity onPress={() => {
            this.proceed(this.state.email)
          }

          } >
            <View style={{
              height: 50,
              marginLeft: 10,
              marginRight: 10,
              width: '90%',
              marginTop: 30,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#F85862',
              borderRadius: 10


            }}>
              <Text style={{ color: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>SUBMIT
  </Text>
            </View>
          </TouchableOpacity>


        </ImageBackground>
        {
          this.state.isLoading ? <View style={Styles.loading}>
            <ActivityIndicator sizewhite='large' color='white'>
            </ActivityIndicator>
          </View>
            : null
        }
      </View>
    )
  }




}
export default ForgotPasswordScreen;