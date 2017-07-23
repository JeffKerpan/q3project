import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class ActivityIndicatorE extends Component {

   state = { animating: true }

   closeActivityIndicator = () => setTimeout(() => this.setState({ animating: false }), 10000)

   componentDidMount = () => this.closeActivityIndicator()

   render() {
      const animating = this.state.animating
      return (
         <View>
            <ActivityIndicator
               animating = {animating}
               color = 'blue'
               size = "large"
            />
         </View>
      )
   }
}

export default ActivityIndicatorE
