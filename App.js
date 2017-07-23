import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomePage from './components/Homepage.js';
import Comp1 from './components/Comp1.js';

const App = StackNavigator({
  Home: { screen: HomePage },
  Main: { screen: Comp1 }
})

export default App;
