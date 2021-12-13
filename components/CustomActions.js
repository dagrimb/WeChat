// The Chat component renders the UI for the chat screen 

import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
const firebase = require('firebase');
require('firebase/firestore'); // import Firestore

class CustomActions extends React.Component {

  pickImage = async () => { // this function is for allowing a user to pick an existing file from their device's media library. As this is
    // an async function that returns a promise, the function needs to be an async function to ensure the application won't get blocked
    // by action
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (status === 'granted') { // if user grants access to their device's gallery
        const result = await ImagePicker.launchImageLibraryAsync({ // method for opening up device's media library to let the user choose a file
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // user should only choose from their images. This method returns an object containing a uri to the media file
        // along with its width, height, and file type. The object also contains a value for 'cancelled' which will be true if the user
        // cancels the process and doesn't pick a file.
      }).catch((error) => console.log(error));
      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  // let user take a picture
  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.CAMERA); // ask for users permission to access camera and library
    try {
      if (status === 'granted') {
      // launchCameraAsync = method to open up the device's camera and allow the user the take a photo. This function is an asynchronous
      // function that returns an object containing the media file data.
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch(error => console.log(error)); // if the user grants permission to access
      // the camera and library, you open up the camera with the launchCameraAsync function
      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
       
// function for retrieving the device's geolocation
getLocation = async () => {
  try {
    const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    if (status === 'granted') { // if user gives permission
      // getCurrentPositionAsync is to read location data
      let result = await Location.getCurrentPositionAsync({}).catch(error => console.log(error));
      const longitude = JSON.stringify(result.coords.longitude);
      const latitude = JSON.stringify(result.coords.latitude);
      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        });
      }
    }
  } catch (error) {
    console.log(error)
  }
};

uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // create new XMLHttpRequest
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob'; // set new XMLHttpReqeuest responseType to 'blob'
      xhr.open('GET', uri, true); // open the connection and retrieve the URI's data via GET
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    // to upload image, we tell storage the file we want to operate on by creating reference that points directly to its file
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    // put blob data into selected image (use "await" as "put" is asynchonous and returns a promise)
    const snapshot = await ref.put(blob); 
    // close the connection
    blob.close();
    // use the asynchronous getDownloadURL method to get the image URL from storage
    return await snapshot.ref.getDownloadURL();
  };

  onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel']; // the four action to be displayed in the ActionSheet
    const cancelButtonIndex = options.length - 1; 
    this.context.actionSheet().showActionSheetWithOptions( // pass data that you want to display through the component tree
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image'); // should be logged if user wants to pick an image
            return this.pickImage();
          case 1:
            console.log('user wants to take a photo'); // should be logged if user wants to take photo
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location'); // should be logged if user wants to get their location
            return this.getLocation();
        }
      },
    );
  }

  render() { // code for rendering chat UI

    return (    
      <TouchableHighlight 
        accessible={true}
        accessibilityHunt="Let's you choose to send an image or your geolocation"
        accessibilityLabel="More options"
        onPress={this.onActionPress} // called when user presses button in input field
        style={[styles.container]} 
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View> 
     </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func, // use PropTypes to define actionSheet prop as a function
};

export default CustomActions;