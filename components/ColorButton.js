import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const ColorButton = ({ backgroundColor, onSelect = f => f }) => {
  if (backgroundColor) {
    return (
      <View style={styles.row}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => onSelect(backgroundColor)}
          underlayColor="orange">
          <View style={styles.row}>
            <View style={[styles.sample, { backgroundColor }]} />
            <Text style={styles.text}>{backgroundColor}</Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.cancel}>x</Text>
      </View>
    );
  } else {
    <View>
      <Text>Start by adding a color</Text>
    </View>;
  }
};

const styles = StyleSheet.create({
  button: {
    flex:2,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(225,225,225,.8)',
  },
  cancel: {
    flex: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sample: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 5,
  },
  text: {
    fontSize: 30,
    margin: 5,
  },
});

export default ColorButton;
