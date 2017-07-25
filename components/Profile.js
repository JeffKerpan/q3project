import React, { Component } from 'react';
import { TextInput, ScrollView, AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Profile extends Component {
  constructor () {
    super();
    this.state = {
      id: 1,
      totalamount: [],
      newamount: 0
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.addWater = this.addWater.bind(this);
    this.subWater = this.subWater.bind(this);
  }

  static navigationOptions = {header:null}

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

  addWater () {
    this.setState({newamount: this.state.newamount += 2})
  }

  subWater () {
    if (this.state.newamount === 0) {
      return;
    } else {
      this.setState({newamount: this.state.newamount -= 2})
    }
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
      <View style = {{flex: 1}}>
        <View style = {{flex: 1, backgroundColor: "#9bf5f7", justifyContent: "space-around", alignItems: "center"}} >
          <View style = {{flex: 1, marginTop: 60}}>
            <Text>{this.state.newamount}</Text>
          </View>
          <View style = {{flex: 2, flexDirection: "row", justifyContent: "center"}}>
            <View style = {{flex: 3, justifyContent: "center", alignItems: "center"}}>
              <TouchableHighlight onPress={this.onSubmit}>
                <Image source = {require ("../styles/resources/DRINKWATERlogoSmall.png")} />
              </TouchableHighlight>
            </View>
            <View style = {{flex: 1}}>
              <View style = {{flex: 1}}>
                <TouchableHighlight onPress ={ this.addWater}>
                  <View style = {{width: 40, height: 40, backgroundColor: "#ff3b00", alignItems: "center"}}>
                    <Text style = {{color: 'white'}}>+</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style = {{flex: 1}}>
                <TouchableHighlight onPress = {this.subWater}>
                  <View style = {{width: 40, height: 40, backgroundColor: "#ff3b00", alignItems: "center"}}>
                    <Text style = {{color: 'white'}}>-</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <View style = {{flex: 1, backgroundColor: "#ca83f7"}}>
          <Button
          onPress= { () => {this.props.navigation.navigate('Home')}}
          title="Logout"
          color="#841584" />
        </View>
      </View>
    );
  }
}
