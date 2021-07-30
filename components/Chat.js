import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

// The applications main chat component that renders the UI
export default class Chat extends React.Component {

  render() {
    // Brings params over from home screen name and background color selected
    let { name, backgroundColor } = this.props.route.params;

    // Sets the entered name as the title in the Chat screen
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]}>
        <View>
          <Text>Hello Screen2!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  // Brings over selected background color in home screen
  bgcolor: (backgroundColor) => ({
    backgroundColor: backgroundColor,
  }),
});