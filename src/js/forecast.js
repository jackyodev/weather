import React from "react";
import { weatherIcon } from "./iconWeather"



const valueToDate = (value) =>{

 let x = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

 if(value > -1 && value < 8 && value !== undefined ){
  return x[value]
 }

}

const dtToDate = (dt) =>{
 let date = new Date(dt * 1000);
 let day = valueToDate(date.getDay())
 
 let dd = date.getDate();
 let mm = date.getMonth()+1;


 return (
   <>
     <h6> {mm}/{dd}</h6>
     <h6>{day}</h6>
   </>
 );
}

const temp = (temp) => {
 let id = 0;
 let desc = "";

 if(temp.weather[0]){
  id = temp.weather[0].id
  desc = temp.weather[0].main;
 }

 if(temp.temp){
  return (
    <>
      <img alt = "weatherIcon" src={weatherIcon(id)} />
      <p>{desc}</p>
      <div className = "temp">
        <div className = "high">{Math.round(temp.temp.max)}°F</div>
        <div className = "low">{Math.round(temp.temp.min)}°F</div> 
      </div>
    </>
  );
 }


}

const forecast = (day) => { 
 let map = day.map (el => {
  return (
   <div className="day">
    {dtToDate(el.dt)}  
    {temp(el)}  
   </div>
  )})
  
  if(day[1]) {
   return map
  }


}



export const renderForecast= (day) => {
 return <div className = "day__container"> {
  forecast(day)
 }
 </div> 

}