import React from 'react';
import { StyleSheet, Text, View , Alert } from 'react-native';
import Loading from "./Loading"
import * as Location from "expo-location"

export default class App extends React.Component {
  state = {
    isLoading: false,
  }
  getLocation = async () => {
    try{
      await Location.requestPermissionsAsync()
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
      console.log(latitude, longitude)
      //Send to API and get weather

      this.setState({isLoading: true});
    }catch (e) {
      Alert.alert("Can't find you.", "So sad")
    }
  }
  componentDidMount(){
    this.getLocation()
  }
  render () {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yellowView: {
    flex: 1,
    backgroundColor: "yellow"
  },
  blueView: {
    flex: 2,
    backgroundColor: "blue"
  },
  text: {
    color: "red"
  }
});
