import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight, ScrollView } from 'react-native';
import style from '../styles/stylecomp.js';
import { Font } from 'expo';

export default class WaterGlass extends React.Component {
  constructor () {
    super();
    this.state = {
      width: 50,
      height: 50
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Oswald-Bold': require('../Assets/Fonts/Oswald-Bold.ttf'),
      'Oswald-Medium': require('../Assets/Fonts/Oswald-Medium.ttf'),
      'Oswald-Regular': require('../Assets/Fonts/Oswald-Regular.ttf'),
      'Oswald-SemiBold': require('../Assets/Fonts/Oswald-SemiBold.ttf'),
      'SourceSansPro-Light': require('../Assets/Fonts/SourceSansPro-Light.ttf'),
      'SourceSansPro-Regular': require('../Assets/Fonts/SourceSansPro-Regular.ttf')
    });
  }

  render () {
    const maxheight = () => {
      if (this.props.total > 120){
        return 110;
      } else if (this.props.total < 120){
        return this.props.total;
      }
    }
    return (
      <View style = {{flex: 0, alignItems: "center", justifyContent: "center"}}>
        <Text style = {{backgroundColor: "transparent", fontFamily: 'SourceSansPro-Regular', textAlign: "center", fontSize: 20, marginBottom: 10}}>{this.props.text}</Text>
          <View style = {{flex: 0, width: 60, height: 120, borderWidth: 5, borderTopWidth: 0, borderBottomWidth: 5, borderColor: "gray", justifyContent: "flex-end"}}>
            <View style = {{width: 50, height: maxheight(), backgroundColor: "rgba(150, 190, 255, .7)"}}>
            </View>
          </View>
          <View style={{flex: 0, alignItems: 'center'}}>
            <Text style = {{backgroundColor: "transparent", fontFamily: 'SourceSansPro-Regular', fontSize: 17}}>{this.props.total} oz</Text>
          </View>
      </View>
    )
  }
}
