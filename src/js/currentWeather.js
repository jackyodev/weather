import React from "react";

import { weatherIcon } from "./iconWeather";

// export const currentWeatherContainer = (weather) =>{

//  if(weather){

//   return (
//     <div className="current__container">
//       <div className="weather__icon__container">
//         <img className="weather__icon" alt="" src={weatherIcon(weather.weather_id)} />
//       </div>
//     <div className = "current__location">
//       <h2> {weather.location_name}</h2>
//     </div>
//      <div className="current__weather">
//       <div className="weather__header">
//        <h2 className="header">{Math.round(weather.temp)}°</h2>
//       </div>
//      </div>
//       <div className="weather__info">
//         <h3> {weather.weather_title}</h3>
//         {/* <p> {weather.weather_desc}</p> */}
//         {/* <p> Max Temp: {Math.round(weather.max_temp)}°</p> */}
//         {/* <p> Min Temp: {Math.round(weather.min_temp)}° </p> */}
//       </div>
//     </div>
//   )
//  }
//  else {
//   return (<h1> Loading ... </h1>)
//  }

// }

const bgTopColor = (degree) => {
  if (degree <= 80) {
    return "#C8E6C9";
  } else if (degree > 80) {
    return "#FFD740";
  }
};

const bgDayColor = (degree) => {
  if (degree < 80) {
    return "#C8E6C9";
  } else if (degree > 80) {
    return "#FFD740";
  }
};


const onSubmit = (event) => {
  event.preventDefault();
  console.log(event.target.value)

}


const onChange = (event, props) => {
  event.preventDefault();
  console.log(event.target.value);
};

export const currentWeatherContainer = (weather, location, searchQuery) => {
  if (weather && location) {
    return (
      <div className="current__container">
        <div className="current__weather left">
          <div className="current__location">
            {location.location_area},
            <strong> {location.location_stateCode}</strong>
          </div>

          <div className="current__temp">
            <div>{Math.round(weather.temp)}°F</div>
          </div>
          <div className="weather__visuals">
            <img
              className="weather__icon"
              alt="weather_icon_visual"
              src={weatherIcon(weather.weather_id)}
            />
            <p className="current_weather_title">{weather.weather_title} </p>
          </div>
        </div>

        <div className="current__weather right">
          <form
            className="search__box"
            onSubmit={(event) => onSubmit(event)}
            onChange={(event) => searchQuery(event.target.value)}
          >
            <input
              className="search__input"
              type="text"
              placeholder="Search Location..."
            ></input>
            <button className="search__submit" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1> Loading ... </h1>;
  }
};
