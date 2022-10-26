import React from 'react'
import './Header.css'
import {LogoUrl} from '../../Assets/Assets'
function Header() {
  return (
    <div>  
      <div className='Header'>
    <img className='logo' src={LogoUrl} alt='Netflix' />
    <a href='/signup' className='signUpBtn'>Sign Up</a>
      </div>
    </div>
    
  )
}

export default Header