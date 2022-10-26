import React from 'react'
import { LogoUrl } from '../../Assets/Assets'
import './SignupHeader.css'

function SignupHeader() {
  return (
    <div className='signupHeader'>
        <img src={LogoUrl} className="logo2" alt=''></img>
    </div>
  )
}

export default SignupHeader