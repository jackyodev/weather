import React from "react";
import BG from "../icons/citybg.jpg"
import { weatherIcon } from "./iconWeather";


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


const bgLocationURL = (data) => {
  if(data === undefined){
      return {
        backgroundImage: `url(${BG})`,
        backgroundColor: `pink`,
      };
  }
  else {
  let data2 = URL.createObjectURL(data);
  let url = data2;
  return {
    backgroundImage: `url(${url})`,
  };
  }

};

const locationNameFormat = (location) => {
  let {
    location_area,
    location_state,
    location_stateCode,
    location_country,
    location_countryCode,
    location_city,
  } = location;

  if(location_countryCode === "US" && location_city !== undefined){
    return (
        <div>{location_area},<strong> {location_stateCode} </strong></div> 
    );
  }
  else if (location_countryCode === "US" && location_city === undefined){
    return (
      <div>
        {location_state}, <strong>{location_stateCode}</strong>
      </div>
    );
  }
  else if (location_city !== undefined) {
    return (
      <div> {location_city}, <strong> {location_country} </strong>
      </div>
    );
  }

  else {
    return (
      <div>
        {location_country}, {location_countryCode}
      </div>
    );
  }

}

export const currentWeatherContainer = (
         weather,
         location,
         location2,
         photo,
         searchQuery,
         searchQuerySubmit
       ) => {
         if (weather && location) {
           return (
             <div
               className="current__container"
               style={bgLocationURL(photo)}
             >
               <div className="current__weather left">
                 <div className="current__location">
                   {locationNameFormat(location)}
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
                   <p className="current_weather_title">
                     {weather.weather_title}
                   </p>
                 </div>
               </div>

               <div className="current__weather right">
                 <form
                   className="search__box"
                   onSubmit={(event) => searchQuerySubmit(event)}
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
           return <div className = "loading"> Loading ... </div>;
         }
       };
