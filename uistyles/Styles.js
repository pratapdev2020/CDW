import React from 'react';
import {
  StyleSheet, Platform
} from 'react-native';

const Styles = StyleSheet.create({

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container:
  {

    flex: 1,
    justifyContent: 'center',
    //   paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,    
  },
  containerr:
  {

    flex: 1,
    backgroundColor: 'white'
    //justifyContent: 'center',

    //   paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,    
  },
  imageStyle: {

    width: '100%',
    height: '100%',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  gridItem: {
    margin: 5,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbutton: {
    marginTop: 20,
    height: 50,
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00773E',
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',


  },
  pickerbutton: {
    height: 40,
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00773E',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'


  },
  signupbutton: {
    height: 50,
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    backgroundColor: '#00773E',
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',


  },
  headerButton: {
    height: 40,
    alignSelf: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#00773E',
    borderRadius: 25,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',


  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16, fontFamily: 'Helvetica',
    textAlign: 'center'


  },
  infobuttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 13, fontFamily: 'Helvetica',
    textAlign: 'center'


  },
  textInput: {
    flex: 1,
    color: 'white',
    zIndex: 1,
    paddingLeft: 10,


  },
  EditSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDED6',
    borderWidth: .5,
    borderColor: 'black',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black', opacity: .2,
    borderRadius: 10
  },
  DateSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFDED6',
    borderWidth: .5,
    borderColor: 'black',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
  },

  captchaSectionStyle: {
    backgroundColor: '#FFF5E8',
    borderWidth: .5,
    borderColor: 'black',
    height: 40,
    borderRadius: 25,
    width: '50%',
    alignSelf: 'flex-end'
  },
  nameSectionStyle: {
    backgroundColor: '#FFDED6',
    borderWidth: .5,
    borderColor: 'black',
    height: 40,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10
  },
  textSectionStyle: {
    backgroundColor: 'white',
    elevation: 10,
    margin: 10

  },
  multiSectionStyle: {
    backgroundColor: '#FFF5E8',
    borderWidth: .5,
    borderColor: 'black',
    height: 80,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    alignSelf: 'center'
  },
  dropdownStyle:
  {

    height: 40,
    alignSelf: 'flex-end',
    color: 'gray',
    marginTop: 5,
    backgroundColor: '#FFDED6',
    borderWidth: 5
  },
  headerText:
  {
    alignItems: 'center', color: 'blue', fontSize: 14, textAlign: 'center', fontFamily: 'Helvetica'
  },
  selectoptionbutton: {
    margin: 10,
    height: 40,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#f07e25',
    borderRadius: 10


  },
  labelText:
  {
    color: 'black', textAlign: 'center', fontSize: 10, marginTop: 5, fontFamily: 'Helvetica',
  },
  screenHeaderText:
  {
    alignItems: 'center', color: 'white', fontSize: 15, textAlign: 'center', fontFamily: 'Helvetica'
  },

  buttonText1:
  {

    justifyContent: 'center',
    alignSelf: 'center'
  },
  bottomGroupchatView: {

    width: '100%',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,


  },
  groupChatStyle: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    paddingLeft: 60,
    paddingRight: 60,
    borderColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  },
  WebViewContainer: {

    marginTop: (Platform.OS == 'ios') ? 20 : 0,
    padding: 10
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },

});


export default Styles;