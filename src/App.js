import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

import { WeatherAPIKey } from "./key"
import './App.css';

import { currentWeatherContainer } from './js/currentWeather'

import { navigationContainer} from "./js/navigation.js"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeoOn: false,
      current_coords: "",
      search_location: "",
      location_weather: "",
    }
  }

  setCoords(position) {
    let x = position.coords.latitude;
    let y = position.coords.longitude;
    let coords = { latitude: x, longitude: y }

    this.callWeatherApi(coords)
  }


  getGeoLocation(event) {
    // event.preventDefault()
    if (navigator.geolocation) {
      this.setState({
        isGeoOn: true
      })
      navigator.geolocation.getCurrentPosition((position) => { this.setCoords(position) })
    }
    else {
      this.setState({
        isGeoOn: false
      })

    }
  }


  callWeatherApi(props) {
    let { longitude, latitude } = props;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherAPIKey}&units=imperial`;

    axios.get(api).then((res) => this.setState({
      current_coords: res.data.coord,
      location_weather: {
        temp: res.data.main.temp,
        min_temp: res.data.main.temp_min,
        max_temp: res.data.main.temp_max,
        weather_title: res.data.weather[0].main,
        weather_desc: res.data.weather[0].description,
        icon: res.data.weather[0].icon
      }

    })).then(() => { console.log(this.state) })

      ;
  }


  componentDidMount() {
    this.getGeoLocation();
  }

  render() {
    let weather = this.state.location_weather
    console.log(this.state)
    return (
      <>
      {/* {navigationContainer()} */}
        <Switch>
          <Route exact path="/">{currentWeatherContainer(weather)}</Route>
        </Switch>
      </>
    )
  }
}

export default App;
