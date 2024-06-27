import React,{useState,useContext,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { ValueContext } from '../../../contexts/ValuesContext'
import HomeHeader from '../../Home/HomeHeader/HomeHeader'
import './individual.css'
import axios from 'axios'
import {serverUrl} from '../../Assets/Assets'


function Individual(props) {
const Navigate=useNavigate()
const [state,setState]=useState(false)
const [item,setItem]=useState()
const {individual,userName,setVideos}=useContext(ValueContext)
const [date,setDate]=useState('')
const [message,setMessage]=useState('')
const [inList,setInList]=useState(false)
const [listBtnLoading,setListBtnLoading]=useState(false)


function handleAdd(data){
    setListBtnLoading(true)
    let media
    if(data.name){
        media=data.id+'0'
    }else{
        media=data.id+'1'
    }
    axios.post(
        `${serverUrl}/api/list`,
        {
          username:userName,
          mediaid:media

        }).then(function(response){
            setListBtnLoading(false)
            if(response.data.status){
                setMessage(response.data.message)
            }else{
                setMessage(response.data.message)
            }
            setState(!state)
        }).catch(function(error){
            console.log(error);
        })
        
}

function handleDelete(data){
    setListBtnLoading(true)
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
            setListBtnLoading(false)
            if(response.data.stat){
                setMessage('Removed From List')
                
            }else{
                setMessage('An error occured')
            }
           
            setState(!state)
        }).catch(function(error){
            console.log(error);
        })
        
}
function handleMessage(){
    setTimeout(()=>{
        if(message){
            setMessage('')
        }
    },2000)
}


useEffect(()=>{
    if(individual){
        let media
        if(individual.name){
            media=individual.id+'0'
        }else{
            media=individual.id+'1'
        }
        axios.post(
            `${serverUrl}/api/getlist`,
            {
              username:userName,
    
            }).then(function(response){
               let list=(response.data.list);
               if(list.includes(media)){
                setInList(true)
               }else{
                setInList(false)
               }
            }).catch(function(error){
                console.log(error);
            })
    }
   
},[state])

   
useEffect(()=>{
    if(individual){
        if(individual.name){
            axios.get(`https://api.themoviedb.org/3/tv/${individual.id}?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&append_to_response=videos`).then(function(response){
                setVideos(response.data.videos.results)
                setItem(response.data)
                props.handleDescription(response.data)
               setDate(new Date(individual.first_air_date).getFullYear())
            }).catch(function(error){
                console.log(error);
            })
        }else{
            axios.get(`https://api.themoviedb.org/3/movie/${individual.id}?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&append_to_response=videos`).then(function(response){
                setItem(response.data)
                props.handleDescription(response.data)
                setDate(new Date(individual.release_date).getFullYear())
            }).catch(function(error){
                console.log(error);
            })
        }
    }
},[individual])

function handleTrailer(){
    setVideos(item.videos.results,Navigate('/trailer'))
}


if(individual==null)
   return <Navigate to='/home'/>
else{
    return(
        <div>
        <HomeHeader></HomeHeader>
        <div className='individual' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${individual.backdrop_path})`}}>
       <div className='indvdlPosterDiv skeltonCard'><img className='indvdlPoster' src={`https://image.tmdb.org/t/p/w500/${individual.poster_path}`} alt="" /></div>
       <div className='indvdlContents'>
       <h1 >{individual.title||individual.name}</h1>{individual.release_date?<span className='indvdlDate'>{date?`(${date})`:''}</span>:<span className='indvdlDate'>{`(${date})`}</span>}
       {item?<div>
        {item.genres.map((element,index)=>{
       return <p className='indvdlGenre' key={index}>{element.name}</p>
       })}
       {individual.release_date?<span className='indvdlRunTime'>{item.runtime>60? Math.floor(item.runtime/60)+'h '+item.runtime%60+'m':item.runtime+'m'}</span>:''}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       {item.number_of_seasons?<span>{item.number_of_seasons} Seasons&nbsp;&nbsp;&nbsp;{item.number_of_episodes} Episodes</span>:''}
       <p className='indvdlTagline'>{item.tagline}</p>
       
       </div>:''}
       <p className='indvdlOverview'><span className='overviewHeading'>Overview</span>{individual.overview}</p>
       <button onClick={handleTrailer} className='playTrailerHome'><i className="fa-solid fa-play"></i> Play Trailer</button>
       {inList?<button  onMouseLeave={handleMessage} onBlur={()=>setMessage(null)} onClick={()=>handleDelete(individual)} className='moreInfoHome' style={{display:'none'}}><i className="fa-solid fa-trash"></i>{!listBtnLoading?' Remove From List':' Loading....'}</button>:<button onMouseLeave={handleMessage} onBlur={()=>setMessage(null)} onClick={()=>handleAdd(individual)} className='moreInfoHome' style={{display:'none'}}><i className="fa-sharp fa-solid fa-plus"></i>{!listBtnLoading?' Add To List':' Loading...'}</button>}
        {message?<span className='listMessage'>{message}</span>:''}
       </div>
        </div>
        </div>
    )
    
}
}

export default Individual