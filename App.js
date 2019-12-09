import React from 'react';
import { StyleSheet, Text, View , Alert } from 'react-native';
import Loading from "./Loading"
import * as Location from "expo-location"
import axios from "axios"

const API_KEY = "b7f0fb6cf93c3639475bd1deb62f78c9"

export default class App extends React.Component {
  state = {
    isLoading: false,
  }
  //날씨 데이터 가져오기 By 위도,경도
  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
    console.log("getWeather", data)
  }
  getLocation = async () => {
    try{
      await Location.requestPermissionsAsync()
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
      console.log(latitude, longitude)
      //Send to API and get weather
      await this.getWeather(latitude, longitude)
      this.setState({isLoading: true});
    }catch (e) {
      console.log("error", e)
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
