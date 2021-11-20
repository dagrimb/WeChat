// The Start component renders the home screen

import React from 'react';
import { 
  ImageBackground, // import to use desired backgound on start screen
  Image, // import to use icon in TextInput
  View, // import View component (RN = of div)
  Text, // import Text component (RN = of paragraph element)
  TextInput, // import for user to enter their name
  TouchableOpacity, // import for color palletes and button
  KeyboardAvoidingView, // import so TextInput can be pressed and name can be entered
  } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; // import in case Start screen content and fonts do not load

let customFonts = {
  'Poppins-Black': require('../img/Poppins/Poppins-Bold.ttf') // import master font
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      fontsLoaded: false,
      backgroundColor: '#FFFFFF'
    };
  }

  // set the state of fontsLoaded to true upon fonts being loaded (state intially set as "false")
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true }); 
  }

  // load fonts when component mounts
  componentDidMount() {
    this._loadFontsAsync();
  }
  
  render() {
    if (this.state.fontsLoaded) {
      return (
        /* Element/styles for component's main-container */
        <View style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 10  }}> 
          <ImageBackground //Element for component's background
            source={require('../img/BackgroundImage.png')} 
            resizeMode="cover"
            style={{ flex: 1 /*justifyContent: 'space-evenly'*/}}
          >
          {/* Application main title */}  
          <Text 
            style={{ fontSize: 45, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', fontFamily: 'Poppins-Black', marginTop: 70}} 
          >
            WeChat
          </Text>
          {/* see import above for description */}
          <KeyboardAvoidingView 
            style={{ backgroundColor: '#FFFFFF', height: '20%', width: '90%', alignSelf: 'center', marginTop: 175, flex: 1, 
            justifyContent: 'space-evenly', padding: 15, marginBottom: 30}} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
            {/* Container for white box with TextInput/color pallet/nav button */}
            <View style={{ borderWidth: 1, padding: 10 }}> 
              <Image
                source={require('../img/icon.png')} 
                style={{ position: 'absolute', opacity: 0.5, marginLeft: 15, marginTop: 15 }}  
              />
              <TextInput
                style={{fontSize: 16, fontWeight: '300', color: '#757083', opacity: 1, borderColor: 'gray', marginLeft: 35, justifyContent: 'center'}}
                onChangeText={(name) => this.setState({name})} // when user enters name, change "name" state object to what they entered
                value={this.state.name} 
                placeholder="Your Name"
              />
            </View>
            <View>  
              <Text
                style={{ fontSize: 16, fontWeight: '300', color: '#757083', opacity: 1, marginBottom: 5, marginTop: 5 }}
              >
                Choose Background Color:
              </Text>
              <View
                style={{ flexDirection: 'row' }}
              >
                <TouchableOpacity // palette for Marshland
                  style={{ backgroundColor: '#090C08', width: 50, height: 50, borderRadius: 50 / 2, marginLeft: 20}}
                  onPress={() => this.setState({  backgroundColor: '#090C08' })} // setState of backgroundColor when palette pressed
                />
                <TouchableOpacity // palette for very dark grayish violet
                  style={{ backgroundColor: '#474056', width: 50, height: 50, borderRadius: 50 / 2, marginLeft: 20}}
                  onPress={() => this.setState({  backgroundColor: '#474056' })} // setState of backgroundColor when palette pressed
                />
                <TouchableOpacity // palette for dark grayish blue
                  style={{ backgroundColor: '#8A95A5', width: 50, height: 50, borderRadius: 50 / 2, marginLeft: 20}}
                  onPress={() => this.setState({  backgroundColor: '#8A95A5' })} // setState of backgroundColor when palette pressed
                />
                <TouchableOpacity // Grayish green
                  style={{ backgroundColor: '#B9C6AE', width: 50, height: 50, borderRadius: 50 / 2, marginLeft: 20}}
                  onPress={() => this.setState({  backgroundColor: '#B9C6AE' })} // setState of backgroundColor when palette pressed
                />
              </View>
            </View>
            <TouchableOpacity // navigation button
              onPress={() => this.state.name === '' ? alert('Please enter your name!') // trigger alert if user did not enter name
              : this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}  
              style={{ backgroundColor: '#757083', width: '100%', alignSelf: 'center', height: '25%', justifyContent: 'center', 
              marginTop: 10 }} // send updated name and backgroundColor states to chat component once navigated to it
            >
              <Text 
                style={{fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', alignSelf: 'center' }}
              >
                Start Chatting
              </Text>
            </TouchableOpacity>
          {/*</TouchableWithoutFeedback>*/}
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>  
    );
  } else {
    return <AppLoading />;
  }
}
}


