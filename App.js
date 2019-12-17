import React from 'react';
import { StyleSheet, Text, View , Alert } from 'react-native';
import * as Location from "expo-location"
import axios from "axios"
import Loading from "./Loading"
import Weather from "./Weather";

const API_KEY = "b7f0fb6cf93c3639475bd1deb62f78c9"

export default class App extends React.Component {
  state = {
    isLoading: true,
  }
  getLocation = async () => {
    try{
      await Location.requestPermissionsAsync()
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
      //Send to API and get weather
      await this.getWeather(latitude, longitude)
    }catch (e) {
      console.log("error", e)
      Alert.alert("Can't find you.", "So sad")
    }
  }
  //날씨 데이터 가져오기 By 위도,경도
  getWeather = async(latitude, longitude) => {
    const { data: {main: {temp}, weather} } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)
    console.log("getWeather", temp, `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
    this.setState({isLoading: false, condition: weather[0].main, temp: temp})
  }

  componentDidMount(){
    this.getLocation()
  }
  render () {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather condition={condition} temp={Math.round(temp)} />;
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
