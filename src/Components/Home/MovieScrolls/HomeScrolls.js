import React,{useEffect,useState,useRef,useCallback} from 'react'
import axios from 'axios'
import './HomeScrolls.css'
import Card from './Card'

function HomeScrolls(props) {
const [data,setData]=useState([])
const [page,setPage]=useState(1)
const [loading,setLoading]=useState(false)
const [moviesEnded,setMoviesEnded]=useState(false)

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
        axios.get(props.url+'&page='+page).then(response=>{
            if(response.data.results.length===0){
                setMoviesEnded(true)
            }
            setData(prev=>[...prev,...response.data.results])
            setLoading(false)
        }).catch(error=>{
            console.log(error);
        })
},[page])

  return (
    data.length>1?
    <div className='movieScrolls'>
        <h3>{props.title}</h3>
        <div className={props.TopRated?'scrolly':'scrolly2'}>
          {data.map((element,index)=>{
            if(data.length===index+1){
              return <div key={index} ref={lastMovie}><Card  classname={'HomeScrollsCard'}  element={element}></Card></div>
            }
            return <Card  classname={'HomeScrollsCard'} key={index} element={element}></Card>
          })}       
        </div>

    </div>:''
  )
}

export default HomeScrolls

