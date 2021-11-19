import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: ''
    };
  }

  render() {
    let name = this.props.route.params.name; // set name var to name state object sent from Start component
    this.props.navigation.setOptions({ title: name }); // set navigation title to user name
    let backgroundColor = this.props.route.params.backgroundColor; // set backgroundColor var to backgroundColor state object sent from Start component

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor}}>
        <Text
          style={{fontWeight: 'bold', color: 'red'}}
        >Welcome, {name}!</Text>
      </View>
    )
  }
}