import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Comp1 from './components/Comp1.js';
import style from './styles/stylecomp.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text>DRINK WATER</Text>
        <Comp1 />
      </View>
    );
  }
}
