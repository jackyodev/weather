import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

import { WeatherAPIKey, LocationAPIKey } from "./key"


import './App.css';

import { currentWeatherContainer } from './js/currentWeather'
import { navigationContainer } from "./js/navigation.js"
import { renderForecast } from "./js/forecast.js"


require('dotenv').config()


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
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => { this.setCoords(position) }, (err)=> {console.log(err)});
          
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
    let api3 = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude},&key=${LocationAPIKey}`;
    
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
        axios
          .get(api2)
          .then((res) => {
            this.setState({
              location_forecast: res.data.daily,
            });
          })
          .then(() => {
            axios.get(api3).then((res) => {
                let data = res.data.results[0].components;
                this.setState({
                  location_data: {
                    location_road: data.road,
                    location_state: data.state,
                    location_stateCode: data.state_code,
                    location_postalCode: data.postcode,
                    location_area: data.suburb,
                  },
                });
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
      )
      
      .catch(err => {
        console.log(err)
      })
  }


  refresh () {
    setInterval(() => {
      this.getGeoLocation();

    }, 30000);
  }


  componentDidMount() {
    setTimeout(() => {
      this.getGeoLocation();
      
    }, 3000);
  }

  render() {
    let weather = this.state.location_weather;
    let location = this.state.location_data;
    let day = this.state.location_forecast;
    // this.refresh();
    return (
      <>
        {/* {navigationContainer()} */}
        <Switch>
          <Route exact path="/">{currentWeatherContainer(weather,location)}
          {/* {renderForecast(day)} */}
          </Route>

        </Switch>
      </>
    )
  }
}

export default App;
