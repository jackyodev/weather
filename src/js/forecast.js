import React from "react";
import { weatherIcon } from "./iconWeather"


const dtToDate = (dt) =>{
 let date = new Date(dt * 1000);
 console.log(date)
 let day = date.getDay();

 // let x = date.getMonth();
 // console.log(x)

 // return date

}


export const forecast = (day) => {
 console.log(day)
 
 if (day) {
  return (
   <>
   {dtToDate(day.dt)}       
   {/* <img src = {weatherIcon(day.)} /> */}
   </>
  )

 }

 else {
  return (<h1> Loading </h1>)
 }

}