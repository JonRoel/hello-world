import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat'

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
      // these are sample messages
      messages: [
        // System Message that displays welcome back
        {
          _id: 2,
          text: `Welcome back ${this.props.route.params.name}`,
          createdAt: new Date(),
          system: true,
        },
        // Received sample message #1
        {
          _id: 1,
          text: 'Hows it going?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        //Received Sample message #2
        {
          _id: 3,
            text: 'Hey there buddy!',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
          }
        }
      ],
    })
  }

  // Funciton to send messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // Sets System Message color
  renderSystemMessage(props) {
    let backgroundColor = this.props.route.params.backgroundColor;
    if (backgroundColor !== '#FFFFFF') {
      return (
        <SystemMessage
          {...props}
          textStyle={{ color: '#FFFFFF' }}
          timeTextStyle={{ color: '#FFFFFF' }}
        />
      );
    }
  }

  // Sets message bubble color
  renderBubble(props) {
    let backgroundColor = this.props.route.params.backgroundColor;
    if (backgroundColor === '#FFFFFF') {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#2d63d3' },
            left: { backgroundColor: '#7e7e7e' }
          }}
          textProps={{
            style: { color: 'white' }
          }}
          timeTextStyle={{ 
            right: { color: '#f0f0f0' },
            left: { color: '#f0f0f0' }
          }}
        />
      )
    } else {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        />
      )
    }
  }

  render() {
    // Brings params over from home screen name and background color selected
    let { name, backgroundColor } = this.props.route.params;

    // Sets the entered name as the title in the Chat screen
    //this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]}>
        <View style={styles.chatArea}>
          <GiftedChat
            messages={this.state.messages}
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            onSend={messages => this.onSend(messages)}
            isTyping={true}
            infiniteScroll={true}
            loadEarlier={true}
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