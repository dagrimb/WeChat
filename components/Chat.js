// The Chat component renders the UI for the chat screen 

import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'; // import GiftedChat library


export default class Chat extends React.Component {
  constructor() { 
    super();
    this.state = { // initialize state within constructor
      title: '',
      messages: []
    };
  }

  componentDidMount() { // called right after component mounts
    let name = this.props.route.params.name; // set name var to name state object sent from Start component
    this.props.navigation.setOptions({ title: name }); // set navigation title to user name
    this.setState( {
      messages: [ // set the state of "messages" with static message
        {
          _id: 1,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
              name: 'React Native',
              avatar: 'http://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({ // previousState is reference to state at time of change
      messages: GiftedChat.append(previousState.messages, messages), // // append new message to message object
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  
  render() { // code for rendering chat UI
    let name = this.props.route.params.name; // set name var to name state object sent from Start component
    let backgroundColor = this.props.route.params.backgroundColor; // set backgroundColor var to backgroundColor state object sent from Start component

    return (    
      <View
        style={{ flex: 1}}
      > 
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      {/* Add component if device is an Android */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
      }  
      </View>
    )
  }
}