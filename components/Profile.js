import React, { Component } from 'react';
import { TextInput, ScrollView, AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
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
      <ScrollView> //Page Level Root
        <View>//This start upper third flex 1
          <View> //this is the counter flex 1
            <Text>{this.state.newamount}</Text>
          </View>//this ends counter
          <View>//This is dropper and counter flex 2 and flex row
            <View>//this is the water drop flex 2
              <Text>{this.props.navigation.state.params.userId}</Text>
            </View>//this ends water drop
            <View>//this is the +/- flex 1 flex
              <Button onPress = {this.onSubmit}
              title="button"
              color="#841584"
              />
            </View>//this ends +/-
          </View>//this ends drop and counter
        </View>//this ends upper third flex 1
        <View>//this starts middle third flex 1
          <Button
          onPress= { () => {this.props.navigation.navigate('Home')}}
          title="Logout"
          color="#841584"/>
        </View>//this ends middle third
        <View>//this starts bottom third flex 1
        </View>//this ends bottom third
      </ScrollView>
    );
  }
}
