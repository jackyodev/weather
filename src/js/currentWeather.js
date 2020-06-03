import React from "react";


import { weatherIcon } from "./iconWeather"

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



export const currentWeatherContainer = (weather) => {

  if (weather) {

    return (
      <div className="current__container">
          {/* <h1> {weather.location_name}</h1> */}

        <div className="current__weather">
          <h1 className = "temp">{Math.round(weather.temp)}° </h1>
          <img className="weather__icon" alt="" src={weatherIcon(weather.weather_id)} />
          <h1> {weather.weather_title}</h1>
        </div>


        <div className="current__forecast">

       

        </div>

      </div>
    )
  }
  else {
    return (<h1> Loading ... </h1>)
  }


}