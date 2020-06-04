import React from "react";
import { weatherIcon } from "./iconWeather"



const valueToDate = (value) =>{

 let x = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

 if(value > -1 && value < 8 && value !== undefined ){
  return x[value]
 }

}

const dtToDate = (dt) =>{
 let date = new Date(dt * 1000);
 let day = valueToDate(date.getDay())

 let dd = date.getDate();
 let mm = date.getMonth();

 return (
  <>
  <h6> {mm}/{dd} </h6>
  <h3> {day} </h3>
  </>
 )
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
   <img src={weatherIcon(id)} width = "50px"/> 
   <p> {desc}</p>
   <h5> {Math.round(temp.temp.max)}° </h5>
   <h6> {Math.round(temp.temp.min)}° </h6>
   </>

  )
 }


}

const forecast = (day) => { 
 console.log(day)
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