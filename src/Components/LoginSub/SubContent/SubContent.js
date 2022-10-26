import React,{useContext} from 'react'
import './SubContent.css'
import {ValueContext} from '../../../contexts/ValuesContext'
function SubContent() {
  const {userName}=useContext(ValueContext)
  
  return (
    <div className='subDiv'>
        <h1 className='contentHeading'>Welcome back,{userName}</h1>
        <h1 className='contentHeading'>Rejoining Netflix is easy.</h1>
        <p>Enter your password and you'll be watching in no time.</p>
        <p id='usrnm'>Username</p>
        <p id='usrnmb'>{userName}<a href='/login'>           Change?</a></p>
    </div>
  )
}

export default SubContent