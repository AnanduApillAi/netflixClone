import React,{useContext,useEffect,useState} from 'react'
import {Navigate} from 'react-router-dom'
import './Video.css'
import { ValueContext } from '../../../contexts/ValuesContext'

function Video() {
  const [trailer,setTrailer]=useState()
  const {videos}=useContext(ValueContext)
  if(!videos){
    return <Navigate to='/home'/>
  }
  useEffect(()=>{
    if(videos){
       setTrailer(videos.find(elem=>elem.type==='Trailer'))
    }
  },[videos])

  return (
    trailer?
    <div className='video '>
      <div className='iframe'>
      <iframe className='skeltonCardIframe'  src={`https://www.youtube.com/embed/${trailer.key}`} title="YouTube"  frameBorder="0"  allowFullScreen="allowfullscreen"></iframe>
      </div>
    </div>:
    <div className='videoUnavailable'>Video currently unavailable</div>
  )
}

export default Video