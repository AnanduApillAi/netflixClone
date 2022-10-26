import React,{useEffect,useState,useRef,useCallback} from 'react'
import {NetflixOrginalsUrl} from '../../Assets/Assets'
import Card from './Card'
import axios from 'axios'
import './NetflixOrginals.css'

function NetflixOrginals() {
const [movies,setMovies]=useState([])
const [background,setBackground]=useState('')
const [loading,setLoading]=useState(false)
const [moviesEnded,setMoviesEnded]=useState(false)
const [page,setPage]=useState(1)

const observer=useRef()

const lastMovie=useCallback(node=>{
    if(loading)return
    if(moviesEnded)return
    if(observer.current) observer.current.disconnect()
    observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        if(page!==500){
            setPage(page+1)
        }
      }
    })
    if(node)observer.current.observe(node)

},[loading])


useEffect(()=>{
        setLoading(true)
        axios.get(`${NetflixOrginalsUrl}&page=${page}`).then(response=>{
            if(response.data.results.length===0){
                setMoviesEnded(true)
            }
            setMovies(prev=>[...prev,...response.data.results])
            setLoading(false)
        }).catch(error=>{
            console.log(error);
        })
},[page])


  return (
    movies.length>1?
    <div className='netflixOrginals'>
        <h3>Netflix Orginals</h3>
        <div className='bgOrginals' style={{backgroundImage:(background?`url(https://image.tmdb.org/t/p/w780/${background})`:'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png')}}></div>
        <div className='scrollsOrginals'>
            {movies.map((element,index)=>{
                if(movies.length===index+1)return <div key={index} ref={lastMovie}><Card  classname={'orginalsCard'} setbackground={setBackground}  NetflixOrginals={true} element={element} ></Card></div>
                else return <Card  classname={'orginalsCard'} setbackground={setBackground} key={index} NetflixOrginals={true} element={element} ></Card>
            })}
       </div>
    </div>:''
  )
}

export default NetflixOrginals



