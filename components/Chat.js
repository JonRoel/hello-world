import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat'

import firebase from 'firebase';
import firestore from 'firebase';

// Firebase config details
const firebaseConfig = {
  apiKey: "AIzaSyDmnQeUKCg9d8R-EAu6QbWrKHd45IG0XIA",
  authDomain: "chat-app-dd758.firebaseapp.com", 
  projectId: "chat-app-dd758",
  storageBucket: "chat-app-dd758.appspot.com",
  messagingSenderId: "718394990176",
}

// The applications main chat component that renders the UI
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'Logging in...',
      user: {
        _id: '',
        name: '',
      },
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceMessageUser = null;
  }

  componentDidMount() {
    // Call user name
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: `${name}` });
    
    // create reference to messages collection
    //this.referenceMessages = firebase.firestore().collection('messages');

    // listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }

      // Update user state with active user
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        }
      }); 

      // Create reference to the active users messages
      this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

      // Listen for collection changes
      //this.unsubscribeMessagesUser = this.referenceMessagesUser.onSnapshot(this.onCollectionUpdate);
      this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    //this.unsubscribeMessagesUser();
  }

  // Add messages to database
  addMessages() { 
    const message = this.state.messages[0];
    // add a new messages to the collection
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    });
  }

  // Funciton to send messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    // Make sure to call addMessages so they get saved to the server
    () => {
      this.addMessages();
    })
  }

  // Retrieve current messages and store them in the state: messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({ 
      messages,
   });
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
    let { backgroundColor } = this.props.route.params;

    return (
      <View style={[styles.bgcolor(backgroundColor), styles.container]}>
        <View style={styles.chatArea}>
          <GiftedChat
            messages={this.state.messages}
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            onSend={messages => this.onSend(messages)}
            isTyping={true}
            user={this.state.user}
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