import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Profile extends Component {
  constructor () {
    super();
    this.state = {
      id: 1,
      totalamount: [],
      newamount: 20
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount () {
    let response = await
    fetch(`https://drink-water-api.herokuapp.com/users/${this.state.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    let jsonResponse = await response.json()
    this.setState({
      totalamount: jsonResponse,
    });
  }

  async onSubmit () {
    let response = await
    fetch(`https://drink-water-api.herokuapp.com/users/${this.state.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: this.state.newamount
      }),
    })

    let jsonResponse = await response.json()
    this.setState({
      totalamount: jsonResponse,
      newamount: 0
    }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <View>
        <Text>IM A COMPONENT</Text>
        <Text>{this.props.navigation.state.params.userId}</Text>
        <Button onPress = {this.onSubmit}
        title="button"
        color="#841584"
        />
        <Button
        onPress= { () => {this.props.navigation.navigate('Home')}}
        title="Logout"
        color="#841584"/>
      </View>
    );
  }
}
