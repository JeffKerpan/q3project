import React, { Component } from 'react';
import { TextInput, AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from '../styles/stylecomp.js';

export default class SignUp extends Component {

  static navigationOptions = {header:null}

  constructor () {
    super();
    this.state = {
      id: 1,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit () {
    let response = await
    fetch('https://drink-water-api.herokuapp.com/users/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        phone: parseInt(this.state.phone)
      }),
    })

    let jsonResponse = await response.json()
    this.setState({
      id: jsonResponse[0].id,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: ""
    }, () => {
      this.props.navigation.navigate('Main', { userId: this.state.id})
      console.log(this.state);
    });
  }

  render() {
    return (
      <Image source={require('../styles/resources/drink-water-bg2.png')} style={style.backGround}  resizeMode={Image.resizeMode.sretch}>
        <View>
          <Text>Sign Up Page</Text>
          <TextInput value={this.state.firstname} style={style.form} onChangeText={(value) => this.setState({firstname: value})} placeholder="firstname" />
          <TextInput value={this.state.lastname} style={style.form}
          onChangeText={(value) => this.setState({lastname: value})}      placeholder="lastname" />
          <TextInput value={this.state.email} style={style.form} onChangeText={(value) => this.setState({email: value})} placeholder="email" />
          <TextInput value={this.state.password} style={style.form}
          onChangeText={(value) => this.setState({password: value})} placeholder="password" secureTextEntry={true} />
          <TextInput value={this.state.phone} style={style.form}
          onChangeText={(value) => this.setState({phone: value})} placeholder="phone" />
          <TouchableHighlight onPress={this.onSubmit}>
            <View style={style.buttonStyle}>
              <Text style={{color: 'white'}}>Submit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}
