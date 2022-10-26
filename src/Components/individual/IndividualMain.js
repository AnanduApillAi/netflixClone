import React,{useState,useEffect,useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { ValueContext } from '../../contexts/ValuesContext'
import Description from './Description/Description'
import Individual from './sub/Individual'

function IndividualMain() {
    const[description,setDescription]=useState()
    const {individual}=useContext(ValueContext)

    if(individual===null){
      return <Navigate to='/home'/>
   }

    function handleDescription(item){
        setDescription(item)
    }

    useEffect(()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },[])
    
  return (
    <div>
        <Individual handleDescription={handleDescription}></Individual>
        <Description description={description}></Description>
    </div>
  )
}

export default IndividualMain