import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomePage from './components/Homepage.js';
import Profile from './components/Profile.js';
import SignUp from './components/SignUp.js';

const App = StackNavigator({
  Home: { screen: HomePage },
  Main: { screen: Profile },
  SignUp: { screen: SignUp }
})

export default App;
