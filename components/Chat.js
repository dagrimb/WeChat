// The Chat component renders the UI for the chat screen 

import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'; // import Bubble component and GiftedChat library
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebase = require('firebase');
require('firebase/firestore'); // import Firestore

class Chat extends React.Component {
  
  constructor(props) { 
    super(props);
    this.state = { // initialize state within constructor
      title: '',
      messages: [], // empty array for storing both static and user generated messages
      name: this.props.route.params.name, // set name var to name state object sent from Start component
      uid: 0, // set unique id for each message
      loggedInText: 'Please wait, you are getting logged in', // message while waiting for message object
      user: {
        _id: '',
        name: '',
        avatar: ''
      }
    };
    
    // initialize Firestore chat database with generated configuration object
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyB5hJFxCFgAAAvTQW6f8NhVMcCP7RKEzm4",
        authDomain: "chat-2c54a.firebaseapp.com",
        projectId: "chat-2c54a",
        storageBucket: "chat-2c54a.appspot.com",
        messagingSenderId: "968431307052",
        appId: "1:968431307052:web:baa4648c0cec93a68b0489",
        measurementId: "G-85NDTNLC2E"
      });
    }
    this.referenceChatMessages = null;
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || []; // use await operator to wait for asyncStorage promise; use getItem method
      this.setState({                                         // to read to read the messages in storage
        messages: JSON.parse(messages) // convert saved string into object
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() { // called right after component mounts
    const name = this.props.route.params.name; // set name var to name state object sent from Start component
    this.props.navigation.setOptions({ title: name }); // set navigation title to user name
    this.referenceChatMessages = firebase.firestore().collection("messages"); // create reference to Firestore "messages" collection
    this.stopUpdates(); // call stopUpdates
    this.getMessages(); // call getMessages
  }

  stopUpdates() {
    //create user authentication
      // "firebase.auth" = call to Firebase Auth service for app
      // "onAuthStateChanged" = called when user's sign-in status changes
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => { 
        if (!user) { // ensure that user is signed in
          firebase.auth().signInAnonymously();
        }
      this.setState({ // make user state current user
        uid: user.uid, // set value of current unique id
        user: {
          _id: user.uid,
          name: this.state.name,
          avatar: 'https://placeimg.com/140/140/any'
        },
        messages: [],
        loggedInText: `Logged in as ${this.state.name}` // message upon being logged in
      });
      this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() { 
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => { // "querySnapshot" = snapshot of all date being updated
    const messages = []; // existing messages array
    // go through each document
    querySnapshot.forEach((doc) => { // loop over documents inside of snapshot with forEach loops, saving each field of each document
      // in the messages object
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }        
      });
    });  
    this.setState({
      messages,
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({ // previousState is reference to state at time of change
      messages: GiftedChat.append(previousState.messages, messages), // // append new message to message object
    }));
    this.addMessages(messages) // save a message object to Firestore when a user sends a message
    this.savemessages(); // save the message objects state into asyncStorage
  }

  addMessages(messages) { // store messages in collection
    this.referenceChatMessages.add({
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
      user: messages[0].user
    });
  }

  async saveMessages() { // save message data in storage
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages)); // convert message object into a string (for storage)
    } catch (error) {
      console.log(error.message);
    }
  }

  // ensure that user's message will be displayed in bubble of a certain color
  renderBubble = (props) => {
    return (
      <Bubble
        {...props} // inherit props
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
          left: {
            backgroundColor: '#FF0000',
          }
        }}
      />
    )
  }
  
  render() { // code for rendering chat UI
    let backgroundColor = this.props.route.params.backgroundColor; // set backgroundColor var to backgroundColor state object sent from Start component

    return (    
      <View
        style={{ flex: 1, backgroundColor: backgroundColor}}>
        <Text
          style={{ color: '#0000FF' }}>
          {this.state.loggedInText}
        </Text> 
        <GiftedChat
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: this.state.user.name,
            avatar: 'https://placeimg.com/140/140/any'
          }}
        />
      {/* Add component if device is an Android */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
      }  
      </View>
    )
  }
}

export default Chat;