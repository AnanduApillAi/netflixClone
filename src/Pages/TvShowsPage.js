import React,{useContext,useState,useEffect} from 'react'

import Common from '../Components/Common/Common'
import {ValueContext} from '../contexts/ValuesContext'
import {Navigate,useNavigate} from 'react-router-dom'
import { tvOnly,tvGenres} from '../Components/Assets/Assets'

function TvShowsPage() {
const [navBtnActive,setNavBtnActive]=useState('')
const {isAuthenticated,setAuthentication,userKey,setUserName}=useContext(ValueContext)
const navigate=useNavigate()
    useEffect(() => {
      if(!isAuthenticated){
        const userkey = localStorage.getItem('userkey');
        if(userkey){
          setAuthentication(true)
          setUserName(localStorage.getItem('username'));
          navigate('/tvshows')
        }
      }
    }, [userKey,isAuthenticated]);

useEffect(()=>{
  setNavBtnActive('tv')
},[])

if(isAuthenticated){
    return (
        <div>
           
            <Common navBtnActive={navBtnActive} classname={true}  url={tvOnly} heading={'Tv Shows'} genres={tvGenres}></Common>
        </div>
      )
}else{
    return <Navigate to='/login'/>
}
}

export default TvShowsPage