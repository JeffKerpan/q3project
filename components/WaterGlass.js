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
    return (
      <View>
        <View style = {{flex: 0, width: 60, height: 120, borderWidth: 3, borderColor: "gray", justifyContent: "flex-end"}}>
        <Text>{this.props.total}</Text>
          <View style = {{width: 54, height: 60, backgroundColor: "rgba(150, 190, 255, .7)"}}>
          </View>
        </View>
      </View>
    )
  }
}
