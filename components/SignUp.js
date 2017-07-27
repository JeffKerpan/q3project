import React, { Component } from 'react';
import { TextInput, AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image, AsyncStorage, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from '../styles/stylecomp.js';
import { Font } from 'expo';

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
    }, async () => {
      let userId = this.state.id.toString()
      try {
        await AsyncStorage.setItem('@UserId:key', userId);
      } catch (error) {
        console.log(error);
      }
      this.props.navigation.navigate('Main', { userId: this.state.id})
    });
  }

//   scrolldown () {
//   this.refs.scrollView.scrollTo(width*2/3);
// }

  render() {
    return (
      <ScrollView style={{flex: 1}} ref="scrollView">
        <Image source={require('../styles/resources/drink-water-bg2.png')} style={style.backGround}>
            <Text style = {{backgroundColor: "transparent"}}>Sign Up Page</Text>
            <TextInput ref="myInput"
            onFocus={this.scrolldown} value={this.state.firstname} style={style.form} onChangeText={(value) => this.setState({firstname: value})} placeholder="firstname" />
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
        </Image>
      </ScrollView>
    );
  }
}
