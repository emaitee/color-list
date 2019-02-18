import React from 'react';
import { AppRegistry, StyleSheet, View, Alert } from 'react-native';
import ColorList from './components/ColorList'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ColorList onColorSelected={color => Alert.alert(color)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})

AppRegistry.registerComponent('App', () => App);
