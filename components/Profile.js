import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Profile extends Component {

  render() {
    return (
      <View>
        <Text>IM A COMPONENT</Text>
        <Text>{this.props.navigation.state.params.userId}</Text>
      </View>
    );
  }
}
