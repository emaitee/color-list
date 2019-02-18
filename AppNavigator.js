import React from 'react';
import ColorList from './components/ColorList';
import ColorInfo from './components/ColorInfo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WebPage from './components/WebPage'

const AppNavigator = createStackNavigator({
  Home: { screen: ColorList },
  Details: { screen: ColorInfo },
  Web: { screen: WebPage }
});

export default createAppContainer(AppNavigator)