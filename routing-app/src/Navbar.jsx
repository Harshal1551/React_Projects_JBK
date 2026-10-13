import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <NavLink>
        <Link to={"/"} >Home</Link>
        <Link to={"/mobiles"} >Mobiles</Link>
        <Link to={"/kids"} >Kids</Link>
      </NavLink>
    </div>
  )
}

export default Navbar
