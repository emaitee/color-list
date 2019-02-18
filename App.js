import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './AppNavigator'
// import Products from './components/products/Products'

const App = () => <AppNavigator />

export default App

AppRegistry.registerComponent('App', () => App);
