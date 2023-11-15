import React from 'react'
import "./MenuButton"
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'
import NavButton from './NavButton'

export default function Navbar() {
  return (
    <div id='Navbar'> 
      <Link to="/" className='logo'>
        <img src="/logo.svg" alt="logo"/>
      </Link>
      <div className='btns'>
        <div className="nav-btns">
          <NavButton/>
          <NavButton isCart/>
        </div>
        <MenuButton/>
      </div>
    </div>
  )
}
