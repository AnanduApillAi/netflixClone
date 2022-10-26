import React,{useContext,useEffect, useState} from 'react'
import {ValueContext} from '../../contexts/ValuesContext'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import {serverUrl} from '../Assets/Assets'
import HomeHeader from '../Home/HomeHeader/HomeHeader'
import Card from '../Home/MovieScrolls/Card'
import './AddList.css'

function AddList(props) {
const {isAuthenticated,userName}=useContext(ValueContext)
const [favList,setFavList]=useState(null)
const [value,setValue]=useState([])
const [state,setState]=useState(false)
const [loading,setLoading]=useState(false)
const [emptyList,setEmptyList]=useState(false)

if(!isAuthenticated){
    return <Navigate to='/login'/>
}

function handleDelete(data){
    let media
    if(data.name){
        media=data.id+'0'
    }else{
        media=data.id+'1'
    }
    axios.post(
        `${serverUrl}/api/deletelist`,
        {
          username:userName,
          mediaid:media

        }).then(function(response){
            if(response.data.stat){
                setState(!state)
            }else{
                console.log('error occured');
            }
            setState(!state)
        }).catch(function(error){
            console.log(error);
        })
        
}

useEffect(()=>{
    setLoading(true)
    axios.post(`${serverUrl}/api/getlist`,{
        username:userName
    }).then(function(response){
        
        if(!response.data||response.data.list.length===0){
            setEmptyList(true)
            setLoading(false)
        }else{
            setFavList(response.data.list)
        }
    }).catch(function(error){
        console.log(error);
    })
    return setFavList(null)
},[state])

useEffect(()=>{
    if(favList){
      favList.map(async(element,index)=>{
        let lastDigStr= String(element).slice(-1)
        let lastDigNum=Number(lastDigStr);
        let idStr=String(element).slice(0,-1)
        let idNum=Number(idStr)
        try {
            if(lastDigNum===1){
                const response= await axios.get(`https://api.themoviedb.org/3/movie/${idNum}?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US`)
                setValue(prev=>[...prev,response.data])
            }else{
                const response=await axios.get(`https://api.themoviedb.org/3/tv/${idNum}?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US`)
                setValue(prev=>[...prev,response.data])
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
      })
    }
    return setValue([])
},[favList])



    return (
        <div>
           <HomeHeader navBtnActive={props.navBtnActive}></HomeHeader>
           {loading?<h1 style={{marginTop:'10rem'}}>Loading....</h1>:
           <div className='commonDisplay commonDisplayAddList'>
           {value.map((element,index)=>{
               return <Card handleDelete={handleDelete} AddList={true} element={element} classname={'moviesOnly'} key={index}></Card>
           })}
          </div>          
           }
          {emptyList&&!loading?<h2 className='emptyList'>Your list is empty</h2>:''}

        </div>
      )
}

export default AddList