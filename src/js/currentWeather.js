import React from "react";
import image from "../icons/animated/cloudy.svg"



export const currentWeatherContainer = (weather) =>{

 if(weather){

  return (
    <div className="current__container">
     <div className="current__weather">
      <div className ="weather__icon__container">
      <img className = "weather__icon" alt = "" src = {image} />
      </div>
      <div className="weather__header">
       <h2 className="header">{Math.round(weather.temp)}°</h2>
      </div>

     </div>
      <div className="weather__info">
        {/* <h3> {weather.weather_desc}</h3>
        <p> Max Temp: {Math.round(weather.max_temp)}°</p>
        <p> Min Temp: {Math.round(weather.min_temp)}° </p> */}
      </div>
    </div>
  )
 }
 else {
  return (<h1> Loading ... </h1>)
 }


}