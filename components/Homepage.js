import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight, ScrollView } from 'react-native';
import style from '../styles/stylecomp.js';
import { StackNavigator } from 'react-navigation';

export default class HomePage extends React.Component {

  static navigationOptions = {header:null}

  constructor () {
    super();
    this.state = {
      id: 0,
      username: "",
      password: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(){
    let response = await fetch('https://drink-water-api.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'test'
      }),
    })

    let jsonResponse = await response.json()
    this.setState({id:jsonResponse[0].id}, ()=>{
      this.props.navigation.navigate('Main', { userId: this.state.id})
    });
  }

  render() {

    return (
      <Image source={require('../styles/resorces/drink-water-bg2.png')} style={style.backGround}  resizeMode={Image.resizeMode.sretch}>
        <View style={style.container}>
          <Image source={require('../styles/resorces/DRINKWATERlogo.png')} style={{marginBottom: 20}}></Image>
          <View style={style.splashRow}>
            <View>
              <TextInput value={this.state.username} style={style.form} onChangeText={(value) => this.setState({username: value})} placeholder="Email" />
              <TextInput value={this.state.password} style={style.form}
              onChangeText={(value) => this.setState({password: value})} placeholder="Password" secureTextEntry={true} />
            </View>
            <View>
              <TouchableHighlight onPress={this.onSubmit}>
                <View style={style.buttonStyle}>
                  <Text style={{color: 'white'}}>Submit</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('SignUp')}}>
                <View style={style.buttonStyle}>
                  <Text style={{color: 'white'}}>Sign Up</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Image>
    );
  }
}
