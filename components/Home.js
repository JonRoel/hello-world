import React, { useState } from 'react';
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

// Set the Background Image
const background = require('../assets/Background-Image.png');
// Background color options - Green, Blue, Orange, Gray, White
const colors = ['#A4CE9E', '#6f8aa8', '#d3af95', '#606670', '#FFFFFF'];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      backgroundColor: '#606670',
    }
  }

  render() {
    const setColor = this.state.backgroundColor;
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Welcome!</Text>
          </View>
          <View style={styles.wrapper}>
          <TextInput 
              style={styles.namefield}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />
            <Text style={styles.text}>Select a Background Color:</Text>
            <View style={styles.colorsMenu}>
            {colors.map((selectedColor) => (
              <TouchableOpacity
                key={selectedColor}
                style={[
                  styles.colorOptions(selectedColor),
                  setColor === selectedColor ? styles.border : null,
                ]}
                activeOpacity={0.5}
                onPress={() => this.setState({ backgroundColor: selectedColor })}
              />
            ))}
          </View>
            <TouchableOpacity
              style={styles.button}  
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}>
                <Text style={styles.text}>
                  GO TO CHAT
                </Text>
              </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  titleWrapper: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',

  },
  text: {
    color: "white",
    fontSize: 16,
  },
  namefield: {
    backgroundColor: '#fff',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
  },
  wrapper: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderColor: '#ffa500',
    borderWidth: 1,
    width: '88%',
    flex: 0.7,
    alignItems: 'center',
    marginBottom: '8%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  colorsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorOptions: (selectedColor) => ({
    backgroundColor: selectedColor,
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 50,
  }),
  border: {
    borderWidth: 2,
    borderColor: '#ffa500',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#757083',
    color: '#FFFFFF',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
  },
});