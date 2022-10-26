import React,{useContext} from 'react'
import  { Navigate } from 'react-router-dom'
import SubContent from './SubContent/SubContent'
import SubForm from './SubForm/SubForm'
import SubHeader from './SubHeader/SubHeader'
import {ValueContext} from '../../contexts/ValuesContext'
import './LoginSub.css'


function LoginSub() {
const {userName}=useContext(ValueContext)
if(!userName){
 return <Navigate to='/login' />
}else{
  return (
    <div className='loginSub'>
      <SubHeader></SubHeader>
      <SubContent></SubContent>
      <SubForm></SubForm>    
    </div>
  )
  
}
  

  
}

export default LoginSub