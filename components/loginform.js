import React, { Component } from 'react';
import {TextInput, Button, AppRegistry, StyleSheet, Text, View} from 'react-native';
import style from '../styles/stylecomp.js';

class Loginform extends Component {
  constructor () {
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

onSubmit() {
  try {
    let response = fetch('https://localhost:8300/users/create');
    return response
  } catch (e) {
    console.log("i am broken");
  }
  console.log("i am a console log")
}

  render() {
    return (

      <View>
        <TextInput value={this.state.username} style={style.form} onChangeText={(value) => this.setState({username: value})} placeholder="Username" />
        <TextInput value={this.state.password} style={style.form}
        onChangeText={(value) => this.setState({password: value})} placeholder="Password" secureTextEntry={true} />
        <Button
        onPress={this.onSubmit}
        title="Submit"
        color="#841584"/>
      </View>

    );
  }
}

export default Loginform;
