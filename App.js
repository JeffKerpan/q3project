import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loginform from './components/loginform.js';
import style from './styles/stylecomp.js';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {
      id: 0,
      name: "Johnny Bravo",
      amounts: [],
      token: {}
    }
  }

  render() {
    return (

      <View style={style.container}>
        <Text>DRINK WATER</Text>
        <Loginform />
      </View>

    );
  }
}
