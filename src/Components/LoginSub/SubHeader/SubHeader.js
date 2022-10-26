import React from 'react'
import './SubHeader.css'
import {LogoUrl} from '../../Assets/Assets' 

function SubHeader() {
  return (
    <div>  
      <div className='subHeader'>
    <a href='/login'><img className='subHeaderlogo' src={LogoUrl} alt='Netflix' /></a>
    <a href='/signup' className='subsignUpBtn'>Sign Up</a>
      </div>
    </div>
  )
}

export default SubHeader