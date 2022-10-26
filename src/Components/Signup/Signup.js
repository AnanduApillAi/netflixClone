import React from 'react'
import './Signup.css'
import SignupBanner from './SignupBanner/SignupBanner'
import SignupForm from './SignupForm/SignupForm'
import SignupHeader from './SignupHeader/SignupHeader'

function Signup() {
  return (
    <div >
      <SignupBanner></SignupBanner>
      <SignupHeader></SignupHeader>
      <SignupForm></SignupForm>
    </div>
  )
}

export default Signup