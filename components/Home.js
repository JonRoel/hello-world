import React, { useState, useEffect } from 'react';
import { View, Text,TextInput, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Set the Background Image
const background = require('../assets/Background-Image.png');
// Background color options - Green, Blue, Purple, Gray, White
const colors = ['#408337', '#3a5d84', '#78519d', '#606670', '#FFFFFF'];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      backgroundColor: '#408337',
    }
  }

  // Check for username
  onGoToChat = (name, backgroundColor) => {
    if(name == '') {
      return Alert.alert('Please enter your name.');
    }
    this.props.navigation.navigate('Chat', {
      name: `${name}`,
      backgroundColor: `${backgroundColor}`,
    });
  };

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
              accessible={true}
              accessibilityLabel="Select Background Color"
              accessibilityHint="Sets your chat screens background color."
              accessibilityRole="button"

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
              accessible={true}
              accessibilityLabel="Go to chat"
              accessibilityHint="Takes you to the chat screen."
              accessibilityRole="button"
              style={styles.button}
              onPress={() => this.onGoToChat(this.state.name, this.state.backgroundColor)}>  
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
    flex: 0.4,
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
    flex: 0.6,
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