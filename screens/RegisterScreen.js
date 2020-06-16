import React, { Component } from 'react'
import { StatusBar, ScrollView, View, ImageBackground, Text, KeyboardAvoidingView, AsyncStorage, Alert, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import images from '../util/img';
import Styles from '../uistyles/Styles';
import { StackActions, NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';

import { loginheaderColor, registerURL } from '../util/AppConstants';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      first: '',
      last: '',
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

  handlefirst = (text) => {
    this.setState({ first: text })
  }
  handlelast = (text) => {
    this.setState({ last: text })
  }
  handleemail = (text) => {
    this.setState({ email: text })
  }
  handlepwd = (text) => {
    this.setState({ pwd: text })
  }

  proceed = (first) => {
    if (first == '') {
      alert('Enter your first name');
    }
    else if (this.state.last == '') {
      alert('Enter your last name');

    }

    else if (this.state.email == '') {
      alert('Enter your email address');

    }
    else if (this.state.pwd == '') {
      alert('Enter your password');

    }
    else if (this.state.pwd.length < 5) {
      alert('Enter your valid password of length more than 4 characters');

    }

    else {
      // alert('Call Quote service');

      this.callregisterAPI();

    }
  }
  callregisterAPI = async () => {


    this.setState({
      isLoading: true
    });



    const response = await fetch(
      registerURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.first,
        lastName: this.state.last,
        email: this.state.email,
        password: this.state.pwd,


      }),
    })
      .then((response) => { return response.json() })
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

      }).then((response) => {
        this.setState({
          isLoading: false,


        });
        console.log(response);
        if (response.errors != undefined) {
          var err = '';
          console.log(response + "--" + response.errors.length);
          if (response.errors.length > 0) {
            for (var i = 0; i < response.errors.length; i++) {
              err = err + response.errors[i].param + " , ";
            }

            alert('Enter valid values for ' + err);

          }
        }
        else {
          // alert("You are registered successfully.");
          AsyncStorage.setItem('userId', "" + response.id);
          AsyncStorage.setItem('userEmail', this.state.email);
          AsyncStorage.setItem('userPwd', this.state.pwd);

          Toast.show('You are registered successfully.', Toast.LONG);

          this.finishPreviousScreens('LoginScreen');
        }

      })



  }
  render() {

    return (
      <View style={Styles.container}>

        <ImageBackground
          style={Styles.imageStyle}
          source={images.background}
        >
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>

            <KeyboardAvoidingView behavior="padding" enabled>
              <Image style={{ height: 130, width: Dimensions.get('window').width, marginTop: 40 }}
                resizeMode={'contain'}
                source={images.logo_login}

              >
              </Image>
              <View style={{
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 80, //... For dynamic height
              }}>
                <View style={Styles.background} />

                <TextInput
                  ref='fname'

                  style={Styles.textInput}
                  keyboardType='default'

                  onChangeText={this.handlefirst}
                  placeholder="First Name"
                  placeholderTextColor={loginheaderColor}
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  onSubmitEditing={(event) => { this.refs.lname.focus(); }}
                />
              </View>

              <View style={{
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 20,
              }}>
                <View style={Styles.background} />

                <TextInput
                  ref='lname'

                  style={Styles.textInput}
                  keyboardType='default'

                  onChangeText={this.handlelast}
                  placeholder="Last Name"
                  placeholderTextColor={loginheaderColor}
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  onSubmitEditing={(event) => { this.refs.email.focus(); }}

                />
              </View>

              <View style={{
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 20,
                //... For dynamic height
              }}>
                <View style={Styles.background} />

                <TextInput
                  ref='email'

                  style={Styles.textInput}
                  keyboardType="email-address"

                  onChangeText={this.handleemail}
                  placeholder="Email"
                  placeholderTextColor={loginheaderColor}
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  onSubmitEditing={(event) => { this.refs.pwd.focus(); }}

                />
              </View>

              <View style={{
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 20,
                //... For dynamic height
              }}>
                <View style={Styles.background} />

                <TextInput
                  ref='pwd'

                  style={Styles.textInput}
                  secureTextEntry={true}

                  onChangeText={this.handlepwd}
                  placeholder="Password"
                  placeholderTextColor={loginheaderColor}
                  underlineColorAndroid="transparent"
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
              </View>
              <TouchableOpacity onPress={() => {
                this.proceed(this.state.first)
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
                  <Text style={{ color: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>REGISTER
  </Text>
                </View>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>

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
export default RegisterScreen;