import React,{useState,useEffect,useContext} from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import Card from '../Home/MovieScrolls/Card'
import './Search.css'
import {searchUrl} from '../Assets/Assets'
import HomeHeader from '../Home/HomeHeader/HomeHeader'
import { ValueContext } from '../../contexts/ValuesContext'


function Search() {
const [data,setData]=useState(null)
const [error,setError]=useState(false)
const {query}=useContext(ValueContext)
if(query===null){
  return <Navigate to='/home' />
}
useEffect(()=>{
  setError(false)
    axios.get(searchUrl+'&query='+query).then(function(response){
      if(response.data.results.length===0){
        setError(true)
      }else{
        setData(response.data.results)
      }
    }).catch(function(error){
      console.log(error);
    })
  return setData(null)
}
,[query])


if(error){
  return(<div><HomeHeader></HomeHeader>
  <h3 className='noResults'>No results found</h3></div>)
}else
 return (
  <div>
  <HomeHeader></HomeHeader>

    <div className='urlSearch'>
        {data!==null?
        <div className='commonDisplay commonDisplaySearch'>
        {data.map((element,index)=>{
          return <Card element={element} classname={'moviesOnly'} key={index}></Card>
        })}
        </div>:''}
    </div>
    </div>
  )}

export default Search