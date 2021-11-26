// The Chat component renders the UI for the chat screen 

import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'; // import Bubble component and GiftedChat library


const messages = [ // set the state of "messages" with static message

  {
    _id: 8,
    text: 'David has entered the chat',
    createdAt: new Date(),
    system: true,
  },
  {
    _id: 7,
    text: 'David and Alan have left the chat',
    createdAt: new Date(),
    system: true,
  },
  {
    _id: 6,
    text: 'Sounds great. See you then.',
    createdAt: new Date(),
    user: {
      _id: 1,
        name: 'David',
        avatar: 'http://placeimg.com/140/140/any',
    },
  },
  {
    _id: 5,
    text: 'Good. Was going to grab a bite to eat and see that new movie at 9:45.',
    createdAt: new Date(),
    user: {
      _id: 2,
        name: 'Alan',
        avatar: 'http://placeimg.com/140/140/any',
    },
  },
  {
    _id: 4,
    text: 'Hey. Not much. How have you been?',
    createdAt: new Date(),
    user: {
      _id: 1,
        name: 'David',
        avatar: 'http://placeimg.com/140/140/any',
    },
  },
  {
      _id: 3,
      text: 'David has entered the chat',
      createdAt: new Date(),
      system: true,
    },
    {
      _id: 2,
      text: 'Hey, whats up?',
      createdAt: new Date(),
      user: {
        _id: 2,
          name: 'Alan',
          avatar: 'http://placeimg.com/140/140/any',
      },
    },
    {
      _id: 1,
      text: `Alan has entered the chat`,
      createdAt: new Date(),
      system: true,
    },
  ]

export default class Chat extends React.Component {
  constructor() { 
    super();
    this.state = { // initialize state within constructor
      title: '',
      messages: [] // empty array for storing both static and user generated messages
    };
  }

  componentDidMount() { // called right after component mounts
    const name = this.props.route.params.name; // set name var to name state object sent from Start component
    this.props.navigation.setOptions({ title: name }); // set navigation title to user name
    this.setState( {
      messages: messages
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({ // previousState is reference to state at time of change
      messages: GiftedChat.append(previousState.messages, messages), // // append new message to message object
    }));
  }

  // ensure that user's message will be displayed in bubble of a certain color
  renderBubble(props) {
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
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      {/* Add component if device is an Android */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
      }  
      </View>
    )
  }
}