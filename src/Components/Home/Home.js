import React from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeHeader from './HomeHeader/HomeHeader'
import NetflixOrginals from './MovieScrolls/NetflixOrginals'
import HomeScrolls from './MovieScrolls/HomeScrolls'
import {NetflixOrginalsUrl,TopRatedUrl,popularMoviesUrl,trendingAllUrl} from '../../Components/Assets/Assets' 




function Home(props) {
  return (
    <div>
      <HomeHeader navBtnActive={props.navBtnActive}></HomeHeader>
      <div>
      < HomeBanner url={trendingAllUrl}/>
      <HomeScrolls TopRated={true} url={TopRatedUrl} title={'Top Rated Movies'}></HomeScrolls>
      <NetflixOrginals url={NetflixOrginalsUrl}></NetflixOrginals>
      <HomeScrolls TopRated={false} url={popularMoviesUrl} title={'Popular Movies'}></HomeScrolls>
      </div>
    </div>
  )
}

export default Home

