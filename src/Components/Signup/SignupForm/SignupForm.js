import React,{useState} from 'react'
import { ThreeDots } from 'react-loading-icons'
import './SignupForm.css'
import axios from 'axios'
import {serverUrl} from '../../Assets/Assets'
function SignupForm() {
const [fname,setFname]=useState('')
const [lname,setLname]=useState('')
const [username,setusername]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState('')
const [success,setSuccess]=useState(false)
const [isLoading,setLoading]=useState(false)
function signUp(){
  setLoading(true)
  setError('')
  setSuccess(false)
    axios.post(
      `${serverUrl}/api/signup`,
      {
        fname:fname,
        lname:lname,
        username:username,
        password:password
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then(function (response) {
        setLoading(false)
        if(response.data.success){
          setSuccess(true)
        }else{
          setError(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}
  return (
    <div className='signupFormDiv'>
    <div className='signupForm'>&nbsp;
        <label className='headingLbl'>Sign Up</label>
        <input onFocus={()=>{setError(''); setSuccess(false)}} onChange={(e)=>setFname(e.target.value)} type='text' name='fname' className='signupInput' placeholder='First Name' spellCheck='false'></input>
        <input onFocus={()=>{setError(''); setSuccess(false)}} onChange={(e)=>setLname(e.target.value)} type='text' name='lname' className='signupInput' placeholder='Last Name' spellCheck='false'></input>
        <input onFocus={()=>{setError(''); setSuccess(false)}} onChange={(e)=>setusername(e.target.value)} type='text' name='username' className='signupInput' placeholder='Username' spellCheck='false'></input>
        <input onFocus={()=>{setError(''); setSuccess(false)}} onChange={(e)=>setPassword(e.target.value)} type='text' name='password' className='signupInput' placeholder='Password' spellCheck='false'></input>
        <div className='signUpError'>{error}</div>
        {success ?<div className='createdAccount'>Account created successfully.Login now</div>: null}  
        <button onBlur={()=>{setSuccess(false)}} onClick={signUp} className='signupBtn'>{!isLoading?'Sign Up':<ThreeDots style={{width:'5.6%',height:'1rem'}}/>}</button>
        <label className='backToLoginLbl'>Got an Account?&nbsp;&nbsp;&nbsp;<a href='/login'>Login now</a></label>
    </div>
    </div>
  )
}

export default SignupForm