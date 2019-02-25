import React from 'react';
import { ListView, StyleSheet, AsyncStorage } from 'react-native';
import ColorButton from './ColorButton'
import ColorForm from './ColorForm'

// import { StackNavigator } from 'react-navigation'

export default class ColorList extends React.Component {
  static navigationOptions = {
    title: 'Available Colors'
  }
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
          if(availableColors){
            this.setState({
              availableColors,
              dataSource: this.ds.cloneWithRows(availableColors)
            })
          }
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
    const { navigate } = this.props.navigation
    const { backgroundColor, dataSource } = this.state;
    return (
      <ListView style={[styles.container, { backgroundColor }]}
        dataSource={dataSource}
        renderRow={color => (
          <ColorButton backgroundColor={color}
            onSelect={() => navigate('Details', { color })} />
        )}
        renderHeader={() => (
          <ColorForm onNewColor={this.newColor} 
            navigation={this.props.navigation}
          />
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
