import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, View, ImageBackground, Text, AsyncStorage, Alert, BackHandler, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import images from '../util/img';
import Styles from '../uistyles/Styles';
import { StackActions, NavigationActions } from 'react-navigation';


import { CheckBox } from 'react-native-elements'
import { loginheaderColor, loginURL } from '../util/AppConstants';

class LoginScreen extends Component {
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




  };


  async getNoLocal() {

    let userEmail = await AsyncStorage.getItem('userEmail');
    let userPwd = await AsyncStorage.getItem('userPwd');
    let userCheck = await AsyncStorage.getItem('userCheck');
    console.log("USER CHECK LOCAL", JSON.parse(userCheck));

    if (JSON.parse(userCheck) == true) {
      this.setState({

        email: userEmail,
        pwd: userPwd,
        checked: userCheck,



      });
    }
  }


  componentDidMount() {

    StatusBar.setHidden(false);
    this.getNoLocal();


  }
  handleemail = (text) => {
    this.setState({ email: text })
  }
  handlepwd = (text) => {
    this.setState({ pwd: text })
  }
  proceed = (email) => {
    if (email == '') {
      alert('Enter your email ID');
    }
    else if (this.state.pwd == '') {
      alert('Enter your password');

    }



    else {

      
      this.callloginAPI();

    }
  }
  callloginAPI = async () => {
    console.log("USER CHECK", this.state.checked);


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
          // alert("You have loggedin successfully.");
          AsyncStorage.setItem('userId', '' + response.id);
          AsyncStorage.setItem('userToken', response.token);

          AsyncStorage.setItem('userFirstNm', response.firstName);
          AsyncStorage.setItem('userLastNm', response.lastName);
          AsyncStorage.setItem('userEmail', response.email);
          AsyncStorage.setItem('userPwd', this.state.pwd);
          AsyncStorage.setItem('userCheck', JSON.stringify(this.state.checked));
          this.finishPreviousScreens('DashboardScreen');
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
              //  onChangeText = {this.handlePassword}
              keyboardType="email-address"
              value={this.state.email}

              onChangeText={this.handleemail}
              placeholder="User ID"
              placeholderTextColor={loginheaderColor}
              underlineColorAndroid="transparent"
              returnKeyType="next"
              blurOnSubmit={false}


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
            //... For dynamic height
          }}>
            <View style={Styles.background} />

            <TextInput
              ref='lname'
              style={Styles.textInput}

              value={this.state.pwd}
              secureTextEntry={true}

              onChangeText={this.handlepwd}
              placeholder="Password"
              placeholderTextColor={loginheaderColor}
              underlineColorAndroid="transparent"
              returnKeyType="done"
              fontFamily='Helvetica'
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
              <Text style={{ color: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>LOGIN
  </Text>
            </View>
          </TouchableOpacity>

          <View style={{
            flexDirection: 'row', marginLeft: 10, marginTop: 20, width: '90%',
            alignSelf: 'center', alignItems: 'center',
            justifyContent: 'center', alignContent: 'center',
            marginRight: 10,
          }}>
            <CheckBox
              checkedColor="white"
              activeOpacity={1}

              containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
              textStyle={{ color: loginheaderColor, fontWeight: 'normal', fontSize: 13 }}
              style={{ flex: 1 }}

              title='Remember Me'
              size={18}
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />

            <TouchableOpacity style={{ flex: 1, color: loginheaderColor, fontSize: 13 }}
              delayLongPress={3800}
              onPress={() => {



                this.props.navigation.navigate('ForgotPasswordScreen');
              }} >
              <Text style={{ color: loginheaderColor, fontSize: 13 }}>Forgot Password?</Text>
            </TouchableOpacity>

          </View>
        
        

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
export default LoginScreen;