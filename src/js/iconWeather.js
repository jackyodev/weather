import Thunderstorm from "../icons/animated/thunder.svg"

import Drizzle from "../icons/animated/rainy-1.svg"

import Rainy from "../icons/animated/rainy-2.svg"

import Snowy from "../icons/animated/snowy-1.svg"


import Cloud from "../icons/animated/cloudy.svg"

import ClearDay from "../icons/animated/day.svg"
import ClearNight from "../icons/animated/night.svg"






export const weatherIcon = (id) => {

 if(199 < id &&  id < 232 ){

  return Thunderstorm

 }
 else if ( 299 < id && id < 322) {
  return Drizzle
 }

 else if (499 < id && id  < 532){
  return Rainy
 }

 else if (599 < id && id < 621) {
  return Snowy
 }


 else if (799 < id && id < 801) {
  return ClearDay
 }

 else if (801 <= id && id < 805) {
  return Cloud
 }

 else {
  return ClearNight
 }
 

}