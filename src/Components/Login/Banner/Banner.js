import React from 'react'
import './Banner.css'
import {HeroBannerUrl} from '../../Assets/Assets'

function Banner() {
  return (
    <div>
        <div className='Herobanner'>
         <img src={HeroBannerUrl} alt='Banner' className='HerobannerImage' />
         <div className='layer'></div>
         <div className='bannerContent'><h1>Unlimited movies, TV shows and more.</h1></div>
       </div>
    </div>
  )
}

export default Banner