import React,{useContext,useState,useEffect} from 'react'
import Home from '../Components/Home/Home'
import  { Navigate,useNavigate} from 'react-router-dom'
import {ValueContext} from '../contexts/ValuesContext'

function HomePage() {
const [navBtnActive,setNavBtnActive]=useState('')
const {isAuthenticated,setAuthentication,userKey,setUserName}=useContext(ValueContext)
const navigate=useNavigate()
    useEffect(() => {
      if(!isAuthenticated){
        const userkey = localStorage.getItem('userkey');
        setUserName(localStorage.getItem('username'));
        if(userkey){
          setAuthentication(true)
          navigate('/home')
        }
      }
    }, [userKey,isAuthenticated]);

useEffect(()=>{
  setNavBtnActive('home')
},[])


if(!isAuthenticated){
    return <Navigate to='/login'/>
}
  return (
    <div>
      <Home navBtnActive={navBtnActive}></Home>
    </div>
  )
}

export default HomePage