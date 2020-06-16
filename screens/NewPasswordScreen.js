import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, View, ImageBackground, Text, KeyboardAvoidingView, ScrollView, BackHandler, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import images from '../util/img';
import Styles from '../uistyles/Styles';
import { StackActions, NavigationActions } from 'react-navigation';

import { loginheaderColor, loginURL } from '../util/AppConstants';

class NewPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state;

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

    const token = this.props.navigation.getParam('token', 'nothing sent');
    StatusBar.setHidden(false);


  }
  handlepwd = (text) => {
    this.setState({ pwd: text })
  }
  handlecpwd = (text) => {
    this.setState({ cpwd: text })
  }
  proceed = (pwd) => {
    if (pwd == '') {
      alert('Enter your new password');
    }
    else if (this.state.cpwd == '') {
      alert('Enter your new password');
    }
    else if (this.state.cpwd != pwd) {
      alert('Both passwords do not match');
    }

    else {

      this.callSetPwdAPI();

    }
  }
  callSetPwdAPI = async () => {


    this.setState({
      isLoading: true
    });



    const response = await fetch(
      loginURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

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


          alert('You have entered ' + response.message);

        }

        else {
          alert("You have loggedin successfully.");

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
    const { navigate } = this.props.navigation;

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

              <View style={{ flexDirection: "column", alignSelf: 'center', marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16 }}>New Password</Text>
                <View style={{ backgroundColor: '#F85862', width: 50, height: 2, marginTop: 8 }}>
                </View>
              </View>

              <View style={{
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 60, //... For dynamic height
              }}>
                <View style={Styles.background} />

                <TextInput
                  ref='pwd'
                  style={Styles.textInput}

                  secureTextEntry={true}
                  value={this.state.pwd}

                  onChangeText={this.handlepwd}
                  placeholder="New Password"
                  placeholderTextColor={loginheaderColor}
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  blurOnSubmit={false}


                  onSubmitEditing={(event) => { this.refs.cpwd.focus(); }}
                />
              </View>
              <View style={{
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 30, 
                
              }}>
                <View style={Styles.background} />

                <TextInput
                  ref='cpwd'
                  style={Styles.textInput}

                  secureTextEntry={true}

                  value={this.state.cpwd}

                  onChangeText={this.handlecpwd}
                  placeholder="Confirm Password"
                  placeholderTextColor={loginheaderColor}
                  underlineColorAndroid="transparent"
                  returnKeyType="done"
                  blurOnSubmit={true} />
              </View>

              <TouchableOpacity onPress={() => {
                this.proceed(this.state.pwd)
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
export default NewPasswordScreen;