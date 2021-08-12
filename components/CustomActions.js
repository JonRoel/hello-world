import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import * as Permissions from 'expo-permissions'; // depricated but seems to still work
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
const firebase = require('firebase');
require('firebase/firestore');


export default class CustomActions extends React.Component {

  onActionPress = () => {
    const options = [
      'Send Picture From Library', 
      'Take Picture', 
      'Send Current Location', 
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.imagePicker();
          case 1:
            console.log('User wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
          return this.getLocation();
        }
      },
    );
  };

  // Select an image from image library
  imagePicker = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();//Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));
        if(!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl, text: '' });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Take a new photo with the camera
  takePhoto = async () => {
  const { status } = await Camera.requestPermissionsAsync(); //await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
  try {
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      }).catch((error) => console.log(error));

      if (!ImagePicker.getPendingResultAsync.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl, text: '' });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Get Location for location sharing
getLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync(); //await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    if (status === "granted") {
      const result = await Location.getCurrentPositionAsync(
        {}
      ).catch((error) => console.log(error));
      const longitude = JSON.stringify(result.coords.longitude);
      const altitude = JSON.stringify(result.coords.latitude);
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
    console.log(error.message);
  }
};

// Upload images to firebase
uploadImageFetch = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const imageNameBefore = uri.split("/");
  const imageName = imageNameBefore[imageNameBefore.length - 1];

  const ref = firebase.storage().ref().child(`images/${imageName}`);

  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
};

  render() {
    return (
      <TouchableOpacity 
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s you choose to send an image, take a new picture or send your location."
        style={[styles.container]} 
        onPress={this.onActionPress}>
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
          </View>
      </TouchableOpacity>
    )
  }
}

// StyleSheet Start
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
  actionSheet: PropTypes.func,
 };