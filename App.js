import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Chat from './components/Chat';
import Start from './components/Start';
import CustomActions from './components/CustomActions';
import 'react-native-gesture-handler';
// import NavigationContainer to manage app's state and link top-level navigator to rest of app
import { NavigationContainer } from '@react-navigation/native';
// import createStackNavigator to allow users to move between screens
import { createStackNavigator } from '@react-navigation/stack';

// assign Stack to createStackNavigator function
const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
            placholder={{ title: "WeChat"}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
  );
}


