import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Alert, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
// Import screens for navigation
import Home from './components/Home';
import Chat from './components/Chat';


const Stack = createStackNavigator();

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state ={
      text: '',
    }
  }

  alertMyText (input = []) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={Home} />
          <Stack.Screen
            name="Chat"
            component={Chat} />
        </Stack.Navigator>
      
        {/* <View style={styles.container}>
          <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder='Type here ...'
          />
          <Text>You wrote: {this.state.text}</Text>
          <Button
            onPress={() => {
              this.alertMyText({text: this.state.text});
            }}
            title="Press Me"
            />
        </View> */}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex:10,
    backgroundColor: 'blue'
  },
  box2: {
    flex:120,
    backgroundColor: 'red'
  },
  box3: {
    flex:50,
    backgroundColor: 'green'
  }
});
