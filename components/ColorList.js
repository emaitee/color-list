import React from 'react';
import { ListView, StyleSheet, AsyncStorage } from 'react-native';
import ColorButton from './ColorButton'
import ColorForm from './ColorForm'

export default class ColorList extends React.Component {
  constructor() {
    super();

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    const availableColors = []

    this.state = {
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    };
  }

  componentDidMount(){
    AsyncStorage.getItem(
      '@ColorListStore:Colors',
      (err, data) => {
        if(err) {
          console.error('Error loading colors', err) 
        } else {
          const availableColors = JSON.parse(data)
          this.setState({
            availableColors,
            dataSource: this.ds.cloneWithRows(availableColors)
          })
        }
      }
    )
  }

  saveColors = colors => {
    AsyncStorage.setItem(
      '@ColorListStore:Colors',
      JSON.stringify(colors)
    )
  }

  // changeColor = backgroundColor => {
  //   this.setState({ backgroundColor });
  // };

  newColor = (color) =>{
    const availableColors = [...this.state.availableColors, color];
    this.setState({
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    })
    this.saveColors(availableColors)
  }

  render() {
    const { backgroundColor, dataSource } = this.state;
    return (
      <ListView style={[styles.container, { backgroundColor }]}
        dataSource={dataSource}
        renderRow={color => (
          <ColorButton backgroundColor={color}
            onSelect={this.props.onColorSelected} />
        )}
        renderHeader={() => (
          <ColorForm onNewColor={this.newColor} />
        )}
      >
        
      </ListView>
    );
  }
}

ColorList.defaultProps = {
    onColorSelected: f => f
}

// ColorList.propTypes = {
//   onColorSelected: React.PropTypes.func
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20
  },
  header: {
    backgroundColor: 'lightgrey',
    marginTop: 20,
    padding: 10,
    fontSize: 30,
    textAlign:'center'
  }, sub: {
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    fontSize: 15
  }
});
