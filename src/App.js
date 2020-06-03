import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

// import { WeatherAPIKey } from "./key"
import './App.css';

import { currentWeatherContainer } from './js/currentWeather'

import { navigationContainer } from "./js/navigation.js"

import { forecast } from "./js/forecast.js"



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeoOn: false,
      current_coords: {
        longitude: -75,
        latitude: 43
      },
      search_location: "",
      location_weather: "",
      location_forecast: [{weather:{id:0}}],

    }
  }

  setCoords(position) {
    let x = position.coords.latitude;
    let y = position.coords.longitude;
    let coords = { latitude: x, longitude: y };
    this.callWeatherApi(coords)
  }


  getGeoLocation(event) {
    // event.preventDefault()
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => { this.setCoords(position) }, (err)=> {console.log(err)})
      this.setState({
        isGeoOn: true
      })
    }
    else {
      this.setState({
        isGeoOn: false
      })

    }
  }


  callWeatherApi(props) {
    let { longitude, latitude } = props;
    let api1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherAPIKey}&units=imperial`;
    let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,current&appid=${WeatherAPIKey}&units=imperial`;

    axios.get(api1)
      .then((res) => {
        this.setState({
          current_coords: res.data.coord,
          location_weather: {
            location_name: res.data.name,
            temp: res.data.main.temp,
            min_temp: res.data.main.temp_min,
            max_temp: res.data.main.temp_max,
            weather_title: res.data.weather[0].main,
            weather_id: res.data.weather[0].id,
            weather_desc: res.data.weather[0].description
          }
        })
      }).then(() => {
        axios.get(api2)
          .then((res) => {
            this.setState({
              location_forecast: res.data.daily
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
      ).catch(err => {
        console.log(err)
      })
  }


  componentDidMount() {
    this.getGeoLocation();
  }

  render() {
    let weather = this.state.location_weather;
    let day = this.state.location_forecast;

    console.log(day)
    return (
      <>
        {/* {navigationContainer()} */}
        <Switch>
          <Route exact path="/">{currentWeatherContainer(weather)}
            {forecast(day[0])}
          </Route>

        </Switch>
      </>
    )
  }
}

export default App;
