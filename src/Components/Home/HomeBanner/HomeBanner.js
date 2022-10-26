import React,{useEffect,useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './HomeBanner.css'
import { ValueContext } from '../../../contexts/ValuesContext'
function HomeBanner(props) {

  const [homeBannerData,setHomeBannerData]=useState(null)
  const [infoLoading,setInfoLoading]=useState(false)
  const {setIndividual,setVideos}=useContext(ValueContext)
  const [trailerLoading,setTrailerLoading]=useState(false)
  const navigate=useNavigate()

  function handleInfoClick(data){
    setInfoLoading(true)
    setIndividual(data,navigate('/movie'))
  }
  useEffect(()=>{
      let random=Math.floor((Math.random() * 19) + 1);
        axios.get(props.url).then(function(response){
          setHomeBannerData(response.data.results[random])
       }).catch(function(error){
        console.log(error);
       })
  },[])

function handleTrailer(){
  setTrailerLoading(true)
  let media
  if(homeBannerData.media_type==='movie'){
    media='movie'
  }else{
    media='tv'
  }
  axios.get(`https://api.themoviedb.org/3/${media}/${homeBannerData.id}?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&append_to_response=videos`).then(response=>{
    setTrailerLoading(false)
    setVideos(response.data.videos.results,navigate('/trailer'));
  }).catch(err=>{
    console.log(err);
  })
}

try {
  return (
    homeBannerData!==null?
    <div className='homeBannerDiv skelton'>
        <img className='homeBanner' src={homeBannerData.backdrop_path?`https://image.tmdb.org/t/p/w1280/${homeBannerData.backdrop_path}`:'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'} alt="Banner" />
        <div className='layerHomeBanner'></div>
        <div className='homeBannerContent'>
          <h1 >{homeBannerData.title||homeBannerData.name}</h1> 
          <p>{homeBannerData.overview}</p>
          <button onClick={handleTrailer} className='playTrailerHome'><i className="fa-sharp fa-solid fa-play"></i>{!trailerLoading?' Play Trailer':' Loading.....'}</button>
          <button onClick={()=>handleInfoClick(homeBannerData)} className='moreInfoHome'><i className="fa-sharp fa-solid fa-circle-info"></i>{!infoLoading?' More Info':' Loading..'}</button>
          <div className='resp-BtnsHome'><span style={{marginLeft:'0.2rem'}} onClick={handleTrailer} ><i className="fa-sharp fa-solid fa-play "></i></span>
          <span onClick={()=>handleInfoClick(homeBannerData)}><i className="fa-sharp fa-solid fa-circle-info "></i></span></div>
        </div>
    </div>:<div className='homeBannerDiv skelton'></div>
  )
  
} catch (error) {
  console.log(error);
}
  }

export default HomeBanner