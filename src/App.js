import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import { WeatherAPIKey, LocationAPIKey, PlaceAPIKey } from "./key";

import "./App.css";

import { currentWeatherContainer } from "./js/currentWeather";
import { navigationContainer } from "./js/navigation.js";
import { renderForecast } from "./js/forecast.js";

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.searchQueryValue = this.searchQueryValue.bind(this);
    this.searchQuerySubmit = this.searchQuerySubmit.bind(this);

    this.state = {
      isGeoOn: false,
      current_coords: {
        longitude: -75,
        latitude: 43,
      },
      search_location: "",
      location_weather: "",
      location_forecast: [{ weather: { id: 0 } }],
    };
  }

  setCoords(position) {
    let x = position.coords.latitude;
    let y = position.coords.longitude;
    let coords = { latitude: x, longitude: y };
    this.callWeatherApi(coords);
  }

  getGeoLocation(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setCoords(position);
        },
        (err) => {
          console.log(err);
        }
      );

      this.setState({
        isGeoOn: true,
      });
    } else {
      this.setState({
        isGeoOn: false,
      });
    }
  }

  locationPhotoRef(value) {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${value}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${PlaceAPIKey}`
      )
      .then((res) => {
        console.log(res);
        let data = res.data.candidates[0];
        if(data) {
        this.setState((prevState) => ({
          ...prevState,
          location: {
            formatted_address: data.formatted_address,
            photoRef: data.photos[0].photo_reference,
            coords: {
              latitude: data.geometry.location.lat,
              longitude: data.geometry.location.lng,
            },
          },
        }));
        }
      })
      .then(() => {
        this.getBGurl(this.state.location.photoRef);
        return(
          this.state.coords
        )
      })
      .catch((err) => console.log(err));
  }

  getBGurl(photoRef) {
    let api = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${photoRef}&key=${PlaceAPIKey}`;
    axios.get(api, {responseType: "blob"}).then((res) => {
      this.setState({
        bgPhotoData: res.data,
      })
    }).catch(err => {
      console.log(err)
    })
  }

  callWeatherApi(props) {
    let { longitude, latitude } = props;
    let api1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherAPIKey}&units=imperial`;
    let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,current&appid=${WeatherAPIKey}&units=imperial`;
    let api3 = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude},&key=${LocationAPIKey}`;
    // let api4 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${WeatherAPIKey}`;

    axios
      .get(api1)
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
            weather_desc: res.data.weather[0].description,
          },
        });
      })
      .then(() => {
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
                  location_city: data.city,
                  location_stateCode: data.state_code,
                  location_postalCode: data.postcode,
                  location_area: data.suburb,
                  location_countryCode: data.country_code.toUpperCase(),
                  location_country: data.country,
                },
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchQueryValue(value) {
    this.setState((prevState) => ({
      ...prevState,
      search_location: value,
    }));
  }

  searchQuerySubmit(e) {
    e.preventDefault();
    let value = this.state.search_location;
    let api = `https://api.opencagedata.com/geocode/v1/json?q=${value}&limit=1&key=${LocationAPIKey}`;

    axios
      .get(api)
      .then((res) => {
        if (res.status === 200) {
          let x = res.data.results[0].geometry.lat;
          let y = res.data.results[0].geometry.lng;
          let coords = { latitude: x, longitude: y };
          this.callWeatherApi(coords);
        }
      }).then(()=>{
        this.locationPhotoRef(this.state.search_location);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    setTimeout(() => {
      this.getGeoLocation();
    }, 4000);
  }

  render() {
    let weather = this.state.location_weather;
    let location = this.state.location_data;
    let location2 = this.state.location;
    let photo = this.state.bgPhotoData;


    let day = this.state.location_forecast;

    return (
      <>
        {/* {navigationContainer()} */}
        <Switch>
          <Route exact path="/">
            {currentWeatherContainer(
              weather,
              location,
              location2,
              photo,
              this.searchQueryValue,
              this.searchQuerySubmit
            )}
            {renderForecast(day)}
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
