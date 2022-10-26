import React,{useContext,useEffect,useState} from 'react'
import Common from '../Components/Common/Common'
import {ValueContext} from '../contexts/ValuesContext'
import {Navigate,useNavigate} from 'react-router-dom'
import {moviesOnly,movieGenres} from '../Components/Assets/Assets'
function MoviesPage() {
const navigate=useNavigate()
const [navBtnActive,setNavBtnActive]=useState('')
const {isAuthenticated,setAuthentication,userKey,setUserName}=useContext(ValueContext)

    useEffect(() => {
      if(!isAuthenticated){
        const userkey = localStorage.getItem('userkey');
        setUserName(localStorage.getItem('username'));
        if(userkey){
          setAuthentication(true)
          navigate('/movies')
        }
      }
    }, [userKey,isAuthenticated]);

useEffect(()=>{
  setNavBtnActive('movie')
},[])

if(isAuthenticated){
    return (
        <div>
            <Common navBtnActive={navBtnActive} classname={true}  url={moviesOnly} heading={'Movies'} genres={movieGenres}></Common>
        </div>
      )
}else{
    return <Navigate to='/login'/>
}
}

export default MoviesPage