import axios from 'axios';
import React,{useEffect,useState} from 'react'
import Cast from '../cast&crew/Cast';
import Crew from '../cast&crew/Crew';
import './Description.css'

function Description({description}) {
  
  const [cast,setCast]=useState()
  const [crew,setCrew]=useState()
  const [headerState,setHeaderState]=useState(true)

  useEffect(()=>{

    if(description){
    let media
      if(description.title){
        media='movie'
      }else{
        media='tv'
      }
      axios.get(`https://api.themoviedb.org/3/${media}/${description.id}/credits?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US`).then(response=>{
        setCast(response.data.cast)
        setCrew(response.data.crew)
      }).catch(err=>{
        console.log(err);
      })    
    }
 
  },[description])
  return (
    <div className='description'>
      <div className='descriptionHeader'>
        <span   className={`castDescription ${headerState?'descbtnActive':''}`} onClick={()=>setHeaderState(true)} >CAST</span>
        <span className={`castDescription ${!headerState?'descbtnActive':''}`} onClick={()=>setHeaderState(false)}>CREW</span>
      </div>
      <div className='descriptionBalance'>
        {headerState?<Cast cast={cast}></Cast>:<Crew crew={crew}></Crew>}
      </div>
    </div>
  )
}

export default Description