import React,{useContext,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ValueContext} from '../../../contexts/ValuesContext'
import { ThreeDots } from 'react-loading-icons'
import { serverUrl} from '../../Assets/Assets'
import axios from 'axios'
import './LoginForm.css'
function LoginForm() {
const {setUserName}=useContext(ValueContext)
const [attemptingUser,setAttemptingUser]=useState('')
const [error,setError]=useState('')
const [isLoading,setLoading]=useState(false)
const navigate=useNavigate()

function loginClick(){
  setLoading(true)
    axios.post(
      `${serverUrl}/api/auth`,
      {
        username: attemptingUser,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then(function (response) {
        setLoading(false)
        if(response.data.status){
          setUserName(response.data.username)
          navigate('/loginauth')
        }else if(response.data.status===false){
          setError("no user found")
        }else{
          setError(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

  return (
    <div className='loginForm'>
       <input onFocus={()=>setError('')} onChange={(e)=>setAttemptingUser(e.target.value)} type="text" className='loginInput' spellCheck='false' placeholder='Username'></input>
       <span  onClick={loginClick} className='loginBtn'>{!isLoading?'Log In':<ThreeDots style={{width:'5.6%',height:'1rem'}}/>}</span>
       <div className='errorMessage'>{error}</div>
    </div>
  )
}

export default LoginForm