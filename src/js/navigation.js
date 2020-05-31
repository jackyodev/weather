import React from "react"
import { NavLink } from 'react-router-dom'


export const navigationContainer = () => {
 return(
  <div className="navigation__container">
   <NavLink to="/current"> Current </NavLink>
   <NavLink to="/week">7-Days Forecast</NavLink>
   <input type="text" placeholder="Search" />
  </div>
 )
}


