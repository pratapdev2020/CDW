import React from 'react';
import {
  StyleSheet
} from 'react-native';

const styles1 = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  drawerHeadicon: {

    width: 30,
    height: 30,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 20

  },
  drawericon: {
    width: 40,
    height: 30,


  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  drawerstyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10

  },
  drawerHeadstyle: {
    flexDirection: 'row',
    backgroundColor: '#D45739',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  drawerHeadviewText: {
    color: 'white',
    fontSize: 15,
    width: 200,

    textAlign: 'center',
    textAlignVertical: "center",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  underlineTextContainer: {
    textDecorationLine: "underline",

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center'
  },
  buttonBlackText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 25
  },
  buttonBlackText2: {
    color: 'black',
    fontSize: 15,
    marginLeft: 20
  },
  buttonBlackText3: {
    color: 'black',
    fontSize: 15,
    marginLeft: 27
  },
  viewText: {
    color: 'blue',
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10
  },
  item: {

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    margin: 2,
    borderBottomColor: '#2a4944',
    borderBottomWidth: 1,
    backgroundColor: 'lightgray'
  },

});

export default styles1;