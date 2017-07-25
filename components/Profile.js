import React, { Component } from 'react';
import { TextInput, ScrollView, AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image, Animated } from 'react-native';
import { StackNavigator } from 'react-navigation';
import WaterGlass from './WaterGlass.js';

export default class Profile extends Component {
  constructor () {
    super();
    this.state = {
      id: 0,
      totalamount: [],
      newamount: 0,
      scale: 1,
      AniScale : new Animated.Value(1)    
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.addWater = this.addWater.bind(this);
    this.subWater = this.subWater.bind(this);
    this.totalWater = this.totalWater.bind(this);
  }

  static navigationOptions = {header:null}

  async componentWillMount () {
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
    }, () => {
      this.totalWater(this.state.totalamount)
    });
  }

  totalWater (array) {
    let today = new Date;
    let dailyTotal = [];
    let total = 0;
    array.forEach((element) => {
      let timeIndex = element.created_at.indexOf('T');
      let firstDate = element.created_at.substring(timeIndex - 2, timeIndex);
      let secondDate = today.getDate();

      if (parseInt(firstDate) === secondDate) {
        dailyTotal.push(element.amount);
      }
    })
    dailyTotal.forEach((element) => {
      total += parseInt(element);
    })
    this.setState({dailyTotal: total});
  }

  addWater () {
    this.setState({newamount: this.state.newamount += 2}, ()=>{
      this.setState({
        scale: (this.state.newamount/4) * 1
      }, ()=>{Animated.timing(this.state.aniScale,
        {
          toValue: (this.state.newamount/4) *1,
          duration: 400
        }).start();
      });
    })
  }

  subWater () {
    if (this.state.newamount === 2) {
      return;
    } else {
      this.setState({newamount: this.state.newamount -= 2}, ()=>{
        this.setState({
          scale: (this.state.newamount/4) * 1
        });
      })
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
      this.totalWater(this.state.totalamount);
    });
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <View style = {{flex: 1, backgroundColor: "#9bf5f7", justifyContent: "space-around", alignItems: "center"}} >
          <View style = {{flex: 1, marginTop: 60, justifyContent: "center", alignItems: 'center'}}>
            <View>
              <Text>{this.state.newamount} oz</Text>
            </View>
          </View>
          <View style = {{flex: 3, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
            <View style = {{flex: 3, justifyContent: "flex-start", alignItems: "center", marginLeft: 20, overflow: 'visible' }}>
              <TouchableHighlight onPress={this.onSubmit} style={{overflow: 'visible', transform:[{scale: this.state.scale}]}}>
                <Image source = {require ("../styles/resources/DRINKWATERlogoSmall.png")} style={ {margin:1}} />
              </TouchableHighlight>
            </View>
            <View style = {{flex: 1, justifyContent:'center', alignItems: 'center'}}>
              <View style = {{flex: 1}}>
                <TouchableHighlight onPress ={this.addWater}>
                  <View style = {{width: 40, height: 40, backgroundColor: "#ff3b00", alignItems: "center", justifyContent:'center'}}>
                    <Text style = {{color: 'white'}}>+</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style = {{flex: 1}}>
                <TouchableHighlight onPress = {this.subWater}>
                  <View style = {{width: 40, height: 40, backgroundColor: "#ff3b00", alignItems: "center", justifyContent:'center'}}>
                    <Text style = {{color: 'white'}}>-</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <View style = {{flex: 1, backgroundColor: "#ca83f7", alignItems: "center", justifyContent: "space-around"}}>
          <WaterGlass />
          <Button
          onPress= { () => {this.props.navigation.navigate('Home')}}
          title="Logout"
          color="#841584" />
        </View>
      </View>
    );
  }
}
