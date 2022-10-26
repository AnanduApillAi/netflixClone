import React,{useState,useContext,useEffect} from 'react'
import {Navigate,useNavigate} from 'react-router-dom'
import AddList from '../Components/AddList/AddList'
import { ValueContext } from '../contexts/ValuesContext'


function AddListPage() {
  const [navBtnActive,setNavBtnActive,]=useState('')
  const navigate=useNavigate()
useEffect(()=>{
  setNavBtnActive('addlist')
},[])

    const {isAuthenticated,setAuthentication,userKey,setUserName,userName}=useContext(ValueContext)

    useEffect(() => {
      if(!isAuthenticated){
        const userkey = localStorage.getItem('userkey');
        setUserName(localStorage.getItem('username'));
        if(userkey){
          setAuthentication(true)
          navigate('/mylist')
        }
      }
    }, [userKey,isAuthenticated,userName]);

  if(isAuthenticated){
    return (
        <div>
            <AddList navBtnActive={navBtnActive}></AddList>
        </div>
      )
  }else{
    return <Navigate to='/login'></Navigate>
  }
    
}

export default AddListPage