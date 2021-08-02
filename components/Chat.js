import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

// The applications main chat component that renders the UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      // Keep message initial state empty
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey there, buddy!',
          createdAt: new Date(),
          isTyping: true,
          infiniteScroll: true,
          loadEarlier: true,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Welcome back fancy pants',
          createdAt: new Date(),
          system: true,
        }
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
        }}
      />
    );
  }

  render() {
    // Brings params over from home screen name and background color selected
    let { name, backgroundColor } = this.props.route.params;

    // Sets the entered name as the title in the Chat screen
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]}>
        <View style={styles.chatArea}>
          <GiftedChat
            messages={this.state.messages}
            renderBubble={this.renderBubble.bind(this)}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
  },
  // Brings over selected background color selected in home screen
  bgcolor: (backgroundColor) => ({
    backgroundColor: backgroundColor,
  }),
  chatArea: {
    flex: 1,
    width: '100%',
  },
});