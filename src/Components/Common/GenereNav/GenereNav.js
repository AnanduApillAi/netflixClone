import React,{useState,useEffect} from 'react'
import './GenereNav.css'
import axios from 'axios'

function GenereNav(props) {
    const [navState,setNavState]=useState(false)
    const [hovered,setHovered]=useState(false)
    const [genre,setGeneres]=useState([])
    const [fetch,setFetch]=useState(false)
    const [genreName,setGenreName]=useState(null)



useEffect(()=>{
  axios.get(props.genres).then(response=>{
    setGeneres(response.data.genres);
    setFetch(true)
  }).catch(error=>console.log(error))
},[])

function handleBlur(){
  if(hovered){
    setNavState(true)
  }else{
    setNavState(false)
  }
}
  return (
    fetch ?
    <div>
  <div id="mySidenav" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{setNavState(false);setHovered(false)}}   className='sidenav' style={navState?{width:'200px'}:{width:'0px'}}>
  {genre.map((element,index)=>{
    return <p  onClick={()=>{props.setGenreId(element.id);setGenreName(element.name);}} key={index}>{element.name}</p>
  })}
</div>
<button className='navBtn' onBlur={handleBlur} onClick={()=>setNavState(!navState)}>{genreName!==null?genreName:'Choose Genre'}</button>
    </div>:''
    
  )
  
}

export default GenereNav