import React from 'react'
import './SignupBanner.css'
import { HeroBannerUrl } from '../../Assets/Assets'

function SignupBanner() {
  return (
    <div className='BannerDiv'>
        <img src={HeroBannerUrl} className="signupBanner" alt='Banner'></img>
        <div className='layer2'></div>
    </div>
  )
}

export default SignupBanner