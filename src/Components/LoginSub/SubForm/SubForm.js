import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './SubForm.css'
import { ThreeDots } from 'react-loading-icons'
import axios from 'axios'
import {ValueContext} from '../../../contexts/ValuesContext'
import {serverUrl} from '../../Assets/Assets'
function SubForm() {
  const navigate=useNavigate()
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [isLoading,setLoading]=useState(false)
  const {setAuthentication,userName,setUserKey}=useContext(ValueContext)
  function passwordCheck(){
    setLoading(true)
      axios.post(
        `${serverUrl}/api/authsub`,
        {
          username:userName,
          password:password
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then(function (response) {
          setLoading(false)
          if(response.data.status){
            setUserKey(response.data.userdata)
            localStorage.setItem('userkey',response.data.userdata);
            localStorage.setItem('username',userName);
            setAuthentication(true)
            navigate('/home')
          }else{
            setError(response.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    
  }
  return (
    <div className='SubForm'>
        <input onFocus={()=>setError('')} onChange={(e)=>setPassword(e.target.value)} type="text" name='password' placeholder='password' spellcheck="false" autocomplete="off"></input>
        <div className='errorSignup'>{error}</div>
        <button onClick={passwordCheck}>{!isLoading?'Next':<ThreeDots style={{width:'5.6%',height:'1rem'}}/>}</button>
    </div>
  )
}

export default SubForm