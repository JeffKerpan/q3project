import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight, ScrollView } from 'react-native';
import style from '../styles/stylecomp.js';

export default class WaterGlass extends React.Component {

  constructor () {
    super();
    this.state = {
      width: 50,
      height: 50
    }
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
