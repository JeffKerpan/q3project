import React, { Component } from 'react';
import { TextInput, ScrollView, AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image, NativeModules, Animated, Easing, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from '../styles/stylecomp.js';
import WaterGlass from './WaterGlass.js';
import { Font } from 'expo';

export default class Profile extends Component {
  constructor () {
    super();
    this.state = {
      id: 0,
      totalamount: [],
      dailyTotal: 0,
      total:0,
      newamount: 2,
      scale: 1,
      fontLoaded: false,
    }
    this.scaleValue = new Animated.Value(.5)
    this.onSubmit = this.onSubmit.bind(this);
    this.addWater = this.addWater.bind(this);
    this.subWater = this.subWater.bind(this);
    this.totalWater = this.totalWater.bind(this);
    this.scale = this.scale.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  static navigationOptions = {header:null}

  async componentWillMount () {
    let userId = this.props.navigation.state.params.userId;
    let response = await
    fetch(`https://drink-water-api.herokuapp.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    let jsonResponse = await response.json()
    this.setState({
      id: userId,
      totalamount: jsonResponse
    }, () => {
      this.totalWater(this.state.totalamount)
    });
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
    this.setState({ fontLoaded: true })
  }

  scale () {
    Animated.timing(
      this.scaleValue,
      {
        toValue: Math.sqrt(this.state.newamount - this.state.newamount/1.2),
        duration: 300,
        easing: Easing.bounce
      }
    ).start()
  }

  async onLogout (){
    try {
      await AsyncStorage.removeItem('@UserId:key');
      this.props.navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }

  }

  totalWater (array) {
    let today = new Date;
    let dailyTotal = [];
    let total = 0;
    array.forEach((element) => {
      let timeIndex = element.created_at.indexOf('T');
      let firstDate = element.created_at.substring(timeIndex - 2, timeIndex);
      let secondDate = today.getUTCDate();
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
      this.scale();
      this.setState({scale: (this.state.newamount/4) * 1})
    })
  }

  subWater () {
    if (this.state.newamount === 2) {
      return;
    }
    this.setState({newamount: this.state.newamount -= 2}, ()=>{
      this.scale();
      this.setState({scale: (this.state.newamount/4) * 1 });
    })
  }

  async onSubmit () {
    let userId = this.props.navigation.state.params.userId;
    let response = await
    fetch(`https://drink-water-api.herokuapp.com/users/${userId}`, {
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
      newamount: 2
    }, () => {
      this.scale();
      this.totalWater(this.state.totalamount);
    });
  }


  render() {
    return (
      <View style = {{flex: 1}}>
        <View style={{flex: 1, alignSelf: 'stretch',width: null}}>
          <View style = {{flex: 1, flexDirection: 'row', marginTop: 50, justifyContent: "space-around", alignItems: 'center'}}>
            <View style = {{flex: 1, alignItems: "center", justifyContent:'flex-end'}}>
              <TouchableHighlight onPress = {this.subWater}>
                <View style = {{width: 55, height: 55, backgroundColor: "#B9E3C6", alignItems: "center", justifyContent:'center', borderRadius: 100}}>
                  <Text style = {{color: 'white', fontSize: 40, marginBottom: 5}}>-</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style ={{flex: 1, alignItems: "center", justifyContent:'center', backgroundColor: "transparent"}}>
              <Text style={{fontFamily: 'SourceSansPro-Regular', fontSize: 30}}>{this.state.newamount} oz</Text>
            </View>
            <View style = {{flex: 1, alignItems: "center", justifyContent:'flex-start'}}>
              <TouchableHighlight onPress = {this.addWater}>
                <View style = {{width: 55, height: 55, backgroundColor: "#1FE4AD", alignItems: "center", justifyContent:'center', borderRadius: 100}}>
                  <Text style = {{color: 'white', fontSize: 30, marginBottom: 5}}>+</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style = {{flex: 3, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
            <View style = {{flex: 3, justifyContent: "flex-start", alignItems: "center", overflow: 'visible' }}>
              <Animated.View style = {{transform:[{scale: this.scaleValue}]}}>
                <TouchableHighlight onPress = {this.onSubmit} style={{overflow: 'visible',flex: 1, alignItems: "center", justifyContent:'center'}}>
                  <Image source = {require ("../styles/resources/DRINKWATERlogoSmall.png")} style={ {margin:1}} />
                </TouchableHighlight>
              </Animated.View>
            </View>
          </View>
        </View>
        <Image source={require('../styles/resources/drink-water-bg2.png')} style={{flex: 1, alignSelf: 'stretch',width: null}}>
          <View style = {{flex: 1, alignItems: "center", justifyContent: "space-around"}}>
            <WaterGlass total = {this.state.dailyTotal} />
            <Button
            onPress= {this.onLogout}
            title="Logout"
            color="#841584" />
          </View>
        </Image>
      </View>
    );
  }
}
