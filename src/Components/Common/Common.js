import React,{useState,useEffect,useRef,useCallback} from 'react'
import './Common.css'
import HomeHeader from '../Home/HomeHeader/HomeHeader'
import GenereNav from './GenereNav/GenereNav'
import axios from 'axios'
import Card from '../Home/MovieScrolls/Card'
function Common(props) {
  const [movies,setMovies]=useState([])
  const [genreid,setGenreId]=useState('')
  const [pageNo,setPageNo]=useState(1)
  const [toTopBtn,setToTopBtn]=useState(false)
  const [loading,setLoading]=useState(false)
  const [moviesEnded,setMoviesEnded]=useState(false)

  const observer=useRef()

  const lastMovie=useCallback(node=>{
    if(loading)return
    if(moviesEnded)return
    if(observer.current) observer.current.disconnect()
    observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        if(pageNo!==500){
          setPageNo(pageNo+1)
        }
      }
    })
    if(node)observer.current.observe(node)
  },[loading])



  useEffect(()=>{
    setLoading(true)
    axios.get(props.url+'&with_genres='+genreid+'&page='+pageNo).then(res=>{
      if(res.data.results.length===0){
        setMoviesEnded(true)
      }
      setMovies(prev=>[...prev,...res.data.results])
      setLoading(false)
    })
   },[pageNo,genreid]) 


 useEffect(()=>{
  setPageNo(1)
  setMovies([])
 },[genreid,props.url])


  function handleScroll(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


window.onscroll=()=>{
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    setToTopBtn(true)
  } else {
    setToTopBtn(false)
  }
}
  return (
   
    <div >
        <HomeHeader navBtnActive={props.navBtnActive}  classname={props.classname}></HomeHeader>
        {toTopBtn?<i className="fa-solid fa-arrow-up backToTopBtn" onClick={handleScroll}></i>:''}
        <div>
        <GenereNav setGenreId={setGenreId}  genres={props.genres}></GenereNav>
        <h2 className='tvAndMovieHeading'>{props.heading}</h2>
        { movies.length>1?
        <div className='commonDisplay'>
        {movies.map((element,index)=>{
          if(movies.length===index+1){
           return <div key={index}><Card element={element}classname={'moviesOnly'}  id={index}></Card><div ref={lastMovie}/></div>
          }else return <Card element={element}classname={'moviesOnly'} key={index} id={index}></Card>
        })}
        </div>:''}
        </div>
        
    </div>
  )
}

export default Common