import React, { Component } from 'react';
import { TextInput, ScrollView, AppRegistry, Button, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image, NativeModules, Animated, Easing, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import style from '../styles/stylecomp.js';
import WaterGlass from './WaterGlass.js';
import { Font } from 'expo';

export default class Profile extends Component {
  constructor () {
    super();
    this.state = {
      id: 0,
      recomended: 100,
      totalamount: [],
      dailyTotal: 0,
      total: 0,
      newamount: 2,
      yesterTotal: [],
      yesteramount: 0,
      scale: 1,
      fontLoaded: false,
    }
    this.scaleValue = new Animated.Value(.5)
    this.onSubmit = this.onSubmit.bind(this);
    this.addWater = this.addWater.bind(this);
    this.subWater = this.subWater.bind(this);
    this.totalWater = this.totalWater.bind(this);
    this.yesterWater = this.yesterWater.bind(this);
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
      this.yesterWater(this.state.totalamount)
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
        toValue: Math.sqrt(this.state.newamount - this.state.newamount/1.1),
        duration: 300,
        easing: Easing.elastic(3)
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

  yesterWater (array) {
    let today = new Date;
    let dailyTotal = [];
    let total = 0;
    array.forEach((element) => {
      let timeIndex = element.created_at.indexOf('T');
      let firstDate = element.created_at.substring(timeIndex - 2, timeIndex);
      let secondDate = today.getUTCDate();
      if (parseInt(firstDate) === secondDate - 1) {
        dailyTotal.push(element.amount);
      }
    })
    dailyTotal.forEach((element) => {
      total += parseInt(element);
    })
    this.setState({yesteramount: total});
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

  calcWeight(num) {
    return num/1.7
  }


  render() {
    return (
      <View style = {{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 1, backgroundColor: '#B9E3C6'}}>
          <Text style={{marginTop: 30, fontFamily: 'SourceSansPro-Regular', fontSize: 25, color: '#FFFFF2'}}>ADD WATER</Text>
        </View>
        <View style={{flex: 4, alignSelf: 'stretch',width: null, textAlign: "center"}}>
          <View style = {{alignItems: "center"}}>
            <Text style = {{color: "grey", marginTop: 12, backgroundColor: "transparent"}}>Tap the drop to submit</Text>
          </View>
            <View style = {{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: "space-around", alignItems: 'center'}}>
              <View style = {{flex: 1, alignItems: "center", justifyContent:'flex-end'}}>
                <TouchableOpacity onPress = {this.subWater}>
                  <View style = {{width: 55, height: 55, backgroundColor: "#B9E3C6", alignItems: "center", justifyContent:'center', borderRadius: 100}}>
                    <Text style = {{color: 'white', fontSize: 40, marginBottom: 5}}>-</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style ={{flex: 1, alignItems: "center", justifyContent:'center', backgroundColor: "transparent"}}>
                <Text style={{fontFamily: 'SourceSansPro-Regular', fontSize: 30}}>{this.state.newamount} oz</Text>
              </View>
            <View style = {{flex: 1, alignItems: "center", justifyContent:'flex-start'}}>
              <TouchableOpacity onPress = {this.addWater}>
                <View style = {{width: 55, height: 55, backgroundColor: "#1FE4AD", alignItems: "center", justifyContent:'center', borderRadius: 100}}>
                  <Text style = {{color: 'white', fontSize: 30, marginBottom: 5}}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style = {{flex: 3, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
            <View style = {{flex: 3, justifyContent: "flex-start", alignItems: "center", overflow: 'visible' }}>
              <Animated.View style = {{transform:[{scale: this.scaleValue}]}}>
                <TouchableOpacity onPress = {this.onSubmit} style={{overflow: 'visible',flex: 1, alignItems: "center", justifyContent:'center'}}>
                  <Image source = {require ("../styles/resources/DRINKWATERlogoSmall.png")} style={ {margin:1}} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
        <Image source={require('../styles/resources/drink-water-bg2.png')} style={{flex: 4, alignSelf: 'stretch',width: null}}>
          <View style = {{flex: 1, justifyContent: "space-between"}}>
            <View style={{marginTop: 30, flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
              <WaterGlass total = {this.state.yesteramount} text = {"Yesterday"} />
              <WaterGlass total = {this.state.dailyTotal} text = {"Today"} />
              <WaterGlass total = {this.state.recomended} text = {"Advised"} />
            </View>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style = {{color: "grey", marginTop: 12, backgroundColor: "transparent"}}>*Do not consume more than 40oz per hour.</Text>
              <TouchableOpacity onPress={this.onLogout} style={style.logoutButton}>
                <Text style={{fontFamily: 'SourceSansPro-Regular', color: '#FFFFF2', fontSize: 16}}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}
